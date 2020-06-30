const express = require('express');
const bodyParser = require('body-parser');
const sha1 = require('sha1');
const cors = require('cors');
const mongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb://localhost:27017';

const app = express();
const ws = require('http').createServer(app);
const io = require('socket.io').listen(ws);
ws.listen(777);

const userNameToId = {};
const anonyms = {};
const pendingMessages = {};

io.sockets.on('connection', function (socket) {
    console.log('connected');

    const { id } = socket.client;
    console.log(`User connected: ${id}`);
    anonyms[id] = true;

    socket.on('chatMessage', payload => {
        const targetId = userNameToId[payload.to];
        if (!targetId) {
            const queue = pendingMessages[payload.to];
            if (!queue) {
                pendingMessages[payload.to] = [ payload ]
            } else {
                pendingMessages[payload.to].push(payload);
            }

            Object.keys(anonyms).forEach((id) => {
                io.to(id).emit('who');

            });
            return;

        }
        io.to(targetId).emit('chatMessage', payload);
        // io.emit('chatMessage', message);
        // socket.to()
    });

    socket.on('who', userName => {
        delete anonyms[id];
        userNameToId[userName] = id;
        const queue = pendingMessages[userName];
        if (queue) {
            queue.forEach((payload) => {
                io.to(id).emit('chatMessage', payload);
            });
        }
    });

    socket.on('match', userName => {
        delete anonyms[id];
        // console.log(userName);
        if (!userNameToId[userName]) {
            userNameToId[userName] = [id];
            return;
        }
        userNameToId[userName].push(id);
    });

    socket.on('disconnect', () => {
        delete anonyms[id];
        Object.keys(userNameToId).forEach((userName) => {
            userNameToId[userName] = userNameToId[userName].filter((_id) => _id !== id);
        });
        console.log('disconnected');
    })
});

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
    res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    res.set('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.end();
});

app.post('/api/login', cors(), (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.set('Access-Control-Allow-Credentials', 'true');
    if (!req.body || !req.body.login || !req.body.password) {
        res.status(RESPONSE_CODES.FORBIDDEN);
        res.json({ message: 'wrong request body format' });
    } else {
        const { login, password } = req.body;
        mongoClient.connect(mongoURL, (err, db) => {
            if (err) {
                res.status(RESPONSE_CODES.SERVER_ERROR);
                res.json({ message: 'internal error' });
                return;
            }

            const database = db.db('test');
            const sessionId = sha1(`${login}-${password}`);
            database.collection('sessions').findOne({ login, sessionId }, (err, result) => {
                if (err) {
                    res.status(RESPONSE_CODES.SERVER_ERROR);
                    res.json({ message: 'internal error' });
                    return;
                }

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
    }
});

app.post('/api/register', cors(), (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.set('Access-Control-Allow-Credentials', 'true');
    if (!req.body || !req.body.login || !req.body.password) {
        res.status(RESPONSE_CODES.FORBIDDEN);
        res.json({ message: 'wrong request body format' });
    } else {
        const { login, password } = req.body;
        mongoClient.connect(mongoURL, (err, db) => {
            if (err) {
                res.status(RESPONSE_CODES.SERVER_ERROR);
                res.json({ message: 'internal error' });
                return;
            }

            const database = db.db('test');
            database.collection('sessions').findOne({ login }, (err, result) => {
                if (err) {
                    res.status(RESPONSE_CODES.SERVER_ERROR);
                    res.json({ message: 'internal error' });
                    return;
                }

                if (result) {
                    res.status(RESPONSE_CODES.CONFLICT);
                    res.json({ message: 'user already exists' });
                    return;
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
    }
});

app.get('/api/check', (req, res) => {
	res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.set('Access-Control-Allow-Credentials', 'true');
    let sessionId;
    const cookies = req.get('Cookie');
    if (cookies) {
        const cookie = cookies.split(';')[0];
        sessionId = cookie.split('=')[1];
        mongoClient.connect(mongoURL, (err, db) => {
            if (err) {
                res.status(RESPONSE_CODES.SERVER_ERROR);
                res.json({ message: 'internal error' });
                return;
            }
    
            const database = db.db('test');
            database.collection('sessions').findOne({ sessionId }, (err, result) => {
                if (err) {
                    res.status(RESPONSE_CODES.SERVER_ERROR);
                    res.json({ message: 'internal error' });
                    return;
                }
    
                if (result && result.login) {
                    res.status(RESPONSE_CODES.OK);
                    res.json({ userName: result.login, isAuth: true });
                } else {
                    res.status(RESPONSE_CODES.FORBIDDEN);
                    res.json({ message: 'invalid cookie', isAuth: false });
                    return;
                }
            });
        });
    } else {
        res.status(RESPONSE_CODES.FORBIDDEN);
        res.json({ message: 'invalid cookie', isAuth: false });
        return;
    }
});

app.delete('/api/login', (req, res) => {
	res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.set('Access-Control-Allow-Credentials', 'true');
	res.set('Set-Cookie',`${req.get('Cookie')}; Max-age=0`);
	res.status(RESPONSE_CODES.OK);
	res.json({
		message: 'bye'
	});
});

app.listen(8000, () => console.log('Server running on http://localhost:8000'));
