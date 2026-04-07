let tickingInterval;

const button = document.getElementById("calcBtn");
const resultDiv = document.getElementById("result");
const tickerDiv = document.getElementById("ticker");

button.addEventListener("click", function () {
    const budget = document.getElementById("budget").valueAsNumber;
    const cost = document.getElementById("cost").valueAsNumber;
    const rps = document.getElementById("rps").valueAsNumber;

    if (tickingInterval) {
        clearInterval(tickingInterval);
    }

    if (isNaN(budget) || isNaN(cost) || isNaN(rps) || budget <= 0 || cost < 0 || rps < 0) {
        resultDiv.textContent = "Invalid Input";
        tickerDiv.textContent = "";
        return;
    }

    const burnRate = cost * rps;

    if (burnRate === 0) {
        resultDiv.textContent = "No Spending Occurring";
        tickerDiv.textContent = "";
        return;
    }

    const totalSec = budget / burnRate;

    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);

    resultDiv.textContent = `${days} days ${hours} hours ${minutes} minutes remaining`;

    let currentBudget = budget;

    tickerDiv.textContent = `$${currentBudget.toFixed(2)} remaining`;

    tickingInterval = setInterval(() => {
        currentBudget -= burnRate * 1;

        if (currentBudget <= 0) {
            currentBudget = 0;
            tickerDiv.textContent = "Budget Exhausted";
            clearInterval(tickingInterval);
            return;
        }

        tickerDiv.textContent = `$${currentBudget.toFixed(2)} remaining`;
    }, 1000);
});