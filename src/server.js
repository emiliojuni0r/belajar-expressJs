const express = require('express');

const app = express();

app.get("/hello", (req, res) => {
    res.json({ message: "Hello Wolrd" })
})

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

