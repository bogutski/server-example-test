import mongoose from 'mongoose';

const {
  NODE_ENV,
  MONGO_CONNECTION_STRING_LOCAL,
  MONGO_CONNECTION_STRING = 'mongodb://localhost:27017/codewars', // for local test
} = process.env;

let connectionString;

switch (NODE_ENV) {
  case 'local':
    connectionString = MONGO_CONNECTION_STRING_LOCAL;
    break;

  default:
    connectionString = MONGO_CONNECTION_STRING;
}

const options = {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  autoIndex: false,
  useFindAndModify: false,
};

export default function mongoConnection() {
  mongoose.connect(connectionString, options).catch(err => console.log(err));

  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
  });
}
