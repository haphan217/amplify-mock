import "./App.css";
import { useState } from "react";
import Amplify, { API } from "aws-amplify";
import { Container, Form, Button } from "react-bootstrap";
import awsExport from "./aws-exports";
Amplify.configure(awsExport);

function App() {
  const [book, setBook] = useState({ title: "", author: "" });
  const addBook = async () => {
    const data = {
      body: {
        title: book.title,
        author: book.author,
      },
    };
    try {
      const res = await API.post("todoapis", "/books", data);
      console.log({ res });
    } catch (error) {
      console.error(error);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };
  return (
    <Container>
      <h3>Add books</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={book.title}
            name="title"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter author"
            name="author"
            value={book.author}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={addBook}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default App;
