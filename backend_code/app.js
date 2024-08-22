import express from "express";//checked
import { dbConnection } from "./database/dbConnection.js";//checked
import jobRouter from "./routes/jobRoutes.js";//checked
import userRouter from "./routes/userRoutes.js";//checked
import applicationRouter from "./routes/applicationRoutes.js";//checked
import { config } from "dotenv";//checked
import cors from "cors";//checked
import { errorMiddleware } from "./middlewares/error.js";//checked
import cookieParser from "cookie-parser";//checked
import fileUpload from "express-fileupload";//checked

const app = express();
config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

dbConnection();
app.use(errorMiddleware);
export default app;
