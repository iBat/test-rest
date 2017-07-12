const express = require('express');
const router = express.Router();
const User = require('../models/user');

/*
 * реализовать REST API используя https:// протокол
 можно использовать только методы GET и POST
 реализовать функции:
 создать нового юзера, если такового еще нет
 входные данные : UserID non-empty string[200]
 GET /CreateUser/<UserID>
 result: success/already exists/error

 сохранить User Profile
 входные данные :  UserID string[200], UserProfile long binary data;
 POST /SaveProfile/<UserID>
 body: <UserProfile>
 result: success/error

 выдать User Profile
 входные данные :  UserID string[200],
 выходные данные : UserProfile  long binary data;
 GET /GetProfile/<UserID>
 response: <UserProfile>
 result: success/error
 * */
router.get('/', (req, res) => {
  res.send('Ok');
});

router.get('/CreateUser/:userId', async (req, res) => {
    const userId = req.params.userId;
    const userDoc = await User.findById(userId);

    if (userDoc) {
        res.status(409);
        return res.json({ status: 'already exists' });
    }
    await User.create({ _id: userId });
    res.json({ status: 'success' });
});

router.post('/SaveProfile/:userId', async (req, res) => {
    const userId = req.params.userId;
    const userDoc = await User.findById(userId);

    if (!userDoc) {
        res.status(404);
        return res.json({ status: 'user not found' });
    }

    const chunks = [];

    req.on('data', data => {
        chunks.push(data);
    });

    req.on('end', async () => {
        userDoc.profile = Buffer.concat(chunks);
        await userDoc.save();
        res.json({ status: 'success' });
    });

    req.on('error', () => {
        res.status(500);
        res.json({ status: 'error' });
    });
});

router.get('/GetProfile/:userId', async (req, res) => {
    const userId = req.params.userId;
    const userDoc = await User.findById(userId);

    if (!userDoc) {
        res.status(404);
        return res.json({ status: 'user not found' });
    }

    if (!userDoc.profile) {
        return res.end();
    }

    res.send(userDoc.profile);
});

module.exports = router;
