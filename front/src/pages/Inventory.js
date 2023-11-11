

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
  Box,
  fontFamily,
  boxShadow,
  Snackbar,
  AlertTitle,
  Grid,
  FormControlLabel,
 
  
} from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './path-to-bootstrap.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from 'material-ui-search-bar';
import Modal from '@mui/material/Modal';
import invent from '../Images/inventory-control-system.jpg'
import Icon from '@mui/material/Icon';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Slide from '@mui/material/Slide';
import MenuItem from '@mui/material/MenuItem';
import TablePagination from '@mui/material/TablePagination';
import Alert from '@mui/material/Alert';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';





const Transition = React.forwardRef(function Transition(props, ref) {
  return <Modal direction="down" ref={ref} {...props} />;
});

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
  const [isNoDataModalOpen, setNoDataModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(10);
const [showAlert, setShowAlert] = useState(false);
const [alert, setAlert] = useState({
  open: false,
  message: '',
  severity: 'success', // Default severity
});



  const categorylist = [
    {
      value: '',
      label: '',
    },
    {
      value: 'FOOD',
      label: 'FOOD',
    },
    {
      value: 'FORZEN',
      label: 'FORZEN',
    },
    {
      value: 'VEGITABLE',
      label: 'VEGITABLE',
    },
    {
      value: 'MEAT',
      label: 'MEAT',
    },
  ];


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
    setSubmitButtonClicked(true);
  
    if (name && category && item.quantity && item.price) {
      try {
        await axios.post('http://localhost:3000/api/items', {
          itemID: itemId,
          name,
          category,
          quantity: item.quantity,
          price: item.price
        });
  
        // Close the modal
        AddcloseModal();
  
        // Show a success alert
        
        setAlert({
          open: true,
          message: 'Item added successfully',
          severity: 'success',
        });
        // Clear form fields and errors
        setName('');
        setCategory('');
        setItem({ quantity: '', price: '' });
        setSubmitButtonClicked(false);
  
        // Optionally, you can fetch updated data after adding the item
        fetchData();
      } catch (error) {
        console.error('Error adding item:', error);
      }
    }
  };
  

  const handleUpdateItem = async () => {
    try {
      // Use the actual item._id from the state to update the item
      await axios.put(`http://localhost:3000/api/items/${itemId}`, item);
      fetchData();
      setItem({}); // Clear the item state after updating
      closeModal(); // Close the modal after updating
      setAlert({
        open: true,
        message: 'Item updated successfully',
        severity: 'success',
      });
    } 
    
    catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async () => {
    try {
      // Use the provided itemId to delete the item
      await axios.delete(`http://localhost:3000/api/items/${itemId}`);
      fetchData();
      setItem({});
      closeModal();
      setAlert({
        open: true,
        message: 'Item deleted successfully',
        severity: 'success',
      }); // Close the modal after deleting
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSearchItem = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/items/${itemId}`);
      setItem(response.data);
  
      if (response.data) {
        openModal(); // Open a different modal when data is found
        setItemId(''); // Clear the search bar input
      } else {
        NoopenModal(); // Open the "No Data" modal when no data is found
        setItemId('');
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

  const AddopenModal = () => {
    setIsAddModalOpen(true);
  };

  const AddcloseModal = () => {
    setIsAddModalOpen(false);
  };


  const NoopenModal = () => {
    setNoDataModalOpen(true);
  };
  
  const NocloseModal = () => {
    setNoDataModalOpen(false);
  };

  




  return (

    <div className="container my-7">
    <Snackbar
  open={alert.open}
  autoHideDuration={2000}
  onClose={() => setAlert({ ...alert, open: false })}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  sx={{ width: '100%' }}>
  <Alert severity={alert.severity} style={{ backgroundColor: '#ffffff', color: 'black',fontFamily: 'monospace', fontWeight: 'bold', fontSize: '20px' }} >
  <AlertTitle style={{ color: '#007928', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '20px' }}>Success </AlertTitle>
    {alert.message}
  </Alert>
</Snackbar>
      <Container style={{ position: 'relative', top: '20%', padding: '20px', background: 'rgba(255, 255, 255, 0.6)', borderRadius: '40px' }}>

      <Typography variant="h3" style={{ textAlign: 'center' , color: '#120079', fontWeight: 'bold', }} >Inventory Management</Typography>
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
          width: '300px', 
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8)'
        }}
        placeholder="Search by ID" // Change the label to "Search by ID"
      />

      <div className="form-group mt-3">

      <Button
  variant="contained"
  style={{
    border: "5px solid #fcf8f8",
    borderRadius: '30px',
    padding: '10px 20px',
    marginLeft: '10px',
    marginBottom: '20px',
    color: 'white',
    backgroundColor: '#3069e4',
    size: 'large',
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  }}
  onClick={() => {
    setItem({}); // Reset the item state to an empty object
    setItemId(''); // Clear the item ID field
    setName(''); // Clear the name field
    setCategory(''); // Clear the category field
    setQuantity(''); // Clear the quantity field
    setPrice(''); // Clear the price field
    AddopenModal();
    setSubmitButtonClicked(false);
   
  }}
  startIcon={<AddCircleIcon />}
>
  
<Typography variant="h6" md="2"  sx={{ color: 'white' }}>

  Add Item
</Typography>
</Button>

      </div>



      <TableContainer component={Paper} sx={{ maxHeight: 800, minHeight: 640, backgroundColor: 'rgba(199, 199, 255, 0.8)',boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8)'}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: ' rgb(0, 0, 0, 0.5)', color: 'white', fontFamily: 'poppins',fontWeight: 'bold', fontSize: '20px', padding: '10px', 
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' , border: "2px solid #fcf8f8", alignItems: 'center'} } align="center"> Item ID</TableCell>
              <TableCell sx={{ backgroundColor: ' rgb(0, 0, 0, 0.5)', color: 'white', fontFamily: 'poppins',fontWeight: 'bold', fontSize: '20px', padding: '10px', 
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' , border: "2px solid #fcf8f8", alignItems: 'center'} } align="center"> Name</TableCell>
              <TableCell sx={{ backgroundColor: ' rgb(0, 0, 0, 0.5)', color: 'white', fontFamily: 'poppins',fontWeight: 'bold', fontSize: '20px', padding: '10px', 
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' , border: "2px solid #fcf8f8", alignItems: 'center'} } align="center"> Category</TableCell>
               <TableCell sx={{ backgroundColor: ' rgb(0, 0, 0, 0.5)', color: 'white', fontFamily: 'poppins',fontWeight: 'bold', fontSize: '20px', padding: '10px', 
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' , border: "2px solid #fcf8f8", alignItems: 'center'} } align="center">Quantity</TableCell>
               <TableCell sx={{ backgroundColor: ' rgb(0, 0, 0, 0.5)', color: 'white', fontFamily: 'poppins',fontWeight: 'bold', fontSize: '20px', padding: '10px', 
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' , border: "2px solid #fcf8f8", alignItems: 'center'} } align="center">Status</TableCell>

               <TableCell sx={{ backgroundColor: ' rgb(0, 0, 0, 0.5)', color: 'white', fontFamily: 'poppins',fontWeight: 'bold', fontSize: '20px', padding: '10px', 
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' , border: "2px solid #fcf8f8", alignItems: 'center'} } align="center"><TableRow>Unit Price</TableRow>(Rs.)</TableCell>
             <TableCell sx={{ backgroundColor: ' rgb(0, 0, 0, 0.5)', color: 'white', fontFamily: 'poppins',fontWeight: 'bold', fontSize: '20px', padding: '10px', 
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' , border: "2px solid #fcf8f8", alignItems: 'center'} } align="center"> <TableRow>Total Value</TableRow>(Rs.)</TableCell>
              <TableCell sx={{ backgroundColor: ' rgb(0, 0, 0, 0.5)', color: 'white', fontFamily: 'poppins',fontWeight: 'bold', fontSize: '20px', padding: '10px', 
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' , border: "2px solid #fcf8f8", alignItems: 'center'} } align="center"> Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items
  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  .map((item)=> (
              <TableRow key={item._id}>
                <TableCell
                sx={{ backgroundColor: ' rgb(120, 0, 0, 0.5)', color: 'white', fontFamily: 'poppins',fontWeight: 'bold', fontSize: '20px', padding: '10px', 
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' , border: "2px solid #fcf8f8", alignItems: 'center'} } align="center">
                  {item.itemID}</TableCell>

                <TableCell sx={{ backgroundColor: ' rgb(8, 143, 247, 0.2)', color: 'black', fontFamily: 'poppins',fontWeight: 'bold', fontSize: '20px', padding: '10px', 
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' , border: "2px solid #fcf8f8", alignItems: 'center'} } >
                  {item.name}</TableCell>

                <TableCell sx={{ backgroundColor: ' rgb(0, 204, 51, 0.2)', color: 'dark-green', fontFamily: 'poppins',fontWeight: 'bold', fontSize: '20px', padding: '10px', 
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' , border: "2px solid #fcf8f8", alignItems: 'center'} } align="center">
                  {item.category}</TableCell>

                <TableCell sx={{ backgroundColor: ' rgb(107, 255, 245, 0.2)', color: 'darkpurple', fontFamily: 'poppins',fontWeight: 'bold', fontSize: '20px', padding: '10px', 
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' , border: "2px solid #fcf8f8", alignItems: 'center'} } align="center">
                  {item.quantity}</TableCell>

                  <TableCell sx={{ backgroundColor: ' rgb(246, 250, 0, 0.2)', color: 'darkpurple', fontFamily: 'poppins',fontWeight: 'bold', fontSize: '20px', padding: '10px', 
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' , border: "2px solid #fcf8f8", alignItems: 'center'} } align="center">
                {item.quantity > 0 ? (
          <>
            <CheckCircleIcon style={{ color: 'green', marginRight: '5px', }} />
            <span>Available</span>
          </>
        ) : (
          <span style={{ color: 'red' }}><ProductionQuantityLimitsIcon style={{ color: 'red', marginRight: '5px' }} /> Not Available</span>
        )}</TableCell>

                <TableCell sx={{ backgroundColor: ' rgb(214, 125, 0, 0.2)', color: 'darkred', fontFamily: 'poppins',fontWeight: 'bold', fontSize: '20px', padding: '10px', 
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' , border: "2px solid #fcf8f8", alignItems: 'center'} } >
                  {item.price}</TableCell>

                <TableCell sx={{ backgroundColor: ' rgb(0, 168, 140, 0.2)', color: 'darkblue', fontFamily: 'poppins',fontWeight: 'bold', fontSize: '20px', padding: '10px', 
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' , border: "2px solid #fcf8f8", alignItems: 'center'} } >
                  {item.price * item.quantity}</TableCell>

                <TableCell sx={{ backgroundColor: ' rgb(193, 240, 233, 0.2)', color: 'white', fontFamily: 'poppins',fontWeight: 'bold', fontSize: '20px', padding: '10px', 
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' , border: "2px solid #fcf8f8", alignItems: 'center'} } align="center">

                  <Button
                    variant="contained"
                    style={{ backgroundColor: 'green', color: 'white', marginLeft: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8)' }}
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

                 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
      sx={{
        backgroundColor: 'rgb(0, 75, 250, 0.2)',color: 'white', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.6)', fontFamily: 'poppins',fontWeight: 'bold', fontSize: '20px',
      }}
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={items.length} 
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={(event, newPage) => setPage(newPage)}
      onRowsPerPageChange={(event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      }}
      variant="outlined" color="primary"/>
      </TableContainer>

      






<Modal

TransitionComponent={Transition}
  open={isModalOpen}
  onClose={closeModal}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>

<Paper elevation={3}>

<Box  component="form"
      sx={{
        '& .MuiTextField-root': { m: 1.3, width: '50ch' ,
      
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.3)',},
      }}
      noValidate
      autoComplete="off"
      
      > 

  <div style={modalStyle} className="modal-content">
            
      <Button onClick={closeModal} style={{ position: 'absolute', top: '10px', right: '10px' }}>X</Button>
      <IconButton
              
              
              onClick={closeModal} 
              aria-label="close"
              style={{ position: 'absolute', top: '10px', right: '30px', color: 'white', backgroundColor: 'red' }}
            >
             <CloseIcon sx={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }} />

            </IconButton>

    <Typography variant="h6" md="2"  
    style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)',color: '#120079' , fontWeight: 'bold', textAlign: 'center',
    padding: '20px',fontSize: '40px',borderColor: '#120079',borderRadius: '40px',borderWidth: '5px' , boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', marginBottom: '20px'}} >
      Edit Item</Typography>

<Paper elevation={3} sx={{ backgroundColor: 'rgba(112, 112, 112, 0.6)',color: '#120079' , fontWeight: 'bold', textAlign: 'center',
boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.9)', borderRadius: '40px', width: '100%', padding: '40px', height: 'auto', }} > 
      <TextField
  className="form-control"
  label="Item ID"
  value={item.itemID}
  
  InputProps={{
    readOnly: true,
    style: {
      paddingLeft: '10px',
      color: 'red', // Change the font color to red
      fontWeight: 'bold', // Change the font weight to bold
      fontSize: '25px',
      fontFamily: 'poppins',
    },
  }}
  InputLabelProps={{
    readOnly: true,
    style: {
      paddingLeft: '10px',
      color: 'red', // Change the font color to red
      fontWeight: 'bold', // Change the font weight to bold
      fontSize: '25px',
      fontFamily: 'poppins',
    },
  }}
  onChange={(e) => setItem({ ...item, itemID: e.target.value })}
  variant="standard"
  color="warning"
  focused
/>

<TextField
  className="form-control"
  id="filled-search"
  variant='filled'
  label="please insert item name"
  value={item.name}
  onChange={(e) => setItem({ ...item, name: e.target.value })}
  error={!item.name} // Set error to true when name is empty
  helperText={!item.name ? 'Name is required' : ''}
  InputProps={{
    style: {
      color: 'blue', // Change the font color to blue
      fontWeight: 'normal',
      fontSize: '25px',
      fontFamily: 'poppins', // Change the font weight to normal
    },
  }}
  InputLabelProps={{
    style: {
      color: 'blue', // Change the font color to blue
      fontWeight: 'bold',
      fontSize: '25px', // Change the font weight to normal
      fontFamily: 'montserrat',
      
    },
  }}
/>

<TextField
  className="form-control"
  label="Category"
  variant='filled'
  value={item.category}
  onChange={(e) => setItem({ ...item, category: e.target.value })}
  InputProps={{
    readOnly: true,
    style: {
      color: 'green', // Change the font color to green
      fontWeight: '',
      fontSize: '25px',
      fontFamily: 'poppins', // Change the font weight to bold
    },
  }}
  InputLabelProps={{
    style: {
      color: 'green', // Change the font color to green
      fontWeight: 'bold',
      fontSize: '25px',
      fontFamily: 'poppins', // Change the font weight to bold
    },
  }}
/>

<TextField
 className="form-control"
          id="outlined-select-currency-native"
          select
          
          defaultValue="Other"
          SelectProps={{
            native: true,
          }}
          label="Category"
          error={submitButtonClicked && !category}
          helperText={submitButtonClicked && !category ? "Category is required" : ""}
          value={category}
          variant="standard"
          onChange={(e) => setItem({ ...item, category: e.target.value })}
          InputProps={{
            style: {
              color: 'green', // Change the font color to orange
              fontWeight: '', 
              fontFamily: 'poppins', 
              fontSize: '25px',
              paddingLeft:'10px', // Change the font weight to bold
            },
          }}
          InputLabelProps={{
            style: {
              color: 'green', // Change the font color to orange
              fontWeight: 'bold', // Change the font weight to bold
              fontFamily: 'poppins',
              fontSize: '25px',
              marginBottom: '10px',
              paddingLeft:'10px',
            },
          }}
        >
          {categorylist.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>

<TextField
  className="form-control"
  
  label="Quantity"
  value={item.quantity}
  onChange={(e) => setItem({ ...item, quantity: e.target.value })}
  type="number"
  variant='filled'
  InputProps={{
    style: {
      color: 'purple', // Change the font color to purple
      fontWeight: 'bold', 
      fontFamily: 'poppins', 
      fontSize: '25px', 
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',// Change the font weight to normal
    },
  }}
  InputLabelProps={{
    style: {
      color: 'purple', // Change the font color to purple
      fontWeight: 'bold',
      fontFamily: 'poppins',
      fontSize: '25px', // Change the font weight to normal
    },
  }}
/>

<TextField
  className="form-control"
  label="Unit Price"
  variant='filled'
  value={item.price}
  onChange={(e) => setItem({ ...item, price: e.target.value })}
  type="number"
  InputProps={{
    
    
    startAdornment: <InputAdornment position="start" 
    style={{fontSize: '25px',
                color: 'orange', // Change the font color to orange
              }} 
              >
                <Typography style={{fontSize: '30px',}}>Rs:</Typography >
                </InputAdornment>,

              style: {
                color: 'brown', // Change the font color to orange
                fontWeight: '', 
                fontFamily: 'poppins', 
                fontSize: '25px', // Change the font weight to bold
              },
            }}
  InputLabelProps={{
    style: {
      color: 'brown', // Change the font color to orange
      fontWeight: 'bold', // Change the font weight to bold
      fontFamily: 'poppins',
      fontSize: '25px',
      marginBottom: '10px',

    },
  }}
/>
</Paper>
    <div className="button-container">


      <Button variant="contained" onClick={handleUpdateItem}
       style={{ fontFamily: 'poppins', fontSize: '20px', marginTop: '10px', padding: '10px', backgroundColor: 'darkblue', color: 'white', marginLeft: '10px',boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8)',}}
      disabled={!item.name || !item.category || !item.quantity || !item.price}>
        Update Item
      </Button>


      <Button
        variant="contained"
        style={{ fontFamily: 'poppins', fontSize: '20px', marginTop: '10px', padding: '10px', backgroundColor: 'red', color: 'white', marginLeft: '10px',boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8)',}}
        startIcon={<DeleteIcon />}
        onClick={handleDeleteItem}
      >
        Delete Item
      </Button>
    </div>
  </div>
  </Box>

  </Paper>
</Modal>






<Modal 

TransitionComponent={Transition}
  open={isAddModalOpen}
  onClose={AddcloseModal}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>


<Box  component="form"
      sx={{
        '& .MuiTextField-root': { m: 1.3, width: '50ch' ,
      
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',},
      }}
      noValidate
      autoComplete="off"
      
      > 

  <div style={modalStyle} className="modal-content">
            
      <Button onClick={AddcloseModal} style={{ position: 'absolute', top: '10px', right: '10px' }}>X</Button>
      <IconButton
              
              
              onClick={AddcloseModal} 
              aria-label="close"
              style={{ position: 'absolute', top: '10px', right: '30px', color: 'white', backgroundColor: 'red' }}
            >
             <CloseIcon sx={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }} />

            </IconButton >





    <Typography variant="h6" md="2"  
    style={{ width: '60%',  backgroundColor: 'rgba(255,255, 0, 0.6)',color: '#1c0303' , fontWeight: 'bold', textAlign: 'center',
    padding: '20px',fontSize: '40px',borderColor: '#120079',borderRadius: '40px',borderWidth: '5px' ,
     boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', marginBottom: '20px', fontFamily: 'poppins'}} >
      ADD Item</Typography>
   

  
      <Paper elevation={3} sx={{ backgroundColor: 'rgba(112, 112, 112, 0.6)',color: '#120079' , fontWeight: 'bold', textAlign: 'center',
boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.9)', borderRadius: '40px', width: '100%', padding: '40px', height: 'auto', }} > 

      <TextField
  className="form-control"
  label="Item Name"
  variant='filled'
  error={submitButtonClicked && !name}
  helperText={submitButtonClicked && !name ? "Name is required" : ""}
  value={name}
  onChange={(e) => setName(e.target.value)}
  InputProps={{
    style: {
      color: 'blue', // Change the font color to orange
      fontWeight: '', 
      fontFamily: 'poppins', 
      fontSize: '25px', // Change the font weight to bold
    },
  }}
  InputLabelProps={{
    style: {
      color: 'blue', // Change the font color to orange
      fontWeight: 'bold', // Change the font weight to bold
      fontFamily: 'poppins',
      fontSize: '25px',
      marginBottom: '10px',
    },
  }}


  
/>


<TextField
 className="form-control"
          id="outlined-select-currency-native"
          select
          variant='filled'
          defaultValue="Other"
          SelectProps={{
            native: true,
          }}
          label="Category"
          error={submitButtonClicked && !category}
          helperText={submitButtonClicked && !category ? "Category is required" : ""}
          value={category}
         
          onChange={(e) => setCategory(e.target.value)}
          InputProps={{
            style: {
              color: 'green', // Change the font color to orange
              fontWeight: '', 
              fontFamily: 'poppins', 
              fontSize: '25px',
              paddingLeft:'10px', // Change the font weight to bold
            },
          }}
          InputLabelProps={{
            style: {
              color: 'green', // Change the font color to orange
              fontWeight: 'bold', // Change the font weight to bold
              fontFamily: 'poppins',
              fontSize: '25px',
              marginBottom: '10px',
              paddingLeft:'10px',
            },
          }}
        >
          {categorylist.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>

<TextField
  className="form-control"
  label="Quantity"
  variant='filled'
  error={submitButtonClicked && !item.quantity}
  helperText={submitButtonClicked && !item.quantity ? "Quantity is required" : ""}
  value={item.quantity}
  onChange={(e) => setItem({ ...item, quantity: e.target.value })}
  type="number"

  InputProps={{
    style: {
      color: 'purple', // Change the font color to orange
      fontWeight: '', 
      fontFamily: 'poppins', 
      fontSize: '25px', // Change the font weight to bold
    },
  }}
  InputLabelProps={{
    style: {
      color: 'purple', // Change the font color to orange
      fontWeight: 'bold', // Change the font weight to bold
      fontFamily: 'poppins',
      fontSize: '25px',
      marginBottom: '10px',
    },
  }}

/>

<TextField
  className="form-control"
  label="Unit Price"
  variant='filled'
  error={submitButtonClicked && !item.price}
  helperText={submitButtonClicked && !item.price ? "Unit Price is required" : ""}
  value={item.price}
  onChange={(e) => setItem({ ...item, price: e.target.value })}
  type="number"


  InputProps={{
    startAdornment: <InputAdornment position="start" 
    style={{fontSize: '25px',
                color: 'orange', // Change the font color to orange
              }} 
              >
                <Typography style={{fontSize: '30px',}}>Rs:</Typography >
                </InputAdornment>,
    style: {
      color: 'orange', // Change the font color to orange
      fontWeight: '', 
      fontFamily: 'poppins', 
      fontSize: '25px', // Change the font weight to bold
    },
  }}
  InputLabelProps={{
    style: {
      color: 'orange', // Change the font color to orange
      fontWeight: 'bold', // Change the font weight to bold
      fontFamily: 'poppins',
      fontSize: '25px',
      marginBottom: '10px',
    },
  }}
/>

</Paper>



    <div className="button-container">


    <Button
          variant="contained"
          style={{ backgroundColor: 'rgba(0, 31, 51, 0.8)',color: '#ebebee' , fontWeight: 'bold', textAlign: 'center',
    padding: '20px',fontSize: '40px',borderColor: '#120079',borderRadius: '40px',borderWidth: '5px' ,marginTop: '20px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8)', marginBottom: '20px',borderColor: '#ffffff' }}
          onClick={handleAddItem}
          startIcon={<AddIcon style={{ fontSize: '40px' }} />}
          
          
        >
          <Typography variant="h6" md="2"  sx={{ color: '#ebebee' , fontWeight: 'bold', textAlign: 'center',fontFamily: 'poppins',fontSize: '25px'}}>
          ADD ITEM
          </Typography>
         
        </Button>
    </div>
  </div>
  </Box>

  
</Modal>






<Modal
  open={isNoDataModalOpen} 
  onClose={NocloseModal} 
  aria-labelledby="no-data-modal-title"
  aria-describedby="no-data-modal-description"
>
  <div style={modalStyle} className="modal-content">
    <Typography variant="h6" md="2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#120079', fontWeight: 'bold', textAlign: 'center', padding: '20px', fontSize: '40px', borderColor: '#120079', borderRadius: '40px', borderWidth: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', marginBottom: '20px' }}>
      No Data Found
    </Typography>
    {/* Add content for the "No Data" modal here */}
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
  
  padding: '60px',
  borderRadius: '80px',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4)',
  maxWidth: '40%',
  justifyContent: 'center', 
  alignItems: 'center',
  backgroundImage: `url(${invent})`,
  backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    opacity: 1,
};
