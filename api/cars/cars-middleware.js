const Cars = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  Cars.getById(req.params.id)
  .then(result =>{
    if (!result) {
      res.status(404).json({message: `"car with id ${req.params.id} is not found"`});
      return;
    }
    req.car = result;
    next();
  }).catch(error=>{
    res.status(500).json({message: `Server error ${error.message}`})
})
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  let { vin, make, model, mileage } = req.body;
  if (vin == null){
    res.status(400).json({message: `vin is missing`})
    return;
  } else if (make == null) {
    res.status(400).json({message: `make is missing`})
    return;
  } else if (model == null){
    res.status(400).json({message: `model is missing`})
    return;
  } else if (mileage == null){
    res.status(400).json({message: `mileage is missing`})
    return;
  } 
  next();
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const isValid = vinValidator.validate(req.body.vin);
  if (isValid === true) {
    next();
  } else {
    res.status(400).json({message: `vin ${req.body.vin} is invalid`})
  }
  
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  Cars.find({ vin: req.body.vin })
  .then(result =>{
    if (result.length > 0){
      res.status(400).json({message: `vin ${req.body.vin} already exists`})
    }
  })
  next();
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}