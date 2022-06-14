const db = require('../../data/db-config')
const getAll = () => {
  // DO YOUR MAGIC
  return db('cars')
}

const getById = (id) => {
  // DO YOUR MAGIC
  return db('cars').where('id', id).first();
}

const getByVin = (vin) => {
  // DO YOUR MAGIC
  return db('cars').where('vin', vin).first();
}

const create = (car) => {
  // DO YOUR MAGIC
  const [id] = db('cars').insert(car);
  return getById(id);
}

module.exports = {
  getAll,
  getById,
  create,
  getByVin
}