
export default {
  // o param key serve para termos um identificador desse nosso job
  key: 'UserReport',
  // o método handle será a ação que nosso job irá realizar que nesse caso será disparar um email para o usuário
  async handle({ data }: any) {
    const { user } = data;

    console.log(user);
  },
};
