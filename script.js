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
        statusDiv.textContent = "STATUS: -";
        document.body.classList.remove("panic");
        return;
    }

    const burnRate = cost * rps;

    if (burnRate === 0) {
        resultDiv.textContent = "No Spending Occurring";
        tickerDiv.textContent = "";
        statusDiv.textContent = "STATUS: OPTIMIZED";
        document.body.classList.remove("panic");
        return;
    }

    let currentBudget = budget;

    tickerDiv.textContent = `$${currentBudget.toFixed(2)} remaining`;

    const updateTimeAndStatus = () => {
        const remainingSec = currentBudget / burnRate;

        const days = Math.floor(remainingSec / 86400);
        const hours = Math.floor((remainingSec % 86400) / 3600);
        const minutes = Math.floor((remainingSec % 3600) / 60);
        const seconds = Math.floor(remainingSec % 60);

        resultDiv.textContent = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds remaining`;

        if (remainingSec < 86400) {
            statusDiv.textContent = "STATUS: OVERRUN RISK";
            statusDiv.classList.remove("safe");
            statusDiv.classList.add("risk");
            document.body.classList.add("panic");
        } else {
            statusDiv.textContent = "STATUS: OPTIMIZED";
            statusDiv.classList.remove("risk");
            statusDiv.classList.add("safe");
            document.body.classList.remove("panic");
        }
    };

    updateTimeAndStatus();

    tickingInterval = setInterval(() => {
        currentBudget -= burnRate;

        if (currentBudget <= 0) {
            currentBudget = 0;
            tickerDiv.textContent = "$0.00";
            resultDiv.textContent = "0 days 0 hours 0 minutes 0 seconds remaining";
            statusDiv.textContent = "STATUS: OVERRUN RISK";
            statusDiv.classList.remove("safe");
            statusDiv.classList.add("risk");
            document.body.classList.add("panic");
            clearInterval(tickingInterval);
            return;
        }

        tickerDiv.textContent = `$${currentBudget.toFixed(2)} remaining`;

        updateTimeAndStatus();

    }, 1000);
});