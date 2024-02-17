const express = require("express");
const {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

//getting all the notes acording to the specific user
router.route("/").get(protect, getNotes);

//for creating the notes
router.route("/create").post(protect, createNote);

//for fetching a single note
router
  .route("/:id")
  .get(protect, getNoteById)
  .put(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;
