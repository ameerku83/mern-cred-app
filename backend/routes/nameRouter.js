const Item = require("../model/item");
const router=require("express").Router()
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  
  // CRUD Routes
  
  // Create
  router.post('/items', upload.single('image'), async (req, res) => {
    try {
      const newItem = new Item({
        name: req.body.name,
        age: req.body.age,
        image: req.file.path,
      });
      const savedItem = await newItem.save();
      res.status(200).send(savedItem);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // Read
  router.get('/items', async (req, res) => {
    try {
      const items = await Item.find({});
      res.status(200).send(items);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // Update
  router.put('/items/:id', upload.single('image'), async (req, res) => {
    try {
      const updatedItem = await Item.findByIdAndUpdate(
        req.params.id,
        {    
          name: req.body.name,
          age: req.body.age,
          image: req.file ? req.file.path : req.body.image,
        },
        { new: true }
      );
      res.status(200).send(updatedItem);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // Delete
  router.delete('/items/:id', async (req, res) => {
    try {
      await Item.findByIdAndDelete(req.params.id);
      res.status(200).send({ message: 'Item deleted successfully' });
    } catch (err) {
      res.status(500).send(err);
    }
  });  
  

  
  module.exports=router