const router=require("express").Router()
const Student=require("../model/studentMOdel")
router.post('/users', async (req, res) => {
    const user = new Student(req.body);
    try {
      await user.save();
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  router.get('/users', async (req, res) => {
    const users = await Student.find();
    res.send(users);
  });
    
  router.get('/users/:id', async (req, res) => {
    const user = await Student.findById(req.params.id);
    res.send(user);
  });
  
  router.put('/users/:id', async (req, res) => {
    try {
      const user = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  router.delete('/users/:id', async (req, res) => {
    try {
      await Student.findByIdAndDelete(req.params.id);
      res.send({ message: 'User deleted' });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  module.exports=router