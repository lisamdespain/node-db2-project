// DO YOUR MAGIC
const Cars = require('../cars/cars-model');
const router = require('express').Router();

const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware');

router.get('/', (req, res)=>{
    Cars.getAll()
    .then(cars =>{
        res.status(200).json(cars)
    }).catch(error =>{
        res.status(500).json({message: `Server error ${error.message}`})
    })
})

router.get('/:id', checkCarId, (req, res) =>{
    res.status(200).json(req.car)
})

router.post('/', checkCarPayload, checkVinNumberUnique, checkVinNumberValid, (req, res) =>{
    Cars.create(req.body)
    .then(newCar =>{
        res.status(201).json(newCar)
    }).catch(error =>{
        res.status(500).json({message: `Server error ${error.message}`})
    })
})






module.exports = router;