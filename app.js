const express = require('express')
const app = express()
const connectToMOng = require("./db/db");
connectToMOng();
const port = 3000

// Middaleware 
app.use(express.json())

// Available Routes 

app.use("/api/auth",require("./routes/auth"))
app.use("/api/notes",require("./routes/notes"))



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})