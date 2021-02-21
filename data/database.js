/* eslint-disable no-console */
const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: true, // build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  // family: 4 // Use IPv4, skip trying IPv6
};

const dbURL = `${process.env.DB_PREFIX}${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_CONNECTION_ADRESS}/herokutest200221?${process.env.DB_CONNECTION_OPTIONS}`;
// mongodb+srv://databaseAdminAbay:<password>@cluster0.ndxpv.mongodb.net/herokutest200221?retryWrites=true&w=majority

function dbConnect() {
  mongoose.connect(dbURL, options, (error) => {
    if (error) return console.log(error);
    return console.log(dbURL, ' ready to use.');
  });

  // const dbURL = `${process.env.DB_CONNECTION_ADRESS}/herokutest200221`;
  // function dbConnect() {
  //   mongoose.connect(dbURL, options, (error) => {
  //     if (error) return console.log(error);
  //     return console.log(dbURL, ' ready to use.');
  //   });
}

module.exports = dbConnect;
