import { Request, Response } from 'express';
import { UserService } from '../services/UsersService';

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const userService = new UserService();

    const user = await userService.create(email);

    return response.status(201).json(user);
  }
}

export { UsersController };
