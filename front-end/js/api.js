const dataList = document.querySelector("#datalist");
const inpMunicipio = document.querySelector("#inp-municipio");
const formMunicipio = document.querySelector("#form-municipio");
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

    if (municipios.length > 0) {
        inpMunicipio.value = municipios[0];
        await buscarMunicipio();
    }
}


// Renderiza a tabela conforme os dados da função buscarMunicipio()
function renderHistorico(dados) {
    historicoContainer.innerHTML = "";

    const tabela = document.createElement("table");
    tabela.classList.add("tabela_historico");

    tabela.innerHTML = `
        <colgroup>
            <col class="coluna-indicadores">
            ${dados.map((dado) => {
                const ano = String(dado.ano);
                const classeAno = ano.replace(/[^a-zA-Z0-9_-]/g, "-");
                return `<col class="coluna_ano coluna_ano-${classeAno}" data_ano="${ano}">`;
            }).join("")}
        </colgroup>
        <thead class="tabela_thead">
            <tr>
                <th class="coluna_indicadores">Dados</th>
                ${dados.map((dado) => {
                    const ano = String(dado.ano);
                    const classeAno = ano.replace(/[^a-zA-Z0-9_-]/g, "-");
                    return `<th class="coluna_ano coluna_ano-${classeAno}" data_ano="${ano}">${ano}</th>`;
                }).join("")}
            </tr>
        </thead>
    `;

    const tbody = document.createElement("tbody");
    tbody.classList.add("tabela_tbody");

    const indicadores = [
        {
            nome: "RCL",
            valor: (dado) => formatarMoeda.format(Number(dado.rcl))
        },
        {
            nome: "DTP",
            valor: (dado) => formatarMoeda.format(Number(dado.dtp))
        },
        {
            nome: "DTP%",
            valor: (dado) => `${Number(dado.dtpPercentual).toFixed(2)}%`
        },
        {
            nome: "FUNDEB",
            valor: (dado) => formatarMoeda.format(Number(dado.fundeb))
        }
    ];

    indicadores.forEach((indicador) => {
        const linha = document.createElement("tr");
        const classeRcl = indicador.nome === "RCL" ? " rcl" : "";
        const classeDtpPercentual = indicador.nome === "DTP%" ? " dtp_percentual" : "";
        const classeDtp = indicador.nome === "DTP" ? " dtp" : "";
        const classeFundeb = indicador.nome === "FUNDEB" ? " fundeb" : "";

        if (classeRcl) {
            linha.classList.add("rcl");
        }
        
        if (classeDtpPercentual) {
            linha.classList.add("dtp_percentual");
        }
        if (classeDtp) {
            linha.classList.add("dtp");
        }
        if (classeFundeb) {
            linha.classList.add("fundeb");
        }

        linha.innerHTML = `
            <th class="coluna_indicadores" scope="row">${indicador.nome}</th>
            ${dados.map((dado) => {
                const ano = String(dado.ano);
                const classeAno = ano.replace(/[^a-zA-Z0-9_-]/g, "-");
                return `<td class="coluna_ano coluna_ano-${classeAno}${classeDtpPercentual}${classeDtp}" data_ano="${ano}">${indicador.valor(dado)}</td>`;
            }).join("")}
        `;
        tbody.appendChild(linha);
    });

    tabela.appendChild(tbody);
    historicoContainer.appendChild(tabela);
    verificarDtp();
}

renderHistorico([]);

function verificarDtp() {
    const dtpPercentual = document.querySelectorAll("td.dtp_percentual");

    dtpPercentual.forEach((celula) => {
        const valor = Number.parseFloat(celula.textContent.replace("%", ""));

        if (valor >= 48.6 && valor < 51.3) {
            celula.style.color = "#e6bc26";
        } else if (valor >= 51.3 && valor < 54) {
            celula.style.color = "#ff8400";
        } else if (valor >= 54) {
            celula.style.color = "#ec1717";
        } else {
            celula.style.color = "#27a34c";
        }
    });
};


// Busca os dados do município, atualiza a tabela e o grafico
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
    console.log(municipio);
    renderHistorico(municipio.dados);
    window.atualizarGrafico(municipio.dados);
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