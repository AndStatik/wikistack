const express = require('express');
const router = express.Router();
const { Page } = require("../models");
const { addPage } = require('../views');

router.get('/', (req, res, next) => {
  res.send('getting');
})

router.post('/', async (req, res, next) => {
  await res.json(req.body);
  const title = req.body.title;
  const content = req.body.content;

  try {
    const page = await Page.create({
      title: title,
      content: content
    });

    res.redirect('/');
  } catch (error) { next(error) }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

router.post('/add', (req, res, next) => {
  const name = req.body.name; // What user types in the Author field
  const email = req.body.email;
  const title = req.body.title; // What user types in the Title field
  const content = req.body.content;
  const status = req.body.status;
  res.json(req.body);
})

module.exports = router;
