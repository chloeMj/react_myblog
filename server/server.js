const express = require('express');
const app = express();

const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser');

sequelize.sync();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const {
    Teacher,
    Sequelize: { Op }
} = require('./models');
sequelize.query('SET NAMES utf8;');

app.get('/get/data', (req, res) => {
    Teacher.findAll()
        .then( result => {res.send(result)})
        .catch( err => {throw err})
})
app.post('/add/data', (req, res) => {
    Teacher.create({
        name : req.body.data
    })
    .then( result => {
        res.send(result)
    })
    .catch( err => {
        console.log(err)
        throw err;
    })
})

app.get('/api/host', (req, res) => {
    res.send({ host: 'mjsong' });
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})