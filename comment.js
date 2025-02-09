// Create web server
// Run the server
// Create a route for comment
// Create a route for comment/add
// Create a route for comment/delete
// Create a route for comment/edit
// Create a route for comment/update

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('./models/comment');

// Create web server
const app = express();

// Run the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comment', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Create a route for comment
app.get('/comment', (req, res) => {
    Comment.find().then(comments => {
        res.json(comments);
    });
});

// Create a route for comment/add
app.post('/comment/add', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment
    });

    comment.save().then(() => {
        res.json(comment);
    });
});

// Create a route for comment/delete
app.delete('/comment/delete/:id', (req, res) => {
    Comment.findByIdAndRemove(req.params.id).then(comment => {
        if (comment) {
            res.json(comment);
        } else {
            res.status(404).send('Comment not found');
        }
    });
});

// Create a route for comment/edit
app.get('/comment/edit/:id', (req, res) => {
    Comment.findById(req.params.id).then(comment => {
        if (comment) {
            res.json(comment);
        } else {
            res.status(404).send('Comment not found');
        }
    });
});

// Create a route for comment/update
app.put('/comment/update/:id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment
    }).then(comment => {
        if (comment) {
            res.json(comment);
        } else {
            res.status(404).send('Comment not found');
        }
    });
});