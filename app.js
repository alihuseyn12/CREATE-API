const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());


mongoose.connect('mongodb://localhost:27017/Carsdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connection is succesfuly"))
    .catch(err => console.error(err));



const carsSchema = new mongoose.Schema({
    Model: String,
    Marka: String,
    year: Number,
    Price: String

});

const Car = mongoose.model('cars', carsSchema)
async function createCars() {
    let car = await Car({
        Model: '730',
        Marka: 'BMW',
        year: 2020,
        Price: '120 800 $'
    });
    car.save();

}
//createCars();

app.get('/app/cars', (req, res) => {
    async function getCars() {
        let car = await Car.find()
            .sort('Model')
            .select('Model Marka year Prices');

        res.send(car);
    }
    getCars();


});



const port = process.env.PORT;
app.listen(port, () => console.log("connection port is succesfuly"));