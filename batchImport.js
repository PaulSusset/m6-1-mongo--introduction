const fs = require('file-system');
const { MongoClient } = require('mongodb');
const assert = require('assert');

const greetings = JSON.parse(fs.readFileSync('data/greetings.json'));

const batchImport = async () => {
  console.log('greetings', greetings);
  try {
    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    });
    await client.connect();
    console.log('connected');
    const db = client.db('exercises');
    const r = await db.collection('greetings').insertMany(greetings);
    assert.equal(greetings.length, r.insertedCount);
    console.log(201);
  } catch (err) {
    console.log(err);
  }
  client.close();
};
batchImport();
