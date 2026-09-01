const ctx = document.querySelector('#grafico-ev-anual');
const ctx2 = document.querySelector('#grafico-ev-acumulada');

const evolucaoAnual = (valores) => {
    return valores.map((valorAtual, indice) => {
        if (indice === 0) return 0;

        const valorAnterior = valores[indice - 1];
        if (valorAnterior === 0) return 0;

        return Number((((valorAtual - valorAnterior) / valorAnterior) * 100).toFixed(2));
    });
};

const evolucaoAcumulada = (valores) => {
    return valores.map((valorAtual, indice) => {
        if (indice === 0) return 0;

        const valorBase = valores[0];
        if (valorBase === 0) return 0;

        return Number((((valorAtual - valorBase) / valorBase) * 100).toFixed(2));
    });
};


const grafico = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Evolução RCL (%)',
            data: []
        }, {
            label: 'Evolução DTP (%)',
            data: []
        }, {
            label: 'Evolução FUNDEB (%)',
            data: []
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title : {
                display: true,
                text: 'Evolução Anual (%)'
            }
        },
        animations: {
            animation: {
                duration: 1200,
                easing: 'easeOutQuart'
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: (value) => `${value}%`
                }
            }
        }
    }
});

const grafico2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Evolução RCL (%)',
            data: []
        }, {
            label: 'Evolução DTP (%)',
            data: []
        }, {
            label: 'Evolução FUNDEB (%)',
            data: []
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title : {
                display: true,
                text: 'Evolução Anual Acumulada (%)'
            }
        },
        animations: {
            animation: {
                duration: 1200,
                easing: 'easeOutQuart'
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: (value) => `${value}%`
                }
            }
        }
    }
});
 
window.atualizarGrafico = function(dados) {
    
    const anos = dados.map(dado => dado.ano)
    const rcl = dados.map(dado => Number(dado.rcl));
    const dtp = dados.map(dado => Number(dado.dtp));
    const fundeb = dados.map(dado => Number(dado.fundeb));

    const evAnualRcl = evolucaoAnual(rcl);
    const evAnualDtp = evolucaoAnual(dtp);
    const evAnualFundeb = evolucaoAnual(fundeb);

    const evAcumuladaRcl = evolucaoAcumulada(rcl);
    const evAcumuladaDtp = evolucaoAcumulada(dtp)
    const evAcumuladaFundeb = evolucaoAcumulada(fundeb);

    grafico.data.labels = anos;
    grafico.data.datasets[0].data = evAnualRcl;
    grafico.data.datasets[1].data = evAnualDtp;
    grafico.data.datasets[2].data = evAnualFundeb;

    grafico2.data.labels = anos;
    grafico2.data.datasets[0].data = evAcumuladaRcl;
    grafico2.data.datasets[1].data = evAcumuladaDtp;
    grafico2.data.datasets[2].data = evAcumuladaFundeb;

    grafico2.update();
    grafico.update();
};