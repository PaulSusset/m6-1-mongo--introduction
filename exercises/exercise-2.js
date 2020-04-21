const { MongoClient } = require('mongodb');
const assert = require('assert');

const createGreeting = async (req, res) => {
  try {
    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    });
    await client.connect();
    console.log('connected');
    const db = client.db('exercises');
    const r = await db.collection('greetings').insertOne(req.body);
    assert.equal(1, r.insertedCount);
    res.status(201).json({ status: 201, response: req.body });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

const getGreeting = async (req, res) => {
  const { _id } = req.params;
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db('exercises');
  db.collection('greetings').findOne(
    { _id: _id.toUpperCase() },
    (err, result) => {
      result
        ? res.status(200).json({ status: 200, data: result })
        : res.status(404).json({ status: 404, data: 'Not found', error: err });
      client.close();
    }
  );
};

const getAllGreetings = async (req, res) => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  let { start, limit } = req.query;
  if (!start) start = 0;
  if (!limit) limit = 10;
  await client.connect();
  const db = client.db('exercises');
  const results = await (
    await db.collection('greetings').find().toArray()
  ).slice(start, start * 1 + limit * 1);
  res.status(200).json({ results });
};

const deleteGreeting = async (req, res) => {
  const { _id } = req.params;
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const db = client.db('exercises');
    const r = await db
      .collection('greetings')
      .deleteOne({ _id: _id.toUpperCase() });
    assert.equal(1, r.deletedCount);
    res.status(204).json({ status: 204, deleted: _id });
  } catch (err) {
    res.status(404).json({ status: 404, error: 'unsuccessful' });
  }
};

const updateGreeting = async (req, res) => {
  const { _id } = req.params;
  const { hello } = req.body;

  if (!hello) {
    res.status(400).json({
      status: 400,
      data: req.body,
      message: 'Only "hello" may be updated',
    });
    return;
  }
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const db = client.db('exercises');
    const r = await db
      .collection('greetings')
      .updateOne({ _id }, { $set: { ...req.body } });
    assert.equal(1, r.matchedCount);
    assert.equal(1, r.modifiedCount);
    res.status(200).json({ status: 200, _id, data: req.body });
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
};

module.exports = {
  createGreeting,
  getGreeting,
  getAllGreetings,
  deleteGreeting,
  updateGreeting,
};
