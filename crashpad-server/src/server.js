const express = require('express'),
    path = require('path'),
    http = require('http'),
    multer = require('multer'),
    port = process.env.port || 3000;

const appCrashesController = require('./controllers/appcrashes.controller');

const app = express(),
    server = http.createServer(app);

const storeDump = multer({
    dest: path.join(__dirname, 'crash-dumps'),
}).single('upload_file_minidump');

app.post('/api/crashes', storeDump, appCrashesController.receiveCrash);

server.listen(port, () => {
    console.info(`crashpad server listening on ${port}`);
});
