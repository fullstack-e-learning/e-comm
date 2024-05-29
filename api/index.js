const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000


//middleware
app.use(express.json()) //json
app.use(express.raw()) // ?
app.use(express.text()) //text
app.use(express.urlencoded({ extended: true })) //form data or url-encoded
app.use(cors())
app.use((req, res, next) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = dd + '/' + mm + '/' + yyyy + ' ' + hour + ':' + min + ':' + sec;

    console.log(`[${formattedToday}] ${req.method} ${req.ip} ${req.url} ${res.statusCode}`)
    next()
})

//db
const mongoose = require('mongoose')
const DB_HOST = `mongodb://${process.env.DB_HOST || '127.0.0.1:27017'}`
const DB_NAME = process.env.DB_NAME || 'ecom'
const DB_USER = process.env.DB_USER || 'root'
const DB_PASS = process.env.DB_PASS || 'example'

mongoose.connect(DB_HOST, { dbName: DB_NAME, user: DB_USER, pass: DB_PASS, connectTimeoutMS: 1000, socketTimeoutMS: 1000})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => {
        console.error('Could not connect to MongoDB...', err)
        throw err
    })


const categorySchema = new mongoose.Schema({
    name: String,
    description: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

const Category = mongoose.model('Category', categorySchema);

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    image: Buffer,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

const Product = mongoose.model('Product', productSchema);

//health check
app.get('/ping', (req, res) => {
    mongoose.connection.db.admin().command({ ping: 1 })
        .then(() => res.json({ message: 'pong' }))
        .catch(() => res.status(500).json({ message: 'error' }))
})


app.post('/auth/register', (req, res) => {
    res.json({ message: 'register success' })
})

app.post('/auth/login', (req, res) => {
    res.json({ message: 'loggedin success' })
})
app.get('/auth/me', (req, res) => {
    res.json({ message: 'me success' })
})

app.post('/auth/logout', (req, res) => {
    res.json({ message: 'logout success' })
})


app.get('/api/category', (req, res) => {
    Category.find()
        .then(categories => res.json(categories))
        .catch(err => res.status(500).json({ message: err.message }))
})

app.get('/api/category/:id', (req, res) => {
    Category.findById(req.params.id)
        .then(category => res.json(category))
        .catch(err => res.status(500).json({ message: err.message }))
})

app.get('/api/category/:id/product', (req, res) => {
    Category.findById(req.params.id)
        .populate('products')
        .then(category => res.json(category))
        .catch(err => res.status(500).json({ message: err.message }))
})

app.post('/api/category', (req, res) => {
    Category.create(req.body)
        .then(category => res.json(category))
        .catch(err => res.status(500).json({ message: err.message }))
})

app.put('/api/category/:id', (req, res) => {
    Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(category => res.json(category))
        .catch(err => res.status(500).json({ message: err.message }))
})

app.delete('/api/category/:id', (req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then(category => res.json(category))
        .catch(err => res.status(500).json({ message: err.message }))
})


app.get('/api/product', (req, res) => {
    Product.find()
        .populate('category')
        .then(products => res.json(products))
        .catch(err => res.status(500).json({ message: err.message }))
})

app.get('/api/product/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(500).json({ message: err.message }))
})

app.post('/api/product', (req, res) => {
    Category.findById(req.body.category)
    .then(category => {
        if (category) {
            // Category exists, create the product and associate it with the category
            Product.create(req.body)
                .then(product => {
                    // Keep a reference of the _id in the category
                    Category.findByIdAndUpdate(req.body.category, { $push: { products: product._id } })
                        .then(dbCategory => {
                            if (dbCategory) res.json(product)
                            else res.status(404).json({ message: 'Category with categoryId not found' })
                        })
                        .catch(err => { throw err })
                })
                .catch(err => res.status(500).json({ message: err.message }))
        } else {
            // Category does not exist, return an error
            res.status(404).json({ message: 'Category with categoryId not found' })
        }
    })
    .catch(err => res.status(500).json({ message: err.message }))
})

app.put('/api/product/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(product => res.json(product))
    .catch(err => res.status(500).json({ message: err.message }))
})

app.delete('/api/product/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(500).json({ message: err.message }))
}) 


app.all('*', (req, res) => {
    console.log(`${req.url} not found`)
    res.status(404).json({ message: 'route not found' })
})

//middleware error handler
app.use((err, req, res, next) => {
    console.log(`req.url ${req.url} , res.statusCode ${res.statusCode} `)

    console.error(err.stack)
    res.status(500).json({ message: err.message })
})

app.listen(port, () => {
  console.log(`api listening on port ${port}`)
})