import Mail from '../lib/Mail';

export default {
  // o param key serve para termos um identificador desse nosso job
  key: 'RegistrationMail',
  // o método handle será a ação que nosso job irá realizar que nesse caso será disparar um email para o usuário
  async handle({ data }: any) {
    const { user } = data;

    await Mail.sendMail({
      from: 'Queue Node <queue@queuetest.com.br',
      to: `${user.name} <${user.email}>`,
      subject: 'Cadastro de usuário',
      html: `Olá ${user.name}, bem vindo ao nosso sistema`,
    });
  },
};
