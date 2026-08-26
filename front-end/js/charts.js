const ctx = document.querySelector('#grafico');
console.log(Chart);

const calcularEvolucao = (valores) => {
    return valores.map((valorAtual, indice) => {
        if (indice === 0) return 0;

        const valorAnterior = valores[0];
        if (valorAnterior === 0) return 0;

        return Number((((valorAtual - valorAnterior) / valorAnterior) * 100).toFixed(2));
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
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
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
                    callback: (value) => `${value}%`}
            }
        }
    }
});

window.atualizarGrafico = function(dados) {
    
    const anos = dados.map(dado => dado.ano)
    const rcl = dados.map(dado => Number(dado.rcl));
    const dtp = dados.map(dado => Number(dado.dtp));
    const evolucaoRcl = calcularEvolucao(rcl);
    const evolucaoDtp = calcularEvolucao(dtp);

    grafico.data.labels = anos;
    grafico.data.datasets[0].data = evolucaoRcl;
    grafico.data.datasets[1].data = evolucaoDtp;

    grafico.update();
};