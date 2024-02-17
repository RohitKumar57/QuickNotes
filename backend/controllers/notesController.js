const asyncHandler = require('express-async-handler')
const Note = require('../models/noteModel')

const getNotes = asyncHandler(async(req, res) =>{
    const notes = await Note.find({user: req.user._id})

    res.json(notes)
})


const createNote = asyncHandler(async(req, res) =>{
    const {title, content, category} = req.body

    if(!title || !content || !category){
        res.status(400)
        throw new Error("Please Fill the Fields");
    }
    else{
        const note = new Note({user: req.user._id, title, content, category})

        const createdNote = await note.save();

        res.status(201).json(createdNote)
    }
})

const getNoteById = asyncHandler(async(req, res) =>{
    
    const note = await Note.findById(req.params.id);

    if(note){
        res.json(note)
    }
    else{
        res.status(404).json({message: "Note not Found"})
    }

    // res.json(note)
})

const updateNote = asyncHandler(async(req, res) =>{
    const {title, content, category} = req.body;

    const note = await Note.findById(req.params.id)

        //if note belong to the same user of note
    if(note.user.toString() !== req.user._id.toString()){
        res.status(401);

        throw new Error("You can't perform this action")
    }


    if(note){
        note.title = title;
        note.content = content;
        note.category = category;

        const updatedNote = await note.save()

        res.json(updatedNote)
    }
    else{
        throw new Error("Note Not Found")
    }

})


const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  //if note belong to the same user of note
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action");
  }

  if (note) {
    await Note.deleteOne({ _id: req.params.id });
    res.json({ message: "Note removed" });
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});


module.exports = {getNotes, createNote, getNoteById, updateNote,deleteNote}