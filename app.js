const express = require('express')
const app = express()
const connectToMOng = require("./db/db");
connectToMOng();
const port = 3000


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})