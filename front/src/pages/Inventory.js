import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Container,
  
} from '@mui/material';
import './path-to-bootstrap.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from 'material-ui-search-bar';
import Modal from '@mui/material/Modal';

function Inventory() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});
  const [itemId, setItemId] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [value, setValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddItem = async () => {
    try {
      await axios.post('http://localhost:3000/api/items', { itemID: itemId, name, category, quantity, price });
      fetchData();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleUpdateItem = async () => {
    try {
      // Use the actual item._id from the state to update the item
      await axios.put(`http://localhost:3000/api/items/${itemId}`, item);
      fetchData();
      setItem({}); // Clear the item state after updating
      closeModal(); // Close the modal after updating
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async () => {
    try {
      // Use the provided itemId to delete the item
      await axios.delete(`http://localhost:3000/api/items/${itemId}`);
      fetchData();
      setItem({});
      closeModal(); // Close the modal after deleting
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSearchItem = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/items/${itemId}`);
      setItem(response.data);
      if (response.data) {
        openModal(); // Open the modal when a matching item is found
      }
    } catch (error) {
      console.error('Error searching for item:', error);
    }
  };

  const doSomethingWith = (value) => {
    // Call the handleSearchItem function with the search value
    handleSearchItem(value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container my-4">
      <Container style={{ position: 'relative', top: '20%', left: '50%', transform: 'translate(-50%, -20%)', padding: '20px', background: 'rgba(255, 255, 255, 0.6)', borderRadius: '40px' }}>

      <Typography variant="h3" style={{ textAlign: 'center' , color: '#120079', fontWeight: 'bold' }} >Inventory Management</Typography>
      </Container>
      <SearchBar
        value={itemId}
        onChange={(newValue) => setItemId(newValue)}
        onRequestSearch={handleSearchItem}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleSearchItem();
          }
        }}
        style={{
          marginLeft: '80%',
          backgroundColor: '#f0f0f0',
          borderRadius: '10px',
          border: '1px solid #ccc',
          padding: '5px 10px',
          width: '300px', // Set the width as per your preference
        }}
        placeholder="Search by ID" // Change the label to "Search by ID"
      />

      <div className="form-group mt-3">
        <TextField
          className="form-control"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          className="form-control"
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextField
          className="form-control"
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          type="number"
        />
        <TextField
          className="form-control"
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
        />
        <Button
          variant="contained"
          style={{ marginLeft: '10px', color: 'white', backgroundColor: '#3069e4' }}
          onClick={handleAddItem}
          startIcon={<AddIcon />}
        >
          Add Item
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table className="table table-bordered table-striped table-hover mt-4">
          <TableHead>
            <TableRow>
              <TableCell>Item ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.itemID}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: 'green', color: 'white', marginLeft: '10px' }}
                    startIcon={<EditIcon />}
                    onClick={() => {
                      console.log("Editing item with itemID:", item.itemID);
                      setItem(item);
                      setItemId(item.itemID);
                      openModal(); // Open the modal when the edit button is clicked
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="contained"
                    style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      console.log("Editing item with itemID:", item.itemID);
                      setItem(item);
                      setItemId(item.itemID);
                      openModal(); // Open the modal when the delete button is clicked
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>



      <Modal
  open={isModalOpen}
  onClose={closeModal}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <div style={modalStyle} className="modal-content">
    <Typography variant="h6">Edit Item</Typography>
    <TextField
      className="form-control"
      label="Item ID"
      value={item.itemID}
      onChange={(e) => setItem({ ...item, itemID: e.target.value })}
    />
    <TextField
      className="form-control"
      label="Name"
      value={item.name}
      onChange={(e) => setItem({ ...item, name: e.target.value })}
    />
    <TextField
      className="form-control"
      label="Category"
      value={item.category}
      onChange={(e) => setItem({ ...item, category: e.target.value })}
    />
    <TextField
      className="form-control"
      label="Quantity"
      value={item.quantity}
      onChange={(e) => setItem({ ...item, quantity: e.target.value })}
      type="number"
    />
    <TextField
      className="form-control"
      label="Price"
      value={item.price}
      onChange={(e) => setItem({ ...item, price: e.target.value })}
      type="number"
    />
    <div className="button-container">
      <Button variant="contained" onClick={handleUpdateItem}>
        Update Item
      </Button>
      <Button
        variant="contained"
        style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}
        startIcon={<DeleteIcon />}
        onClick={handleDeleteItem}
      >
        Delete Item
      </Button>
    </div>
  </div>
</Modal>





    </div>
  );
}

export default Inventory;


const modalStyle = {
  position: 'fixed',
  top: '50%', // Center the modal vertically
  left: '50%', // Center the modal horizontally
  transform: 'translate(-50%, -50%)', // Center the modal both vertically and horizontally
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  maxWidth: '80%', // Set the maximum width as per your preference
};
