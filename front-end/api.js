const dataList = document.querySelector("#datalist");
const inpMunicipio = document.querySelector("#inp-municipio");
const formMunicipio = document.querySelector("#form-municipio");
const campoMunicipio = document.querySelector("#municipio");
const historicoContainer = document.querySelector("#historico");

const formatarMoeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});

async function atualizarDataList() {
    const result = await fetch("http://localhost:3000/all-municipios");

    if (!result.ok) {
        throw new Error("Não foi possível carregar os municípios");
    }

    const municipios = await result.json();
    dataList.replaceChildren();

    municipios.forEach((municipio) => {
        const option = document.createElement("option");
        option.value = municipio;
        dataList.appendChild(option);
    });
}

function renderHistorico(dados) {
    historicoContainer.innerHTML = "";

    const tabela = document.createElement("table");
    tabela.innerHTML = `
        <thead>
            <tr>
                <th>Ano</th>
                <th>RCL</th>
                <th>DTP</th>
                <th>FUNDEB</th>
                <th>% DTP</th>
            </tr>
        </thead>
    `;

    const tbody = document.createElement("tbody");

    dados.forEach((dado) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${dado.ano}</td>
            <td>${formatarMoeda.format(Number(dado.rcl))}</td>
            <td>${formatarMoeda.format(Number(dado.dtp))}</td>
            <td>${formatarMoeda.format(Number(dado.fundeb))}</td>
            <td>${Number(dado.dtpPercentual).toFixed(2)}%</td>
        `;
        tbody.appendChild(linha);
    });

    tabela.appendChild(tbody);
    historicoContainer.appendChild(tabela);
}

async function buscarMunicipio() {
    const nome = inpMunicipio.value.trim();

    if (!nome) {
        return alert("Informe um municipio");
    }

    const result = await fetch("http://localhost:3000/municipios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome })
    });

    if (!result.ok) {
        const erro = await result.json().catch(() => ({}));
        throw new Error(erro.message || "Não foi possível consultar o município");
    }

    const municipio = await result.json();
    campoMunicipio.textContent = municipio.municipio;
    renderHistorico(municipio.dados);
}

formMunicipio.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        await buscarMunicipio();
    } catch (error) {
        alert(error.message);
    }
});

atualizarDataList().catch((error) => {
    alert(error.message);
});