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

### Environment & Other Tools

- **Environment Variables**  
  You need a `.env` file where you can store sensitive values such as connection URLs, API keys, and more. This file must be located in the root folder of each application, and you can use the existing `.env.sample` file in each app as a reference.

  > **Important**: The file must be named `.env` because other filenames will not be detected by default. If you want to have multiple environment files, you must manually configure the application to do so.

  This file is not tracked by Git, so it is safe to include your credentials there.

- **Cloudinary**  
  This project uses Cloudinary to store images remotely. In order to access the platform programmatically, it is recommended to create a free Cloudinary account and follow the setup instructions. Then, you can add the relevant values (Cloud Name, Client ID, etc.) to your `.env` file.

Please note that if you do not follow the prerequisites guide, it is likely that any of the project’s applications may not function correctly or may not run at all.

## FAQ

### Why a Monorepository?

1. **Centralized Dependency Management**  
   Instead of managing multiple package configurations across different repositories, a monorepository lets you centralize all dependencies, reducing complexity and preventing duplicated packages.

2. **Consistent Development Process**  
   Keeping the frontend, backend, and even shared libraries in the same repository simplifies version synchronization and team coordination, ensuring consistency in your codebase.

3. **Code Reusability**  
   You can share modules or utilities among different applications within the same repository, avoiding code duplication and making maintenance easier.

4. **Simplified CI/CD**  
   Continuous Integration and Deployment tools operate from a single source of truth, making it more straightforward to configure and manage pipelines for all projects in one place.

### Why PNPM?

1. **Efficiency and Optimization**  
   PNPM uses symbolic links to share packages instead of duplicating them, resulting in reduced disk space usage and faster installation times.

2. **Faster Installations**  
   By leveraging caching and a unique approach to dependency resolution, PNPM often delivers higher installation speeds compared to other package managers.

3. **Native Monorepo Support**  
   PNPM includes features specifically designed to manage multiple projects and packages within a single repository, making it an excellent fit for monorepos.

4. **Fewer Version Conflicts**  
   PNPM’s approach to storing dependencies helps minimize issues with conflicting versions across different projects.

### Why Cloudinary?

Cloudinary is a platform that **streamlines media management** and **enhances user experience** by automatically delivering optimized images and videos tailored to each user’s device and network conditions.

- **Ease of Use and Optimizations**  
  With extensive documentation and built-in capabilities, it’s simple to get started with Cloudinary. Features such as transformations and adaptive content delivery help improve performance.

- **Provider Flexibility**  
  In this project, Cloudinary was chosen due to the organizers not specifying a particular service. It offers a seamless setup and is easy to switch out for another provider in the future if needed.
