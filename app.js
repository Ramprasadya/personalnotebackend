const express = require('express')
const app = express()
const connectToMOng = require("./db/db");
var cors = require('cors')
connectToMOng();
const port = 3000

app.use(cors())
// Middaleware 
app.use(express.json())

// Available Routes 

app.use("/api/auth",require("./routes/auth"))
app.use("/api/notes",require("./routes/notes"))



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})