const { MongoClient } = require('mongodb');

const getCollection = async (req, res) => {
  const { dbName, collection } = req.params;

  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });

  await client.connect();
  console.log('connected2');

  const db = client.db(dbName);
  db.collection(collection)
    .find()
    .toArray((err, data) => {
      if (err) {
        res.status(404);
      } else {
        res.status(201).json({ status: 201, data: data });
        client.close();
        console.log('disconnected2');
      }
    });
};

module.exports = { getCollection };
