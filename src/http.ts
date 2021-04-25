import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';
import ejs from 'ejs';

import './database';
import { routes } from './routes';

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.get('/pages/client', (_, response) => {
  return response.render('html/client.html');
});

app.get('/pages/admin', (_, response) => {
  return response.render('html/admin.html');
});

const http = createServer(app);
const io = new Server(http);

io.on('connection', (socket: Socket) => {
  console.log('se conectou', socket.id);
});

app.use(express.json());
app.use(routes);

export { http, io };
