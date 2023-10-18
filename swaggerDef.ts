const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Next.js Swagger API",
    version: "1.0.0",
    description: "APIs for my Next.js project",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
};

export default swaggerDefinition;
