require('dotenv').config();

const {Client} = require('pg');
const connectionString = process.env.DATABASE_URL;
const client = new Client({connectionString,ssl: {rejectUnauthorized: false}})

class Connect_Data{
    constructor(){
        Client.connect();
        return;
    }
}