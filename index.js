import express from 'express';
import bodyParser from 'body-parser';

import authRoute from './routes/auth.js';
import profileRoute from './routes/profile.js';
import requestRoute from './routes/request.js';

const app = express();
app.set('view engine','hbs');
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.get("/", (req,res) => {
    res.render("login");
});

app.use('/',authRoute);
app.use('/profile',profileRoute)
app.use('/request',requestRoute)

app.listen(5000, () => console.log('server running on port 5000.'))