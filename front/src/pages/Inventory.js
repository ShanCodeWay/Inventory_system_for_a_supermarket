import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography } from '@mui/material';

function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({}); // State to track the item being edited
  const [itemId, setItemId] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

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
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async () => {
    try {
      // Use the provided itemId to delete the item
      await axios.delete(`http://localhost:3000/api/items/${itemId}`,item);
      fetchData();
      setItem({});
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSearchItem = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/items/${itemId}`);
      setItem(response.data);
    } catch (error) {
      console.error('Error searching for item:', error);
    }
  };


  return (
    <div>
      <Typography variant="h4">Inventory Management</Typography>
      <TextField label="Item ID" value={itemId} onChange={(e) => setItemId(e.target.value)} />
        <Button variant="contained" color="primary" onClick={handleSearchItem}>Search Item</Button>
      <div>
        <TextField label="Item ID" value={itemId} onChange={(e) => setItemId(e.target.value)} />
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <TextField label="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} type="number" />
        <TextField label="Price" value={price} onChange={(e) => setPrice(e.target.value)} type="number" />
        <Button variant="contained" color="primary" onClick={handleAddItem}>Add Item</Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
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
                color="primary"
                onClick={() => {
                  console.log("Editing item with itemID:", item.itemID);
                  setItem(item);
                  setItemId(item.itemID);
                }}
              >
                Edit
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  console.log("Editing item with itemID:", item.itemID);
                  setItem(item);
                  setItemId(item.itemID)
                  
                  ;
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


      {item._id && (
  <div>
    <Typography variant="h6">Edit Item</Typography>
    <TextField label="Item ID" value={item.itemID} onChange={(e) => setItem({ ...item, itemID: e.target.value })} />
    <TextField label="Name" value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} />
    <TextField label="Category" value={item.category} onChange={(e) => setItem({ ...item, category: e.target.value })} />
    <TextField label="Quantity" value={item.quantity} onChange={(e) => setItem({ ...item, quantity: e.target.value })} type="number" />
    <TextField label="Price" value={item.price} onChange={(e) => setItem({ ...item, price: e.target.value })} type="number" />


    <Button variant="contained" color="primary" onClick={handleUpdateItem}>Update Item</Button>
    <Button variant="contained" color="primary" onClick={handleDeleteItem}>Delete Item</Button>
  </div>
)}

    </div>
  );
}

export default App;
