import Queue from 'bull';
import * as jobs from '../jobs';
import redisConfig from '../../config/redis';

// com o object.values conseguimos pegar os valores dos objetos e dar um .map nele, nesse caso como nossos jobs tem a estrutura de {key, handle} nós teremos acesso a esses métodos
// basicamente o método abaixo deixamos mais automatizado o processo de criação de filas, onde em vez de precisar ir registrando job por job, dessa forma já rodamos em todos os jobs que estão criados e fica mais fácil para se localizar
const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, {
    redis: redisConfig,
  }),
  name: job.key,
  key: job.key,
  handle: job.handle,
}));

// aqui exportamos nossas filas e o método add que por sua vez agora recebe um name que será o nome do job que vamos usar e o data que são as variáveis que podemos passar para ele, com o name vamos dar um find em nossa lista de queues e encontrar o desejado
export default {
  // queue será o objeto que criamos acima
  queues,
  // método add será usado quando formos adicionar algum novo item de processamento dentro de uma fila
  add(name: String, data: any) {
    const queue = this.queues.find(queue => queue.name === name);

    return queue?.bull.add(data);
  },
  // método process será usado para comandar a execução das nossas filas
  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle);

      // aqui estamos escutando caso alguma de nossas filas dê alguma falha
      queue.bull.on('failed', (job, err) => {
        console.log(queue.key, job.data);
        console.log(err);
      });
    });
  },
};
