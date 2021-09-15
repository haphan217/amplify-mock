import "./App.css";
import { useState, useEffect } from "react";
import Amplify, { API } from "aws-amplify";
import { Container, Form, Button } from "react-bootstrap";
import awsExport from "./aws-exports";
Amplify.configure(awsExport);

function App() {
  const [book, setBook] = useState({ title: "", author: "" });
  const [books, setBooks] = useState([]);
  useEffect(() => {
    // API.get("todoapis", "/books").then((res) => setBooks(res));
    // API.get("todoapis", "/books/id", {
    //   queryStringParameters: {
    //     // OPTIONAL
    //     id: "2",
    //   },
    // }).then((res) => console.log(res));
  }, []);

  const updateBook = async () => {
    const data = {
      body: {
        id: 2,
        title: "updated title",
        author: "updated author",
      },
    };
    try {
      const res = await API.put("todoapis", "/books", data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBook = async () => {
    API.del("todoapis", "/books", {
      queryStringParameters: {
        id: "2",
      },
    }).then((response) => {
      console.log(response);
    });
  };

  const addBook = async () => {
    const data = {
      body: {
        id: 3,
        title: book.title,
        author: book.author,
      },
    };
    console.log(data.body);
    try {
      const res = await API.post("todoapis", "/books", data);
      console.log(res);
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
        <Button variant="primary" onClick={updateBook}>
          Update
        </Button>
        <Button variant="primary" onClick={deleteBook}>
          Delete
        </Button>
      </Form>
      {books.length > 0 && books.map((b) => <div>{b.title}</div>)}
    </Container>
  );
}

export default App;
