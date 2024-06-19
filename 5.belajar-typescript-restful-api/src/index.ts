import { logger } from "./app/logging";
import { web } from "./app/web";

const PORT: number | string = process.env.PORT || 4000;

web.listen(PORT, () => {
  logger.info(`Listening on server http://localhost:${PORT}`);
});
