# Análise de Viabilidade Econômica

Projeto full-stack para análise de viabilidade financeira para o estado do Paraná.

## Visão geral

Este projeto foi desenvolvido para resolver um problema de uma pequena empresa que trabalha com a analise de viabilidade econômica para o estado do Paraná. 

O sistema por enquanto utiliza de um banco de dados com dados fictícios para demonstrar seu funcionamento. 

O usuário insere na barra de busca o município desejado, logo em seguida o sitema retorna uma tabela com dados financeiros como Receita Corrente Líquida (RCL), Despesa Total c/ Pessoas (DTP), Percentual da Despesa Total com Pessoas (DTP%) que é calcula por " (DTP/RCL) x 100 " e FUNDEB. Em seguida, o sitema gera dois gráficos, o primeiro mostra o Percentual de Evolução Anual dos dados, ja o segundo mostra o Percentual de Evolução Anual Acumulada. 

A aplicação é composta por:

- backend em Node.js + Express + Prisma
- banco de dados PostgreSQL
- frontend em HTML, SCSS/CSS e JavaScript + Chart.js

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
│   ├── package.json
│   └── package-lock.json
├── front-end/
│   ├── js/
│   │   ├── api.js
│   │   └── chart.js
│   ├── styles/
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

## Licença

Este projeto é fornecido como estudo e desenvolvimento pessoal.