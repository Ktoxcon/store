# Store

This mono-repository contains both the backend and frontend for the "Desafio 360" project.

## Prerequisites

To run the project correctly, there are a few tools and processes that must be installed and set up. Below is a list of the necessary tools, recommended versions, and required processes:

### Tools

- **Terminal**  
  It is recommended to use any of the different terminals provided by your operating system.

- **Node.js**  
  A version of Node.js 18 or higher is required. It is recommended to use NVM or similar tools to manage Node.js versions.

- **PNPM**  
  This project is a monorepository containing both the frontend and backend. PNPM was chosen for its efficiency and optimized features.  
  **It is important to install PNPM before running the project.**

  You can install it easily using NPM:

  ```bash
  npm install -g pnpm
  ```

  Alternatively, you can follow the official PNPM guides for your operating system (please see their website for detailed instructions).

- **SQL Server**  
  SQL Server needs to be installed and running in order to store information.

---

### Processes

- **Environment Variables**  
  You need a `.env` file where you can store sensitive values such as connection URLs, API keys, and more. This file must be located in the root folder of each application, and you can use the existing `.env.sample` file in each app as a reference.

  > **Important**: The file must be named `.env` because other filenames will not be detected by default. If you want to have multiple environment files, you must manually configure the application to do so.

  This file is not tracked by Git, so it is safe to include your credentials there.

- **Cloudinary**  
  This project uses Cloudinary to store images remotely. In order to access the platform programmatically, it is recommended to create a free Cloudinary account and follow the setup instructions. Then, you can add the relevant values (Cloud Name, Client ID, etc.) to your `.env` file.
