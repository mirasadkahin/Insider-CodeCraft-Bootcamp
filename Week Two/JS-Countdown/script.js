let countdownInterval;
let remainingTime = 0;

function startCountdown() {
    if (countdownInterval) clearInterval(countdownInterval);

    remainingTime = parseInt(document.getElementById("timeInput").value);

    if (isNaN(remainingTime) || remainingTime <= 0) {
        alert("Lütfen geçerli bir süre girin!");
        return;
    }

    document.getElementById("countdown").textContent = remainingTime + " saniye kaldı.";

    countdownInterval = setInterval(() => {
        remainingTime--;
        if (remainingTime > 0) {
            document.getElementById("countdown").textContent = remainingTime + " saniye kaldı.";
        } else {
            document.getElementById("countdown").textContent = "Süre doldu!";
            clearInterval(countdownInterval);
        }
    }, 1000);
}

function resetCountdown() {
    clearInterval(countdownInterval);
    document.getElementById("countdown").textContent = "Süre sıfırlandı.";
    document.getElementById("timeInput").value = "";
}