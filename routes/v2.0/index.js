'use strict';

const express = require('express');
const mongoose = require('mongoose');
const User2 = require('./models/User2');
const Joi = require('joi');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Auth = require('../../middleware/auth');

require('dotenv').config();
//validation Schema

const userJoiSchema = Joi.object().keys({
  username: Joi.string().required().trim().alphanum().min(3).max(10),
  email: Joi.string().required().email().trim(),
  password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/),

});

router.get('/users', async(req, res, next) =>{
  try {
    let user = await User2.find({}, 'username email updatedAt createdAt' );
    res.send({ Users: user });

  } catch (err) {
    res.send(err);
  } 

});


//Get by username
router.get('/users/:id', async(req, res, next) =>{
  try {
    let user = await User2.findOne(req.params.username, 'username email updatedAt createdAt');
    res.send({ User: user });

  } catch (err) {
    res.send(err);
  } 

});




router.post('/users/register', async(req, res, next) => {
  try {
    const result = Joi.validate(req.body, userJoiSchema)
    if (result.err) {
      res.send({ Error: err });
    }

    const user = await User2.findOne({ 'email': result.value.email })
    if (user) {
      res.send({ Error: 'Email is already in use.'})

    }

    const hash = await User2.hashPassword(result.value.password)

  
    result.value.password = hash

    const newUser = await new User2(result.value)
    await newUser.save();
    res.sendStatus(201);
    console.log(newUser);

  } catch(err) {
    next(err)
  }

});


router.post('/users/login', (req, res, next)=>{
  User2.find({email: req.body.email})
  .exec()
  .then(doc =>{
    if(doc.length < 1){
      return res.status(401).json({ Error_Message: 'Auth failed1'})
    }
    bcrypt.compare(req.body.password, doc[0].password, (err, results)=>{
      if(err){
        return res.status(401).json({Error_Message: 'Auth failed2'})
      }
      if(results){
        const token = jwt.sign({
          email: doc[0].email, 
          userId: doc[0]._id
        }, process.env.JWT_KEY, { expiresIn: "1h"});
        
        return res.status(200).json({ Message: 'Auth successful', token: token });
      }
      res.status(401).json({ Error_Message: 'Auth failed3'})

    });

  })
  .catch(err =>{
    res.status(500).json({ Error_Message: err});
  });
 



});



router.put('/users/:id', Auth, (req, res, next) =>{
  //Unencrypted password will be save in DB if updated
  User2.findOneAndUpdate({_id: req.params.id}, req.body)
  .exec()
  .then(docs =>{
    res.send(200);
  })
  .catch(err =>{
    res.send(500)
  })


});


router.delete('/users/:id', (req, res, next) =>{
  User2.findByIdAndDelete({_id: req.params.id})
  .exec()
  .then(docs => {
    res.send({ Message: 'User deleted.' })
  })
  .catch(err => {
    res.status(500).json({ Error: err })
  });

  
});


module.exports = router;
