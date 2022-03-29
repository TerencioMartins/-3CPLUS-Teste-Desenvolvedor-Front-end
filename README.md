# [3CPLUS] Teste Desenvolvedor Front-end
Projeto desenvolvido em Vue3 para teste de desenvolvedor Front-End da 3CPLUS.
<br></br>
## Instalação/Execução `DOCKER`

### Clone o repositório

```
git clone https://github.com/TerencioMartins/-3CPLUS-Teste-Desenvolvedor-Front-end.git
```

### Abra um terminal na pasta do repositorio clonado → `tenha certeza que você está no caminho correto.`

### Execute no terminal, para gerar a imagem:
```
docker image build -t terencio-martins/teste-front-end .
```

### Execute no terminal, para executar o container:
```
docker run -p 8080:8080 --name terencio-container terencio-martins/teste-front-end
```
### Depois de executados, acesse `localhost:8080`

#
<br></br>
## Instalação/Execução `NODE`

### Clone o repositório

```
git clone https://github.com/TerencioMartins/-3CPLUS-Teste-Desenvolvedor-Front-end.git
```

### Instale as dependencias

```
#npm
npm install
```
### Execute o projeto

```
#npm
npm run serve
```
ou
```
#npm
npm run dev
```
### Depois de executados, acesse `localhost:8080`

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
