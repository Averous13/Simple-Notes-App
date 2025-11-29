import Note from '../models/Note.js';

class NoteController {
    static async getAllNotes(req, res) {
        try {
            const notes = await Note.find();
            res.status(200).json(notes);
        } catch (error) {
            console.error('Error fetching notes:', error);
            res.status(500).json({ message: 'Internal Server Error'})
        }
        
    }

    static async getNoteById(req, res) {
        try {
            const note = await Note.findById(req.params.id);
            if (!note) {
                return res.status(404).json({ message: 'Note not found!'});
            }
            res.status(200).json(note);
        } catch (error) {
            console.error('Error fetching note:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async createNote(req, res) {
        try {
            const { title, content } = req.body;
            const note = new Note({ title, content});
            const savedNote = await note.save();
            res.status(201).json({message: 'Note created successfully', note: savedNote });
        } catch (error) {
            console.error('Error creating note:', error);
            res.status(500).json({message: 'Internal Server Error' });
        }
    }

    static async updateNote(req, res) {
        try {
            const { title, content} = req.body;
            const updatedNote = await Note.findByIdAndUpdate(
                req.params.id,
                { title, content },
                { new: true}
            );
            if (!updatedNote) {
                return res.status(404).json({ message: 'Note not found!'});
            }

            res.status(200).json({ message: "Note updated successfully", note: updatedNote });
        } catch (error) {
            console.error('Error updating note:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async deleteNote(req, res) {
        try {
            const deletedNote = await Note.findByIdAndDelete(req.params.id);
            if (!deletedNote) {
                return res.status(404).json({ message: "Note not found!"});
            }
            res.status(200).json({ message: "Note deleted successfully"});
        }
        catch (error) {
            console.error('Error deleting note:', error);
            res.status(500).json({ message: 'Internal Server Error'});
        }
    }



}

export default NoteController;