// import { NextApiRequest, NextApiResponse } from "next";
// import swaggerJsdoc from "swagger-jsdoc";
// import swaggerDefinition from "../../../swaggerDef";

// const options = {
//   swaggerDefinition,
//   apis: ["./pages/api/*.ts"], // point to your TypeScript API routes
// };

// const specs = swaggerJsdoc(options);

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   res.setHeader("Content-Type", "application/json");
//   res.end(JSON.stringify(specs));
// }

import { withSwagger } from 'next-swagger-doc';

const swaggerHandler = withSwagger({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NextJS Swagger',
      version: '0.1.0',
    },
  },
  apiFolder: 'pages/api',
});
export default swaggerHandler();