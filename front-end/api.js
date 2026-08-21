const dataList = document.querySelector("#datalist");
const dataListAno = document.querySelector("#datalist-ano");
const inpMunicipio = document.querySelector("#inp-municipio");
const inpAno = document.querySelector("#inp-ano");

const formMunicipio = document.querySelector("#form-municipio");
const btnConsultar = document.querySelector("#btn-consultar");

const campoMunicipio = document.querySelector("#municipio");
const campoRcl = document.querySelector("#rcl");
const campoDtp = document.querySelector("#dtp");
const campodtpPercentual = document.querySelector("#dtp-percentual");
const campoFundeb = document.querySelector("#fundeb");

const formatarMoeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});

async function atualizarDataList() {
    const result = await fetch("http://localhost:3000/all-municipios");
    const municipios = await result.json();

    dataList.replaceChildren();
    municipios.forEach((municipio) => {
        const option = document.createElement("option");
        option.value = municipio.nome;
        dataList.appendChild(option);
    });

    const anos = await fetch("http://localhost:3000/anos");
    const anosJson = await anos.json();

    dataListAno.replaceChildren();
    anosJson.forEach((ano) => {
        const option = document.createElement("option");
        option.value = ano.ano;
        dataListAno.appendChild(option);
    });
}

async function buscarMunicipio() {
    const nome = inpMunicipio.value.trim();
    const ano = inpAno.value.trim();

    if (!ano) {
        return alert("Informe um ano");
    }

    if (!nome) {
        return alert("Informe um municipio");
    }

    const result = await fetch("http://localhost:3000/municipios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome,
            ano
        })
    });

    if (!result.ok) {
        const erro = await result.json().catch(() => ({}));
        throw new Error(erro.message || "Não foi possível consultar o município");
    }

    const municipio = await result.json();
    console.log(municipio);

    campoMunicipio.textContent = municipio.municipio;
    campoRcl.textContent = formatarMoeda.format(Number(municipio.rcl));
    campoDtp.textContent = formatarMoeda.format(Number(municipio.dtp));
    campodtpPercentual.textContent = `${Number(municipio.dtpPercentual).toFixed(2)}%`;
    campoFundeb.textContent = formatarMoeda.format(Number(municipio.fundeb));
}

formMunicipio.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        await buscarMunicipio();
    } catch (error) {
        alert(error.message);
    }
});

atualizarDataList();