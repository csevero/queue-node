import { Request, Response } from 'express';
import Queue from '../lib/Queue';

export default {
  async store(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const user = {
      name,
      email,
      password,
    };

    // adicionar job RegistrationMail na fila para ser disparado o email
    await Queue.add('RegistrationMail', { user });

    // outro job que estamos usando apenas como exemplo que será executado junto o acima
    await Queue.add('UserReport', { user });

    return res.json(user);
  },
};
