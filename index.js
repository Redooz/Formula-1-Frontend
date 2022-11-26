const express = require('express');
const app = express();
const port = 3001;

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
});

app.listen(port, () => {
    console.log(`FrontEnd Server running at ${port}`);
})
