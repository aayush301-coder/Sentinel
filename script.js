let tickingInterval;

const button = document.getElementById("calcBtn");
const resultDiv = document.getElementById("result");
const tickerDiv = document.getElementById("ticker");
const statusDiv = document.getElementById("status");

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

    let currentBudget = budget;

    tickerDiv.textContent = `$${currentBudget.toFixed(2)} remaining`;
    const initialSec = currentBudget / burnRate;
    const initDays = Math.floor(initialSec / 86400);
    const initHours = Math.floor((initialSec % 86400) / 3600);
    const initMinutes = Math.floor((initialSec % 3600) / 60);
    const initSeconds = Math.floor(initialSec % 60);
    resultDiv.textContent = `${initDays} days ${initHours} hours ${initMinutes} minutes ${initSeconds} seconds remaining`;

    if(initialSec < 86400) {
        statusDiv.textContent = `STATUS: OVERRUN RISK`;
        document.body.classList.add("panic");
    }
    else {
        document.body.classList.remove("panic");
    }


    tickerDiv.textContent = `$${currentBudget.toFixed(2)} remaining`;

    tickingInterval = setInterval(() => {
        currentBudget -= burnRate;

        if (currentBudget <= 0) {
            currentBudget = 0;
            tickerDiv.textContent = "Budget Exhausted";
            resultDiv.textContent = "Time Finished";
            clearInterval(tickingInterval);
            return;
        }

        tickerDiv.textContent = `$${currentBudget.toFixed(2)} remaining`;

        const remainingSec = currentBudget / burnRate;
        const days = Math.floor(remainingSec / 86400);
        const hours = Math.floor((remainingSec % 86400) / 3600);
        const minutes = Math.floor((remainingSec % 3600) / 60);
        const seconds = Math.floor(remainingSec % 60);

        resultDiv.textContent = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds remaining`;
        if(remainingSec < 86400) {
            statusDiv.textContent = `STATUS: OVERRUN RISK`;
            document.body.classList.add("panic");
        } 
        else {
            document.body.classList.remove("panic");
        }

    }, 1000);
});