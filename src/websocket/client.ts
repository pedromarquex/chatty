import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { UsersService } from '../services/UsersService';
import { MessagesService } from '../services/MessagesService';

interface Params {
  text: string;
  email: string;
}

io.on('connect', socket => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();

  socket.on('client_first_acess', async params => {
    const socket_id = socket.id;
    const { text, email } = params as Params;

    let user_id = null;

    const userExists = await usersService.create(email);

    if (!userExists) {
      const user = await usersService.create(email);

      await connectionsService.create({
        socket_id,
        user_id: user.id,
      });

      user_id = user.id;
    }
    user_id = userExists.id;

    const connection = await connectionsService.findByUserId(userExists.id);

    if (!connection) {
      await connectionsService.create({
        socket_id,
        user_id: userExists.id,
      });
    }
    connection.socket_id = socket_id;
    await connectionsService.create(connection);

    await messagesService.create({
      text,
      user_id,
    });
  });
});
