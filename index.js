import express from 'express';
import bodyParser from 'body-parser';
import { sendMessage ,createUser, readUsers, deleteUser, login, logout, profile} from './firebase/chat.js';
import {fireapp,db} from './firebase/config.js';
import { signIn } from './firebase/auth.js';

const app = express();
app.set('view engine','hbs');
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.get("/", (req,res) => {
    res.render("login");
});

app.get("/login",login);
app.get("/logout",logout);
app.get("/profile",profile);
app.delete("/deleteMe",deleteUser)

app.post('/createUser', createUser);

app.get('/allUsers', readUsers)

app.post("/send", async (req,res) =>{
    const data=req.body;
    sendMessage(data);
    res.send({msg:'Message Send!'});
});

app.listen(5000, () => console.log('server running on port 5000.'))