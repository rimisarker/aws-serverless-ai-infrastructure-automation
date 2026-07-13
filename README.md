# 🚀 CloudMentor: Fully Automated Serverless Architecture & GitOps System

[![AWS](https://img.shields.io/badge/AWS-CloudNative-orange?style=for-the-badge&logo=amazon-aws)](https://aws.amazon.com/)
[![React](https://img.shields.io/badge/React-19.x-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-GitOps-green?style=for-the-badge&logo=github-actions)](https://github.com/features/actions)
[![Tailwind/CSS](https://img.shields.io/badge/UI-Glassmorphism-cyan?style=for-the-badge)](https://vitejs.dev/)

A production-ready, highly available, and 100% serverless full-stack platform built using **Infrastructure as Code (IaC)**. The entire architecture—from scalable backend microservices to a premium dark-themed glassmorphism frontend—is automatically provisioned, built, and deployed via a custom **GitOps (GitHub Actions)** pipeline. 

---

## 🎯 Key Project Features
* **Dual-Mode AI Engine:** Features a smart switch mechanism capable of toggling between standard Mock environments (zero API cost) and Live OpenAI LLM integration via environment variables.
* **Pre-signed URL Architecture:** Implements secure, direct-to-S3 file uploading from the client side, bypassing Lambda payload limitations and reducing execution costs.
* **State Management & Persistence:** Utilizes high-throughput Amazon DynamoDB for immediate, low-latency storage of summary histories and metadata.

## 💼 CV & Resume Highlights (Why this is Recruiter-Ready)
This repository showcases modern enterprise cloud-native development patterns by eliminating human-error through complete automation.
* **True Serverless Architecture:** 0% idle infrastructure cost; scales automatically from zero to millions of concurrent requests.
* **GitOps Mastery:** Zero manual AWS Console clicks. Infrastructure state updates and application deployments are driven entirely through git workflow loops.

---

## 🛠️ System Architecture Diagram

```text
  [ git push main ] ──► ( GitHub Actions CI/CD Engine )
                                 │
                ┌────────────────┴────────────────┐ (IaC Automation)
                ▼                                 ▼
       ┌─────────────────┐               ┌──────────────────┐
       │   AWS Amplify   │               │ AWS CloudFormation│ (SAM Stack)
       │ (Frontend Host) │               └────────┬─────────┘
       └────────┬────────┘                        │
                │ (User Visits URL)               ├─► [ AWS Lambda Monolith ]
                ▼                                 │    (Node.js Core Engine)
       ┌─────────────────┐                        │             │
       │  React Frontend │                        ├─► [ API Gateway HTTP ]
       │ (Vite App Live) │                        │    (REST API Endpoint)
       └────────┬────────┘                        │             │
                │                                 ├─► [ Amazon DynamoDB ]
                └─────── (API Request) ──────────►│    (NoSQL Data Table)
                         [ /health, /summarize ]  │             │
                                                  └─► [ Amazon S3 Bucket ]
                                                       (Secure Object Storage)README.md


📂 Project Structure Blueprint

.
├── .github/
│   └── workflows/
│       └── deploy-prod.yml      <── Core GitOps Automation Pipeline Script
├── backend/
│   ├── env.example.json         <── Local Environment Configuration Variables Template
│   ├── package.json             <── AWS SDK, OpenAI & Backend Dependencies
│   ├── events/
│   │   ├── summarize.json       <── Local AWS Lambda Test Event (Text Summarization)
│   │   └── upload-url.json      <── Local AWS Lambda Test Event (S3 Pre-signed URL generation)
│   └── src/
│       ├── app.mjs              <── Core Monolith Lambda Router & API Business Logic
│       └── prompts.mjs          <── Isolated AI Prompt Management Module
├── frontend/
│   ├── index.html               <── React Main Application Entry point
│   ├── vite.config.js           <── Vite Compiler Configuration
│   ├── package.json             <── React Hooks & UI Library Dependencies
│   └── src/
│       ├── main.jsx             <── React Virtual DOM Root Mounting
│       ├── App.jsx              <── Premium Glassmorphism UI Components & State Logic
│       ├── api.js               <── Abstracted Axios Network Layer for AWS Endpoints
│       └── styles.css           <── Custom Cyberpunk Dark CSS System
├── docs/
│   └── teaching-plan.md         <── Technical Syllabus & Project Roadmap Documentation
├── .gitignore                   <── Git Exclusions (Prevents node_modules & local builds)
└── template.yaml                <── Master AWS Serverless Application Model (SAM) Specification

⚙️ A to Z Configuration: Setup Secrets:

To securely trigger the deployment pipeline, go to your GitHub Repository 
Settings -> Secrets and variables -> Actions and map the following credentials:

| Secret Name | Purpose | Example Value |
| :--- | :--- | :--- |
| `AWS_ACCESS_KEY_ID` | AWS IAM User Access Key with Deploy Privileges | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM User Secret Key | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AWS_REGION` | Cloud Deployment Target Location | `ap-southeast-1` |
| `SAM_STACK_NAME` | Globally Unique CloudFormation Infrastructure Identifier | `cloudmentor-prod-stack` |
| `AI_MODE` | Logic Switch for AI Processor | `mock` (Free Testing) OR `openai` (Live LLM) |
| `OPENAI_API_KEY` | OpenAI API access token | `mock_key` (If `AI_MODE=mock`) |


🏃‍♂️ Step-by-Step Execution Guide (How to work on this in the future)
Phase 1: Local Development & Debugging
1. Run and Test the Backend Locally via SAM CLI:

cd backend
npm install
cd ..
# Emulate API Gateway and AWS Lambda locally using Docker containers
sam local start-api --env-vars backend/env.example.json
2. Boot up the Frontend Environment:
cd frontend
npm install
npm run dev

Phase 2: Deploying to Cloud (The GitOps Way)
You never manually build or upload files to AWS. The process is completely source-controlled:

# 1. Stage changes
git add .

# 2. Commit milestones
git commit -m "feat: enhance core data ingestion logic"

# 3. Stream to GitHub (This triggers the pipeline)
git push origin main

What happens behind the scenes?
1.Infrastructure Update: AWS SAM compiles template.yaml and deploys resources safely via change-sets.
2.Metadata Extraction: The runner polls CloudFormation for live variables (ApiUrl & AmplifyAppId).

3.Environment Injection: The build process dynamically injects the brand-new Cloud API URL into Vite.

4.Amplify Deployment: The client assets are packaged into a binary zip and streamed directly to AWS Amplify.

🛑 Infrastructure Clean Up (Avoid Unexpected Bills)
One of the best benefits of this setup is that you can provision and destroy enterprise architecture instantly. If you need to stop the project and ensure 0 charges from AWS, execute this single line in your local terminal:

aws cloudformation delete-stack --stack-name <YOUR_SAM_STACK_NAME> --region <YOUR_AWS_REGION>

