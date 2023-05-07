import mongoose from 'mongoose';
import config from './config';

let dbURL = `mongodb://${config.database.username}:${config.database.password}@${config.database.hostname}:${config.database.port}/${config.database.name}`;
const conn = await mongoose.connect(dbURL);

export default conn;
