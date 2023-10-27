import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRouter from "./routes/notesRoutes"
import createHttpError, { isHttpError } from "http-errors";

const app = express();

// This allows to send JSON to the server
app.use(express.json());

app.use("/notes", notesRouter);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    let errorMessage = "Unknown error occurred"
    let statusCode = 500;

    if (isHttpError(error)) {
        statusCode = error.statusCode;
        errorMessage = error.message;
    }

    res.status(statusCode).json({ error: errorMessage });
});

export default app;