import { Router } from "express";
import swaggerUiExpress from "swagger-ui-express";
import swaggerJson from "../config/swagger.json";

export const handleAPIDocs = (router: Router) =>
  router.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerJson));