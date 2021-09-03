Projeto que utiliza carregamento de tarefas em background, usando redis e bull para gerenciamento de jobs.

Estrutura do projeto:

- Dentro da pasta jobs ficará os registro de jobs que vamos criar, por exemplo, para cada registro de usuário será gerado um RegistrationMail na nossa fila de trabalhos para serem feitos em background.
- Dentro da pasta lib o file **Queue.ts** ficará as configurações de como será executada nossos jobs, prioridades, etc.

Para armazenar nossos jobs em algum lugar sem ser a memória pois é muito volátil e os dados podem ser facilmente perdido, vamos utilizar o redis no nosso projeto pois ele é bem performático e segue uma estrutura simples.
a estrutura dele é bem básica, seguindo a estrutura:
**key | value**

Para rodar o redis localmente via docker, basta rodar no terminal:
`docker run --name redis -p 6379:6379 -d -t redis:alpine`

## Como executar

- Clone o repositório na sua máquina
- Instale os pacotes com `yarn` ou `npm install`
- Para funcionar o processo de queues, você precisara ou ter o Redis instalado na sua máquina ou rodar ele via docker com o comando mostrado acima
- Existe 3 scripts possíveis no package, sendo:
  - `yarn dev` -> Executa tanto o script que é responsável por gerir os jobs quando o script que roda o server
  - `yarn dev:queue` -> Executa o script que é responsável por gerir os jobs
  - `yarn dev:server` -> Executa o server

A fonte do código desse projeto foi o vídeo da Rocketseat: [https://www.youtube.com/watch?v=uonKHztGhko](https://www.youtube.com/watch?v=uonKHztGhko)
