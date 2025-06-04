import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({ success: true, message: "Get all notes", notes: notes });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error getting notes" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savednotes = await note.save();
    res.status(200).json({
      success: true,
      message: "notes created successfuly",
      notes: savednotes,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error creating note" });
  }
}

export async function getNoteById(req, res) {
  res.status(200).json({ message: "Get note by id" });
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const id = req.params.id;
    const updatednotes = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true } // Return the updated document
    );
    if (!updatednotes) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }
    res.status(200).json({
      success: true,
      message: "Update note by id",
      notes: updatednotes,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error updating note" });
  }
}
export async function deleteNote(req, res) {
  try {
    const id = req.params.id;
    const deletednotes = await Note.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Deleted successfuly",
      notes: deletednotes,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error in deletingnote" });
  }
}
