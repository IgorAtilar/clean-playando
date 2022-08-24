# ![Logo do Projeto](https://user-images.githubusercontent.com/73081443/186205443-b16c3274-30f7-4d1f-a1c8-650ca71330d0.png) Clean Playando

[![codecov](https://codecov.io/gh/IgorAtilar/clean-playando/branch/feat/codecov/graph/badge.svg?token=BW7L8PSZ5K)](https://codecov.io/gh/IgorAtilar/clean-playando)

## Preview

https://user-images.githubusercontent.com/73081443/186293465-3a93d14e-fee2-41f8-899d-cb2afb010110.mp4

## Funcionalidades

- O usuário pode adicionar vídeos à sua playlist e manter os dados salvos ao abrir e fechar o browser;
- O usuário pode realizar buscas de um vídeo por seu título ou pelo seu link e adicionar na sua playlist;
- O usuário pode filtrar os vídeos em sua playlist;
- O usuário pode remover vídeos da sua playlist;
- O usuário pode visualizar o vídeo, pausar, alterar o tempo e volume;
- Ao realizar uma busca repetida deve ser evitado a repetição da requisição na API.

## Tecnologias e ferramentas utilizadas

- Webpack;
- Typescript;
- Eslint;
- Prettier;
- Husky;
- Axios;
- React;
- Styled Components;
- Redux;
- Jest.

# Instalação

Será preciso criar uma key do Youtube para utilizar o projeto e você pode obter ela seguindo as instruções nesse link do próprio [Google](https://developers.google.com/youtube/v3/getting-started).
Depois desse passo, adicione um arquivo `.env` na raiz do projeto seguindo o exemplo do arquivo `.env.example` e insira a key do Youtube que você gerou dessa forma `YOUTUBE_API_URL=SUA_KEY_AQUI`.

Antes de seguir os próximos passos de instalação é necessário ter instalado o [Node.js](https://nodejs.org/en/), [Git](https://git-scm.com/) e o gerenciador de pacotes [Yarn](https://yarnpkg.com/).

Clone o projeto na pasta escolhida com o seguinte comando:

```
git clone https://github.com/IgorAtilar/clean-playando.git
```

Depois acesse o diretório utilizando:

```
cd clean-playando
```

Instale as dependências do projeto utilizando:

```
yarn
```

Rode o comando a seguir e o projeto estará rodando em http://localhost:3000/:

```
yarn dev
```

## :clapper: Créditos

<b>[Igor Atilar](https://www.linkedin.com/in/igor-atilar/)</b>
