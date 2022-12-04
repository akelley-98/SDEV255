const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { find } = require('lodash');
const { render } = require('ejs');
const Blog = require(('./models/blogs'))

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://netninja:test1234@cluster0.0bpepwf.mongodb.net/note-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));
    

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blogs = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    Blog.save()
    .then((result) => {
        res.redirect('/blogs');
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('single-blog', (req,  res) => {
    Blog.findById('638bf1141e8ee8f1b9cafbb1')
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
})

app.get('/', (req, res) =>{ 
    res.redirect('/blogs');
});

app.get('/about', (req, res) =>{ 
    res.render('about', { title: 'About' });
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
    .then((result) => {
        res.redirect('/blogs');
    })
    .catch((err) => {
        console.log(err);
    });
});

// blog routes

app.get('/blogs/create', (req, res) =>{
    res.render('create', { title: 'Create a new Blog' });
})

app.get('/blogs',  (req, res) => {
    Blog.find().sort({ createAt: -1 })
    .then((result) => {
        res.render('index', {title: 'All Blogs', blogs: result})
    })
    .catch((err) => {
        console.log(err);
    })
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
        res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
        console.log(err);
    });
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/blogs' });
    })
    .catch(err => {
        console.log(err);
    });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});