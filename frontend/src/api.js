const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000').replace(/\/$/, '');

async function request(path, options = {}) {
  // FIXED: Prevents double slashes (//) when joining base URL and paths, which breaks AWS HTTP API Gateway
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  const response = await fetch(`${API_BASE_URL}${cleanPath}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.error || `Request failed: ${response.status}`);
  }

  return data;
}

function buildUploadUrl(uploadUrl) {
  if (uploadUrl.startsWith('http://') || uploadUrl.startsWith('https://')) {
    return uploadUrl;
  }
  return `${API_BASE_URL}${uploadUrl}`;
}

export const api = {
  health: () => request('/health'),
  summarize: (payload) => request('/summarize', { method: 'POST', body: JSON.stringify(payload) }),
  quiz: (payload) => request('/quiz', { method: 'POST', body: JSON.stringify(payload) }),
  flashcards: (payload) => request('/flashcards', { method: 'POST', body: JSON.stringify(payload) }),
  studyPlan: (payload) => request('/study-plan', { method: 'POST', body: JSON.stringify(payload) }),
  history: () => request('/history?limit=10'),
  saveProgress: (payload) => request('/save-progress', { method: 'POST', body: JSON.stringify(payload) }),
  createUploadUrl: (payload) => request('/upload-url', { method: 'POST', body: JSON.stringify(payload) }),
  processFile: (payload) => request('/process-file', { method: 'POST', body: JSON.stringify(payload) }),
  uploadFile: async (upload, file) => {
    const url = buildUploadUrl(upload.uploadUrl);
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type || 'application/octet-stream'
      },
      body: file
    });

    if (!response.ok) {
      // FIXED: AWS S3 returns XML on failure, not JSON. Parsing via .json() would crash the application.
      const errorText = await response.text().catch(() => '');
      let errorMessage = `Upload failed: ${response.status}`;
      
      if (errorText.includes('<Message>')) {
        const match = errorText.match(/<Message>([^<]+)<\/Message>/);
        if (match) errorMessage = match[1];
      } else {
        try {
          const parsed = JSON.parse(errorText);
          errorMessage = parsed.message || parsed.error || errorMessage;
        } catch {
          if (errorText) errorMessage = errorText.substring(0, 100);
        }
      }
      throw new Error(errorMessage);
    }

    // Local SAM storage returns file metadata JSON, AWS S3 returns 200 OK with empty body
    if (upload.mode === 'local') {
      return response.json().catch(() => ({}));
    }

    return { uploaded: true, mode: 's3' };
  }
};
