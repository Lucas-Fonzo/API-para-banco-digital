# API-para-banco-digital

## O que é esse projeto?

O projeto é uma RESTful API que simula um sistema de banco online, oferecendo diversas funcionalidades, tais como:

- Criar conta bancária.
- Listar contas bancárias.
- Atualizar os dados do usuário.
- Excluir uma conta.
- Depositar em uma conta.
- Sacar de uma conta.
- Transferir valores entre contas.
- Consultar saldo da conta.
- Emitir extrato bancário.

## Como Executar?

Para executar o projeto, siga os passos abaixo:

1. No terminal, navegue até a pasta raiz do projeto.
2. Execute o comando `npm install` para instalar as dependências do projeto.
3. Para iniciar o servidor, utilize o comando `npm run dev`.

## Rotas

- GET `/contas?senha_banco=Cubos123Bank` - Lista todas as contas existentes.
- POST `/contas` - Cria uma nova conta.
- PUT `/contas/:numeroConta/usuario` - Atualiza os dados de um usuário de conta.
- DELETE `/contas/:numeroConta` - Deleta uma conta.
- POST `/transacoes/depositar` - Efetua um depósito em uma conta.
- POST `/transacoes/sacar` - Efetua um saque de uma conta.
- POST `/transacoes/transferir` - Efetua uma transferência de uma conta para outra.
- GET `/conta/saldo?numero_conta=123&senha=123` - Emite o saldo da conta.
- GET `/conta/extrato?numero_conta=123&senha=123` - Emite o extrato da conta.

## Como Contribuir

Sinta-se à vontade para contribuir com o projeto! Você pode seguir os seguintes passos:

1. Faça um fork do repositório.
2. Crie uma branch para a sua feature: `git checkout -b minha-feature`.
3. Faça commit das suas alterações: `git commit -m 'Adicionando uma nova feature'`.
4. Faça push da sua branch: `git push origin minha-feature`.
5. Envie um pull request.

## Vídeo

[![API Banco Digital](https://ytcards.demolab.com/?id=tFyjhiydrFc&title=API+Banco+Digital&lang=pt&timestamp=1714615202&background_color=%230d1117&title_color=%23ffffff&stats_color=%23dedede&max_title_lines=1&width=250&border_radius=5&duration=736 "5 things I wish I knew before studying Computer Science")](https://www.youtube.com/watch?v=tFyjhiydrFc)
