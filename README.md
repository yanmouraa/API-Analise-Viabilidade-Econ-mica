# Análise de Viabilidade Econômica

Projeto full-stack para análise de viabilidade financeira por município.

## Visão geral

Este projeto foi desenvolvido para permitir:

- consultar municípios disponíveis
- visualizar indicadores financeiros
- comparar valores como RCL, DTP e FUNDEB

A aplicação é composta por:

- backend em Node.js + Express + Prisma
- banco PostgreSQL
- frontend em HTML, CSS e JavaScript puro

## Estrutura do projeto

```text
.
├── back-end/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   ├── prisma.js
│   │   ├── routes.js
│   │   ├── seed.js
│   │   └── server.js
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
├── front-end/
│   ├── api.js
│   ├── index.html
│   └── ...
├── .gitignore
├── README.md
└── .env.example
```

## Requisitos

- Node.js 18+
- npm
- PostgreSQL

## Rodando a aplicação

### Backend

```bash
cd back-end
node src/server.js
```

O backend será executado em:

```text
http://localhost:3000
```

### Frontend

Abra o arquivo `front-end/index.html` no navegador.

## Rotas principais

### GET /all-municipios
Retorna todos os municípios.

### POST /municipios
Recebe o município e o ano e retorna os indicadores financeiros daquele período.

Exemplo de body:

```json
{
  "nome": "Curitiba",
  "ano": 2024
}
```

## Modelo de dados

O banco possui os modelos principais:

- `Municipio`
- `DadosFinanceiros`

Cada município pode ter vários registros financeiros por ano.

## Segurança

- Nunca commite arquivos `.env` com credenciais reais.
- Use `.env.example` como base para configuração local.
- Não compartilhe senhas, tokens ou strings de conexão em repositórios públicos.

## Licença

Este projeto é fornecido como estudo e desenvolvimento pessoal.