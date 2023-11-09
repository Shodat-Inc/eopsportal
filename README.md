# Introduction

 The eOps™ Fabric - An edge-enabled data mesh with management, processing, & security features. This enables agile development & secured delivery of analytics applications and ML models to meet the high-paced business demands.

 The eOps™ Chord - A blockchain framework ensuring highly compliant and audited edge operations.


# Technology Used

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

# Prerequisites

 npm install npm@latest -g


# Installation

 ## Clone the Repository
 git clone https://github.com/Shodat-Inc/eopsportal.git

 ## Install NPM Packages
 npm install

 ## Environment Setup
 Modify the content in your local .env file based on .env.Example to configure the database connection.

# Getting Started

 ## Run the application:

  ### Using node:
    npm run dev
  ### Using yarn:
    yarn dev
  ### Or with pnpm:
    pnpm dev

# Configuration (next.config)

1. Set isDBSync to true for the first run after setting up the project.
2. Execute the "Create User" API. As per the workflow, the initial task is user creation.
3. Once the operation is completed and the response is saved, set isDBSync to false.



# Running Application 

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).



# Understanding the File System of the Project

 ## Here is the filesystem of the project:

         📦EOPSPORTAL
          ┣ 📂.next  
          ┣ 📂node_modules
          ┣ 📂public
             ┣ 📂font
             ┣ 📂img
             ┣ 📜next.svg
             ┣ 📜vercel.svg
          ┣ 📂src
          ┃ ┣ 📂app
          ┃ ┣ 📜favicon.ico
            ┣ 📜global.css
          ┃ ┣ 📜layout.tsx    
            ┣ 📂common
              ┣ 📜alertMessage.tsx
              ┣ 📜nodatafound.tsx
              ┣ 📜rangeSlider.tsx
            ┃ ┣ 📜textInput.tsx        
            ┣ 📂component
              ┣ 📜Layout.js
              ┣ 📜SideBar.js
              ┣ 📜Sidebar.module.css
              ┣ 📜TopBar.js
            ┃ ┣ 📜TopBar.module.css
            ┣ 📂config
              ┣ 📜index.js
            ┣ 📂helpers
              ┣ 📂api
                ┣ 📂models
                ┣ 📂relation
                ┣ 📂repo
                ┣ 📜api-handler.ts
                ┣ 📜db.ts
                ┣ 📜error-handler.ts
                ┣ 📜index.ts
                ┣ 📜jwt-middleware.ts
              ┣ 📜constant.ts
              ┣ 📜countryCode.ts
              ┣ 📜fetch-wrapper.ts
              ┣ 📜index.ts    
            ┣ 📂interface
              ┣ 📜createClass.interface.ts
              ┣ 📜createObjects.interface.ts
              ┣ 📜createUser.interface.ts
              ┣ 📜index.ts
            ┣ 📂lib
            ┣ 📂pages
              ┣ 📂api
                ┣ 📂auth
                ┣ 📜createUsers.ts
                ┣ 📜UpdateUsers.ts
                ┣ 📜getUsers.ts
                ┣ 📜deleteUser.ts.........
              ┣ 📂authentication
                ┣ 📂admin
              ┣ 📂dashboard
                ┣ 📂assetmanagement
                ┣ 📂eopsinsight
                ┣ 📂eopsprosense
                ┣ 📂eopstrace
                ┣ 📂eopswatch
                ┣ 📂manageproducts
                ┣ 📂modelcatalog
                ┣ 📂myaccount
                ┣ 📂pricing
                ┣ 📜dummyPage.tsx
                ┣ 📜index.tsx
                ┣ 📜template.tsx
              ┣ 📜_app.tsx
              ┣ 📜_document.tsx
              ┣ 📜_api_docs.tsx
              ┣ 📜index.tsx
            ┣ 📂services
              ┣ 📜index.js
              ┣ 📜user.service.js
  ┣ 📂store
    ┣ 📂actions
    ┣ 📂reducers
    ┣ 📜store.ts
    ┣ 📜types.ts  
  ┣ 📂styles
  ┣ 📜Common.module.css
  ┣ 📜global.css
  ┣ 📂utils  
    ┣ 📜checkEmailAddress.tsx
    ┣ 📜responseMessage.tsx
┃   ┣ 📜useClickOutside.tsx 
┣ 📜.dockerignore
┣ 📜.env.Example
┣ 📜.eslintric.json
┣ 📜.gitignore
┣ 📜app.log
┣ 📜docker.compose.yml
┣ 📜Dockerfile
┣ 📜index.html
┣ 📜next-env.d.ts
┣ 📜next.config.js
┣ 📜package-lock.json
┣ 📜package.json
┣ 📜postcss.config.json
┣ 📜README.md
┣ 📜tailwind.config.json
┣ 📜ts.config.json
┗ 📜yarn.lock


# Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
