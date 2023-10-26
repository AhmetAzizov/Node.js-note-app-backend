import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRouter from "./routes/notesRoutes"

const app = express();

// This allows to send JSON to the server
app.use(express.json());

app.use("/notes", notesRouter);

app.use((req, res, next) => {
    next(Error("Endpoint not found!"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    let errorMessage = "Unknown error occurred"
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
});

export default app;