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

router.post('/SaveProfile/:userId', (req, res) => {
    res.json({ status: 'success' });
});

router.get('/GetProfile/:userId', (req, res) => {
    res.json({ status: 'success' });
});

module.exports = router;
