require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('DB connected!');
  });

const data = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`));

const deleteData = async () => {
  try {
    await Tour.deleteMany();
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const importData = async () => {
  try {
    await Tour.create(data);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv.includes('--delete')) {
  deleteData();
} else if (process.argv.includes('--import')) {
  importData();
}
