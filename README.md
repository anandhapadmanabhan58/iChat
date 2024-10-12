# Project Setup Guide

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud-based)
- NPM (comes with Node.js)

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-directory>

#Create .env File
In the root directory of your project, create a .env file and add the following environment variable:


#Copy code
MONGODB_URL=<your-mongodb-connection-url>
3. Install Dependencies
Run the following command to install both backend and frontend dependencies:


#Copy code
npm install
cd frontend && npm install

#Running the Application
To start the backend, run from the root directory:

#Copy code
npm start
#To start the frontend, run from the frontend folder:

Copy code
npm start
