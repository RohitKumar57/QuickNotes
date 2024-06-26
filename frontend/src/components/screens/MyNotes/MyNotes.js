import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainScreen from "../../MainScreen";
import Loading from "../../Loading";
import ErrorMessage from "../../ErrorMessage";
import SingleNote from "../SingleNote/SingleNote";
import { Button, Card, Badge, Accordion, Dropdown } from "react-bootstrap";
import axios from "axios";

const MyNotes = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [notes, setNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [filter, setFilter] = useState("all");
  const [filteredNotes, setFilteredNotes] = useState([]);
  let navigate = useNavigate();

  //Deleting a particular Note
  const deleteHandler = async (id) => {
    if (window.confirm("Are You Sure?")) {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        if (!userInfo || !userInfo.token) {
          console.error("User token not available");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        setLoading(true);

        await axios.delete(`/api/notes/${id}`, config);
        fetchNotes(); // Refresh

        setLoading(false);
      } catch (error) {
        console.error("Error deleting note:", error);
        setError(error.response.data.message);
        setLoading(false);
      }
    }
  };

  // getting all the notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/notes", {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      });
      setNotes(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notes:", error.message);
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if user information is in local storage
    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      // Redirect to login page if user information is not available
      navigate("/login");
    } else {
      // Fetch notes if user is authenticated
      setUserInfo(JSON.parse(userInfo));
      fetchNotes();
    }
  }, [navigate]);

  // creating the new note
  const [showCreateNoteModal, setShowCreateNoteModal] = useState(false);

  const handleCreateNote = () => {
    console.log("Creating new note");
    setShowCreateNoteModal(true);
  };

  const handleCloseCreateNoteModal = () => {
    console.log("New note saved");
    setShowCreateNoteModal(false);
  };

  const handleSaveNote = (noteData) => {
    if (editingNote) {
      // If editingNote is present, it means we are updating an existing note
      // Add logic to update the existing note
      console.log("Updating note:", noteData);
    } else {
      // If editingNote is not present, it means we are creating a new note
      // Add logic to create a new note
      console.log("Creating new note:", noteData);
    }
    setEditingNote(null); // Reset editingNote after handling
    setShowCreateNoteModal(false);
    fetchNotes();
  };

  // updating the note
  // handle editing a note
  const handleEditNote = (note) => {
    console.log("Editing note:", note);
    setEditingNote(note);
    setShowCreateNoteModal(true);
  };

  // Filtering the notes
  useEffect(() => {
    if (filter === "all") {
      setFilteredNotes(notes);
    } else if (filter === "past5days") {
      const past5DaysNotes = notes.filter((note) => {
        const createdAt = new Date(note.createdAt);
        const today = new Date();
        const timeDiff = today - createdAt;
        const fiveDaysInMillis = 5 * 24 * 60 * 60 * 1000;
        return timeDiff <= fiveDaysInMillis; 
      });
      setFilteredNotes(past5DaysNotes);
    } else if (filter === "past10days") {
      const past10DaysNotes = notes.filter((note) => {
        const createdAt = new Date(note.createdAt);
        const today = new Date();
        const timeDiff = today - createdAt;
        const tenDaysInMillis = 10 * 24 * 60 * 60 * 1000;
        return timeDiff <= tenDaysInMillis; 
      });
      setFilteredNotes(past10DaysNotes);
    }
  }, [filter, notes]);


  return (
    <MainScreen title={`Welcome back ${userInfo ? userInfo.name : ""}`}>
      {/* <Link to="/createnote"> */}
      <Card style={{ flexDirection: "row", justifyContent: "space-between", alignItems:"center", border: "none" }}>
        <Card
          style={{
            justifyContent: "center",
            alignItems: "center",
            border: "none",
          }}
        >
          <Button
            style={{ marginLeft: 10, marginBottom: 6 }}
            size="lg"
            onClick={handleCreateNote}
          >
            Create New Note
          </Button>
        </Card>
        <Card
          style={{
            justifyContent: "center",
            alignItems: "center",
            border: "none",
            color: "black"
          }}
        >
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Filter Notes
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setFilter("all")}>
                All Notes
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter("past5days")}>
                Past 5 Days
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter("past10days")}>
                Past 10 Days
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card>
      </Card>
      {/* </Link> */}
      <SingleNote
        showModal={showCreateNoteModal}
        handleClose={() => {
          setEditingNote(null);
          handleCloseCreateNoteModal();
        }}
        handleSave={handleSaveNote}
        noteId={editingNote ? editingNote._id : null}
      />
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {filteredNotes.map((note) => (
        <Accordion defaultActiveKey={["0"]} key={note._id}>
          <Accordion.Item eventkey="0">
            <Card style={{ margin: 10 }}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  <Accordion.Button as={Card.Text} variant="link">
                    {note.title}
                  </Accordion.Button>
                </span>
                <div>
                  <Button onClick={() => handleEditNote(note)}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              <Accordion.Collapse>
                <Card.Body>
                  <h4>
                    <Badge bg="success" text="light">
                      Category - {note.category}{" "}
                    </Badge>
                  </h4>

                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      Created on{" "}
                      <cite title="Source title">
                        {note.createdAt.substring(0, 10)}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion.Item>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyNotes;
