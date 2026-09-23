const classes = Array.from({ length: 23 }, (_, indice) => indice + 1);
const niveis = ["A", "B", "C", "D"];
const tabelasSalariais = document.querySelector("#tabelas-salariais");
const formSalarios = document.querySelector("#form-salarios");
const inputMunicipio = document.querySelector("#inp-salario-municipio");
const salariosDatalist = document.querySelector("#salarios-datalist");
const formatarMoeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });


const tabelaPSPN = async () => {
    const result = await fetch("http://localhost:3000/pspn");

    if (!result.ok) {
        throw new Error("Não foi possível carregar a tabela PSPN");
    }

    const dadosPspn = await result.json();
    return dadosPspn;
};
function criarMapa(salarios) {
    return new Map(salarios.map((item) => [`${item.nivel}-${item.classe}`, Number(item.salario)]));
}

function valorCelula(mapa, nivel, classe) {
    const valor = mapa.get(`${nivel}-${classe}`);
    return Number.isFinite(valor) ? formatarMoeda.format(valor) : "-";
}

function criarTabela(titulo, mapa, comparacao = null) {
    const tabela = document.createElement("article");
    tabela.className = "DS_table_card";
    tabela.innerHTML = `<div class="DS_table_heading"><h3>${titulo}</h3><span>Valores em R$</span></div>`;

    const wrapper = document.createElement("div");
    wrapper.className = "DS_table_scroll";
    const table = document.createElement("table");
    table.className = "DS_salary_table";
    table.innerHTML = `<thead><tr><th scope="col">Nível</th>${classes.map((classe) => `<th scope="col">${classe}</th>`).join("")}</tr></thead>`;

    const tbody = document.createElement("tbody");
    niveis.forEach((nivel) => {
        const row = document.createElement("tr");
        row.innerHTML = `<th scope="row">${nivel}</th>${classes.map((classe) => {
            const value = comparacao ? comparacao(mapa, nivel, classe) : valorCelula(mapa, nivel, classe);
            return `<td class="${value === "-" ? "is-empty" : ""}">${value}</td>`;
        }).join("")}`;
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    wrapper.appendChild(table);
    tabela.appendChild(wrapper);
    return tabela;
}

async function atualizarTabela() {
    const dadosPspn = await tabelaPSPN();

    renderizarTabelas(
        dadosPspn,
        dadosPspn,
        inputMunicipio.value
    )
}

function renderizarTabelas(pspn, municipal, nomeMunicipio) {
    const pspnMapa = criarMapa(pspn);
    const municipalMapa = criarMapa(municipal);
    tabelasSalariais.replaceChildren(
        criarTabela("Tabela PSPN", pspnMapa),
        criarTabela(`Tabela Salarial Municipal de ${nomeMunicipio}`, municipalMapa),
        criarTabela("Tabela de Defasagem", municipalMapa, (mapa, nivel, classe) => {
            const municipio = mapa.get(`${nivel}-${classe}`);
            const pspnValue = pspnMapa.get(`${nivel}-${classe}`);
            if (!Number.isFinite(municipio) || !Number.isFinite(pspnValue)) return "-";
            const diferenca = municipio - pspnValue;
            return `${diferenca >= 0 ? "+" : "-"}${formatarMoeda.format(Math.abs(diferenca))}`;
        })
    );
}

function consultarSalarios() {
    const nome = inputMunicipio.value.trim();
    if (!nome) return;
    renderizarTabelas(dadosPspn, dadosMunicipais, nome);
}

formSalarios.addEventListener("submit", (event) => {
    event.preventDefault();
    consultarSalarios();
});


//Dados de Simulação
const dadosPspn = niveis.flatMap((nivel) => classes.map((classe) => ({
    nivel,
    classe,
    salario: 2973.91 + (niveis.indexOf(nivel) * 446.09) + ((classe - 1) * 89.22)
})));
const dadosMunicipais = niveis.flatMap((nivel) => classes.map((classe) => ({
    nivel,
    classe,
    salario: 2840.00 + (niveis.indexOf(nivel) * 420.00) + ((classe - 1) * 84.00)
})));

salariosDatalist.replaceChildren();
const option = document.createElement("option");
option.value = "Município selecionado";
salariosDatalist.appendChild(option);
inputMunicipio.value = "Município selecionado";
atualizarTabela();
consultarSalarios();