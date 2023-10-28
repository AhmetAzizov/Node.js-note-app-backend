import express from 'express';
import { getNotes, createNote, getNote, updateNote, deleteNote } from "../controllers/notesController"

const router = express.Router();

router.get('/', getNotes);

router.get('/:id', getNote)

router.post('/', createNote);

router.patch('/:id', updateNote);

router.delete('/:id', deleteNote);

export default router;