const express = require("express");
const mongoose = require("mongoose");


const port = 3000;
const db = "mongodb://localhost:27017";
const app = express();
const userRouter = require("./routes/userRouter");
app.use(express.json());
app.use(userRouter);

app.listen(port, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`Connecté au serveur sur le port ${port}`);
    }
});

mongoose.set("strictQuery", true);
mongoose.connect(db)
    .then(() => {
        console.log("Connecté à MongoDB");
    })
    .catch((err) => {
        console.error("Erreur de connexion à MongoDB :", err);
    });