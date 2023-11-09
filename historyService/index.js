import express from 'express'
import router from "./router.js";
const app = express()

const PORT = 8001;

// app.use(express.urlencoded())
app.use(express.json())

app.use(router)

app.listen(PORT, ()=>{
    console.log(`historyService: http://localhost:${PORT}`)
})
