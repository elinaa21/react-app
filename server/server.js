const express = require('express');
const bodyParser = require('body-parser');
const sha1 = require('sha1');
const mongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb://localhost:27017';

const app = express();

app.use(bodyParser.json());

const RESPONSE_CODES = {
    OK: 200,
    FORBIDDEN: 403,
    NOT_AUTHORIZED: 401,
    CONFLICT: 409,
    SERVER_ERROR: 500,
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
        const { login, password } = req.body;
        mongoClient.connect(mongoURL, (err, db) => {
            if (err) throw err;

            const database = db.db('test');
            const sessionId = sha1(`${login}-${password}`);
            database.collection('sessions').findOne({ login, sessionId }, (err, result) => {
                if (err) throw err;

                if (result) {
                    res.set('Set-Cookie', `sessionId=${sessionId}`);
                    res.status(RESPONSE_CODES.OK);
                    res.json({ login });
                } else {
                    res.status(RESPONSE_CODES.FORBIDDEN);
                    res.json({ message: 'wrong login or password' });
                }
            });
        });
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
        const { login, password } = req.body;
        mongoClient.connect(mongoURL, (err, db) => {
            if (err) throw err;

            const database = db.db('test');
            database.collection('sessions').findOne({ login }, (err, result) => {
                if (err) throw err;

                if (result) {
                    res.status(RESPONSE_CODES.CONFLICT);
                    res.json({ message: 'user already exists' });
                }

                const sessionId = sha1(`${login}-${password}`);
                database.collection('sessions').insertOne({ login, sessionId }, (err) => {
                    if (err) {
                        res.status(RESPONSE_CODES.SERVER_ERROR);
                        res.json({ message: 'internal error' });
                    } else {
                        res.set('Set-Cookie', `sessionId=${sessionId}`);
                        res.status(RESPONSE_CODES.OK);
                        res.json({ login });
                    }
                });
            });
        });
        // open БД
        // файнд пользователя с таким логином 
        // если нашли - статус ответа конфликт и res.json - user already exists 
        // если не нашли добавляем в БД объект с логином и sessionId, ставим статус ОК и выставляем куки 
        //
    }
});

app.get('/api/check', (req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', 'true');
    let sessionId;
    const cookie = req.get('Cookie');
    if (cookie) {
        sessionId = cookie.split('=')[1];
    }
    mongoClient.connect(mongoURL, (err, db) => {
        if (err) throw err;

        const database = db.db('test');
        database.collection('sessions').findOne({ sessionId }, (err, result) => {
            if (err) throw err;

            if (result && result.login) {
                res.status(RESPONSE_CODES.OK);
                res.json({ userName: result.login, isAuth: true });
            } else {
                res.status(RESPONSE_CODES.FORBIDDEN);
                res.json({ message: 'invalid cookie', isAuth: false });
            }
        });

    });
});

app.delete('/api/login', (req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Credentials', 'true');
	res.set('Set-Cookie',`${req.get('Cookie')}; Max-age=0`);
	res.status(RESPONSE_CODES.OK);
	res.json({
		message: 'bye'
	});
});

app.listen(8000, () => console.log('Server running on http://localhost:8000'));
