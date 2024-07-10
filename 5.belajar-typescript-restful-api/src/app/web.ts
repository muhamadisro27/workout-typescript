import express from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { apiRouter } from "../router/api";
import { publicRouter } from "../router/public-api";

export const web = express();

web.use(express.json());

// Public
web.use(publicRouter);

// Auth
web.use(apiRouter);

web.use(errorMiddleware);
