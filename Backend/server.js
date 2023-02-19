const express = require("express");
const dotenv = require("dotenv");
const fetch = require("cross-fetch");
const { OAuth2Client } = require("google-auth-library");

dotenv.config();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const app = express();

app.use(express.json());

const users = [];

function upsert(array, item) {
    const i = array.findIndex((_item) => _item.email === item.email);
    if (i > -1) array[i] = item;
    else array.push(item);
    console.log('user: ', users)
}

app.post("/api/google-login", async (req, res) => {
    // console.log('entering backend: ', req.body)
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });

    const { name, email, picture } = ticket.getPayload();
    const jokes = await fetch('https://backend-omega-seven.vercel.app/api/getjoke');
    const responseJokes = await jokes.json();
    console.log(responseJokes)
    upsert(users, { name, email, picture });
    res.status(201);
    res.json({ name, email, picture });
});

app.listen(process.env.PORT || 8800, () => {
    console.log(
        `Server is ready at http://localhost:${process.env.PORT || 8800}`
    );
});