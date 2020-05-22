const express = require('express');
const bodyParser = require('body-parser');
const sha1 = require('sha1');

const app = express();

app.use(bodyParser.json());

const RESPONSE_CODES = {
    OK: 200,
    FORBIDDEN: 403,
    NOT_AUTHORIZED: 401,
    CONFLICT: 409
};

app.options('/api/*', (req, res) => {
    res.status(RESPONSE_CODES.OK);
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    res.set('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.end();
});

app.post('/api/login', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', 'true');
    if (!req.body || !req.body.login || !req.body.password) {
        res.status(RESPONSE_CODES.FORBIDDEN);
        res.json({ message: 'wrong request body format' });
    } else {
        // открывоем базу данных 
        // считаем хеш от логин-пароль с помощью sha1
        // ищим в базе данных пользователя с токим лагинам и sessionId
        // res.status ok или forbidden
        // esli ok - res.set('Set-Cookie', `sessionId=${result.sessionId}`)
        // esli ne ok - res.json({ message: 'wrong login or password'})
    }
});

app.post('/api/register', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', 'true');
    if (!req.body || !req.body.login || !req.body.password) {
        res.status(RESPONSE_CODES.FORBIDDEN);
        res.json({ message: 'wrong request body format' });
    } else {
        const sessionId = sha1(`${req.body.login}-${req.body.password}`);
        // open БД
        // файнд пользователя с таким логином 
        // если нашли - статус ответа конфликт и res.json - user already exists 
        // если не нашли добавляем в БД объект с логином и sessionId, ставим статус ОК и выставляем куки 
        //
    }
});

app.listen(8000, () => console.log('Server running on http://localhost:8000'));
