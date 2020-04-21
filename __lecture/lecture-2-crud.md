# 6.1.2 CRUD

---

What does it stand for?

---

**C**reate
**R**ead
**U**pdate
**D**elete

---

🤔

- What are the equivalent _express_ methods?
  POST, GET, [PUT, PATCH], DELETE
- What are the corresponding _http_ codes?
  CEATE: 200
  READ: 201
  UPDATE/DELETE: 200/204 (Can't send information back with 204), these two are mostly interchangeable otherwise.

---

## In MongoDB

| CRUD       | Mongo methods   |
| ---------- | --------------- |
| **C**reate | `.insertOne()`  |
|            | `.insertMany()` |
| **R**ead   | `.findOne()`    |
|            | `.find()`       |
| **U**pdate | `.updateOne()`  |
| **D**elete | `.deleteOne()`  |

---

You will learn, **hands-on**, how to use these methods in today's workshop.

---
