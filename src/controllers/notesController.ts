import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
    try {
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

export const getNote: RequestHandler = async (req, res, next) => {
    const id = req.params.id;

    try {
        // isValidObjectID() is a special mongoose function for checking if specified ID is valid
        if (!isValidObjectId(id)) {
            throw createHttpError(400, "Note ID is not valid");
        }

        const note = await NoteModel.findById(id).exec();

        // This checks if note with specified ID exists providing that ID is in correct format
        if (!note) {
            throw createHttpError(404, "Note with specified ID not found");
        }

        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
}

interface noteBody {
    title?: string,
    text?: string,
}

export const createNote: RequestHandler<unknown, unknown, noteBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {
        if (!title) {
            throw createHttpError(400, "Title is missing!");
        }

        const newNote = await NoteModel.create({
            title: title,
            text: text,
        });

        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};

interface UpdateNoteParams {
    id: string,
}

// We need an interface for params here because we have to provide all 4 types of RequestHandler even if we just want to change 1.
// We either could provide an unkown type for params, which would raise an error because the program wouldn't know the type of params
// or we can provide a custom interface which we did.
export const updateNote: RequestHandler<UpdateNoteParams, unknown, noteBody, unknown> = async (req, res, next) => {
    const id = req.params.id;
    const newTitle = req.body.title;
    const newText = req.body.text;

    try {
        if (!isValidObjectId(id)) {
            throw createHttpError(400, "Note ID is not valid");
        }
        if (!newTitle) {
            throw createHttpError(400, "Title is missing!");
        }

        const note = await NoteModel.findById(id).exec();

        if (!note) {
            throw createHttpError(404, "Note with specified ID not found");
        }

        note.title = newTitle;
        note.text = newText;

        const updatedNote = await note.save();

        res.status(200).json(updatedNote);
    } catch (error) {
        next(error);
    }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
    const id = req.params.id;

    try {
        if (!isValidObjectId(id)) {
            throw createHttpError(400, "Note ID is not valid");
        }

        const note = await NoteModel.findByIdAndDelete(id).exec();

        if (!note) {
            throw createHttpError(404, "Note with specified ID not found");
        }

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};