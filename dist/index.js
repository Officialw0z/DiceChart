"use strict";
const dice = {
    sides: 6,
    throw() {
        return Math.floor(Math.random() * this.sides) + 1;
    },
};
const diceResults = [0, 0, 0, 0, 0, 0];
// Funktion för att återställa allt
function resetResults() {
    // Återställ arrayen med resultat
    for (let i = 0; i < diceResults.length; i++) {
        diceResults[i] = 0;
    }
    // Rensa texten i resultsDiv
    const resultsDiv = document.getElementById('results');
    if (resultsDiv) {
        resultsDiv.innerHTML = '';
    }
    // Uppdatera diagrammet
    diceChart.data.datasets[0].data = diceResults;
    diceChart.update();
}
const ctx = document.getElementById('diceChart');
const diceChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Nummer 1', 'Nummer 2', 'Nummer 3', 'Nummer 4', 'Nummer 5', 'Nummer 6'],
        datasets: [{
                label: '',
                data: [0, 0, 0, 0, 0, 0],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)'
                ],
                borderColor: 'rgb(255, 255, 255)',
                borderWidth: 1
            }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Fördelning utav 10 000 tärningskast',
                color: 'rgb(0, 0, 0)',
                font: {
                    size: 40,
                    weight: 'bold'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'rgb(0, 0, 0)'
                }
            },
            y: {
                ticks: {
                    color: 'rgb(0, 0, 0)',
                    beginAtZero: true
                }
            }
        },
    }
});
function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    if (resultsDiv) {
        resultsDiv.innerHTML = ''; // Rensa tidigare resultat
        results.forEach((result, index) => {
            resultsDiv.innerHTML += `<p>Kast ${index + 1}: ${result}</p>`;
        });
    }
}
// Event Listener för klick på knappen
window.addEventListener('click', function () {
    // Återställ allt
    resetResults();
    // Utför nya kast och uppdatera resultat
    for (let i = 0; i < 10000; i++) {
        const diceRoll = Math.floor(Math.random() * 6) + 1;
        diceResults[diceRoll - 1]++;
    }
    // Uppdatera diagram och visa resultat
    diceChart.data.datasets[0].data = diceResults;
    diceChart.update();
    displayResults(diceResults);
});
