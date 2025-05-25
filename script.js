const pairSelect = document.getElementById("pair");
const currentPairText = document.getElementById("current-pair");
const buyBtn = document.getElementById("buy");
const sellBtn = document.getElementById("sell");
const countdownText = document.getElementById("countdown");
const nextTradeBtn = document.getElementById("next-trade");

let cooldown = false;
let countdown = 60;
let interval;

pairSelect.addEventListener("change", () => {
  currentPairText.textContent = `Your trade: ${pairSelect.value}`;
});

function resetButtons() {
  buyBtn.className = "inactive";
  sellBtn.className = "inactive";
}

function startCountdown() {
  cooldown = true;
  countdown = 60;
  countdownText.textContent = `Next trade in: ${countdown}s`;

  interval = setInterval(() => {
    countdown--;
    countdownText.textContent = `Next trade in: ${countdown}s`;
    if (countdown === 0) {
      clearInterval(interval);
      cooldown = false;
      countdownText.textContent = "New trade available!";
      resetButtons();
    }
  }, 1000);
}

function generateSignal() {
  if (cooldown) return;

  resetButtons();
  const signal = Math.random() < 0.5 ? "Buy" : "Sell";

  if (signal === "Buy") {
    buyBtn.className = "active-buy";
  } else {
    sellBtn.className = "active-sell";
  }

  startCountdown();
}

nextTradeBtn.addEventListener("click", generateSignal);
