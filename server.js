const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const items = require("./routes/api/items");
const app = express();

//body-parser Moddleware
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;
//connect to mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log('Mongo DB connected');
    })
    .catch(err => {
        console.log(err);
    });

//user routes
app.use('/api/items', items);

//serve static static assets if in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static("client/build"));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`server started on port ${port}`)
});