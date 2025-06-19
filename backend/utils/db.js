const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'VisualizerVault';

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let db = null;

async function connectDB() {
    if (!db) {
        try {
            // Connect the client to the server
            await client.connect();
            console.log('Connected successfully to MongoDB server');
            
            // Set the database
            db = client.db(dbName);
            return client;
        } catch (error) {
            console.error('MongoDB connection error:', error);
            throw error;
        }
    }
    return client;
}

async function getDB() {
    await connectDB();
    if (!db) {
        throw new Error('Database not connected. Call connectDB() first.');
    }
    return db;
}

async function closeConnection() {
    if (client) {
        await client.close();
        db = null;
        console.log('MongoDB connection closed');
    }
}

async function insertOne(collectionName, document) {
    const db = await getDB();
    return db.collection(collectionName).insertOne(document);
}

async function find(collectionName, query = {}, options = {}) {
    const db = await getDB();
    return db.collection(collectionName).find(query, options).toArray();
}

async function findOne(collectionName, query = {}, options = {}) {
    const db = await getDB();
    return db.collection(collectionName).findOne(query, options);
}

async function updateOne(collectionName, filter, update, options = {}) {
    const db = await getDB();
    return db.collection(collectionName).updateOne(filter, { $set: update }, options);
}

async function deleteOne(collectionName, filter, options = {}) {
    const db = await getDB();
    return db.collection(collectionName).deleteOne(filter, options);
}

async function countDocuments(collectionName, query = {}, options = {}) {
    const db = await getDB();
    return db.collection(collectionName).countDocuments(query, options);
}

module.exports = {
    connectDB,
    getDB,
    closeConnection,
    insertOne,
    find,
    findOne,
    updateOne,
    deleteOne,
    countDocuments,
};
