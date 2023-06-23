const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

    //  Get all Ideas 
    router.get('/', async (req, res) => {
       try{
        const ideas = await Idea.find();
        res.json({ success: true, data: ideas });
       } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
       }
    });
    
        // Get single Idea
    router.get('/:id', async (req, res) => {
        
      try {
        const idea = await Idea.findById(req.params.id);
        res.json({ success: true, data: idea });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
      }
        
    });
    
    // Add an Idea
    router.post('/', async (req, res) => {
        const idea = new Idea ({
            // id: ideas.length + 1,
            text: req.body.text,
            tag: req.body.tag,
            username: req.body.username,
            // date: new Date().toISOString().slice(0, 10)
        });
        
      try {
        const savedIdea = await idea.save();
        res.json({ success:true, data: savedIdea });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success:false, error: 'Something went wrong' });
       }
    });

    //Update Idea
    router.put('/:id', async (req, res) => {
     try {
      const idea = await Idea.findById(req.params.id);
       //Match the usernames
       if(idea.username === req.body.username){
        const updatedIdea = await Idea.findByIdAndUpdate(
          req.params.id, 
          {
            $set: {
              text: req.body.text,
              tag: req.body.tag
            }
          },
          {
            new: true
          }
        );
        return res.json({ success : true, data: updatedIdea });
       }
        //usernames do not match
        res.status(403).json({ success: false, error: 'You are not authorized to update this resource' });
     } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: 'Something went wrong' });
     }
    });
    
    //Delete Idea

    router.delete('/:id', async (req, res) => {
      try {
        const idea = await Idea.findById(req.params.id);
        //Match the usernames
        if(idea.username === req.body.username){
              await Idea.findByIdAndDelete(req.params.id);
              return res.json({ success: true, data: {} });
        }

        //usernames do not match
        res.status(403).json({ success: false, error: 'You are not authorized to delete this resource' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
      }
    });

module.exports = router;