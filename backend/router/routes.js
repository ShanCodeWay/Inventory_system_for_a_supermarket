// routes.js
const express                                             = require('express');
const { Item }                                            = require('../models/database');

const router                                              = express.Router();

// Generate a four-digit itemID for new items
function generateItemID() {
  const randomID                                          = Math.floor(1000 + Math.random() * 9000);
  return randomID.toString();
}

router.get('/items', async (req, res) => {
  try {
    const items                                           = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error                          : 'Failed to retrieve items' });
  }
});

router.get('/items/:itemID', async (req, res) => {
  const { itemID }                                        = req.params;
  try {
    const item                                            = await Item.findOne({ itemID });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error                        : 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error                          : 'Failed to retrieve item' });
  }
});

router.post('/items', async (req, res) => {
  const { name, category, quantity, description, price }  = req.body;
  const newItem = new Item({
    itemID                                                : generateItemID(),
    name,
    category,
    quantity,
    description,
    price,
  });

  try {
    const savedItem                                       = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    res.status(500).json({ error                          : 'Failed to add the item' });
  }
});

router.put('/items/:itemID', async (req, res) => {
  const { itemID }                                        = req.params;
  const { name, category, quantity, description, price }  = req.body;

  try {
    const updatedItem                                     = await Item.findOneAndUpdate(
      { itemID },
      { name, category, quantity,description,price },
      { new                                               : true }
    );
    if (updatedItem) {
      res.json(updatedItem);
    } else {
      res.status(404).json({ error                        : 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error                          : 'Failed to update the item' });
  }
});

router.delete('/items/:itemID', async (req, res) => {
  const { itemID }                                        = req.params;

  try {
    const deletedItem                                     = await Item.findOneAndDelete({ itemID });
    if (deletedItem) {
      res.json(deletedItem);
    } else {
      res.status(404).json({ error                        : 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error                          : 'Failed to remove the item' });
  }
});

module.exports                                            = { itemRoutes: router };
