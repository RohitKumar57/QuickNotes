const express = require("express");
// const notes = require('./data/notes')
const cors  = require('cors')
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes')
const { notFound, errorHandler } = require("./middleware/errorMiddleware");


const app = express();
dotenv.config();
connectDB();
// app.use(cors)
app.use(express.json())




app.get("/", (req, res) => {
  res.send("API is running");
});

// app.get("/api/notes", (req, res)=>{
//     res.json(notes)
// })

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);
app.use(notFound)
app.use(errorHandler)

// app.get("/api/notes/:id", (req, res) =>{
//     // finding notes with their respective ids
//     const note = notes.find((n) => n._id === req.params.id);
//     console.log(req.params)
//     res.send(note);
// })




const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
