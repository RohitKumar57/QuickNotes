import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./SingleNote.css";
import Loading from "../../Loading";
import ErrorMessage from "../../ErrorMessage";
import axios from "axios";

const SingleNote = ({ showModal, handleClose, handleSave, noteId }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (noteId) {
      // If noteId is present, it means we are editing an existing note
      // Set the initial state with the values of the note
      const fetchNoteDetails = async () => {
        try {
          setLoading(true);
          const userInfo = JSON.parse(localStorage.getItem("userInfo"));

          if (!userInfo || !userInfo.token) {
            console.error("User token not available");
            // Handle this case, maybe redirect to login or show an error
            setError("User token not available");
            setLoading(false);
            return;
          }

          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };

          // Fetch the details of the existing note using noteId
          const response = await axios.get(`/api/notes/${noteId}`, config);

          // Set the state with the values of the existing note
          const { title, content, category } = response.data;
          setTitle(title);
          setContent(content);
          setCategory(category);

          setLoading(false);
        } catch (error) {
          console.error("Error fetching note details:", error);
          setError("Error fetching note details");
          setLoading(false);
        }
      };

      fetchNoteDetails();
    } else {
      // If noteId is not present, it means we are creating a new note
      // Set the initial state with empty values or any default values you want
      setTitle("");
      setContent("");
      setCategory("");
    }
  }, [noteId]);

  const handleSaveClick = async () => {
    try {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo || !userInfo.token) {
        console.error("User token not available");
        // Handle this case, maybe redirect to login or show an error
        setError("User token not available");
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      if (noteId) {
        // If noteId exists, it means we are updating an existing note
        await axios.put(
          `/api/notes/${noteId}`,
          { title, content, category },
          config
        );
      } else {
        await axios.post(
          "/api/notes/create",
          { title, content, category },
          config
        );
      }

      // Make a POST request to save the note

      // Close the modal or perform any other actions
      handleClose();
      setError(null);

      setLoading(false);
      console.log("Before navigation");
      //   navigate("/mynotes");
      window.location.reload();
      console.log("After navigation");
    } catch (error) {
      console.error("Error creating note:", error);
      // Handle the error, show an error message or perform other actions
      setError("Error creating note");
      setLoading(false);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <Modal.Header closeButton>
        <Modal.Title>Create New Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter note content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter note category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveClick}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SingleNote;
