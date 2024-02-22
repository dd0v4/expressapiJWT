const userModel = require("../models/userModel");
const userRouter = require("express").Router();
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401); 
    jwt.verify(token, "yo", (err, user) => {
        if (err) return res.sendStatus(403); 
        req.user = user;
        next();
    });
}

userRouter.get("/users", async (req, res) =>{
    try{
        let users = await userModel.find();
        res.send(users);
    }catch (error){
        res.send(error);
    }
});

userRouter.post("/users", async (req, res) =>{
    try{
        let newUser = new userModel(req.body);
        newUser.save();
        res.send("Utilisateur créé avec succès");
    }catch(error){
        res.send(error);
    }
});

userRouter.put("/users/:id", authenticateToken, async (req, res) =>{
    try{
        await userModel.updateOne({_id: req.params.id}, req.body);
        res.send("Utilisateur modifié.");
    }catch (error){
        res.send(error);
    }
});

userRouter.delete("/users/:id", authenticateToken, async (req, res) =>{
    try{
        await userModel.deleteOne({_id: req.params.id}, req.body);
        res.send("Utilisateur supprimé.");
    }catch (error){
        res.send(error);
    }
});

userRouter.put("/users/:id/books", authenticateToken, async (req, res) =>{
    try{
        await userModel.updateOne({_id: req.params.id}, {$push: req.body});
        res.send("Livre ajouté.");
    }catch (error){
        res.send(error);
    }
});

userRouter.get("/users/:id/books", authenticateToken, async (req, res) =>{
    try{
        let user = await userModel.findOne({_id: req.params.id});
        let books = user.books;
        res.send(books);
    }catch (error){
        res.send(error);
    }
});


userRouter.delete("/users/:id/books/:title", authenticateToken, async (req, res) =>{
    try {
        let user = await userModel.findOne({_id: req.params.id});
        let bookIndex = user.books.findIndex(book => book.title === req.params.title);
        if (bookIndex !== -1) {
            user.books.splice(bookIndex, 1);
            await user.save();
            res.send("Livre supprimé avec succès.");
        } else {
            res.send("Livre non trouvé dans la liste de l'utilisateur.");
        }
    } catch (error) {
        res.send(error);
    }
});

module.exports = userRouter;
