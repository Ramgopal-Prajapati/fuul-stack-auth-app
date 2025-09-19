const Item = require('../models/Item');

// Get all items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().populate('createdBy', 'name userid profilePhoto');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new item
exports.createItem = async (req, res) => {
  try {
    const { name, category, price, description } = req.body;
    
    const item = new Item({
      name,
      category,
      price,
      description,
      image: req.file ? req.file.path : '',
      createdBy: req.user.id
    });

    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update item
exports.updateItem = async (req, res) => {
  try {
    const { name, category, price, description } = req.body;
    
    const item = await Item.findById(req.params.id);
    
    if (item) {
      item.name = name || item.name;
      item.category = category || item.category;
      item.price = price || item.price;
      item.description = description || item.description;
      
      if (req.file) {
        item.image = req.file.path;
      }
      
      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (item) {
      await Item.deleteOne({ _id: req.params.id });
      res.json({ message: 'Item removed' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};