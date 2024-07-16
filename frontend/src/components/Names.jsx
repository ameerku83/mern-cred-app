import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

function Names() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', age: '', image: null });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/items');
      setItems(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('age', formData.age);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/items/${editId}`, data);
        setEditId(null);
      } else {
        await axios.post('http://localhost:5000/items', data);
        
      }
      setFormData({ name: '', age: '', image: "" });
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    setFormData({ name: item.name, age: item.age, image: item.image });
    setEditId(item._id);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>CRUD Application</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button type="submit">{editId ? 'Update' : 'Create'}</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Items List</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>
                    <img src={`http://localhost:5000/${item.image}`} alt={item.name} width="100" />
                  </td>
                  <td>
                    <Button onClick={() => handleEdit(item)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(item._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Names;
