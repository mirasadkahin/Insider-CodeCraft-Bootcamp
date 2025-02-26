function arrayLength(n, memo) {
    if (n === 1) return 1;
    if (memo[n]) return memo[n];

    let next = n % 2 === 0 ? n / 2 : 3 * n + 1;
    memo[n] = 1 + arrayLength(next, memo);
    return memo[n];
}

function findLongest(limit) {
    let longest = 0;
    let number = 0;
    let memo = {};

    for (let i = 1; i < limit; i++) {
        let length = arrayLength(i, memo);
        if (length > longest) {
            longest = length;
            number = i;
        }
    }

    return { number, longest, limit };
}

document.addEventListener("DOMContentLoaded", function () {
    let result = findLongest(1000000);

    let output = document.createElement("p");
    output.textContent = `${result.limit}' e kadar olan en uzun diziyi başlatan sayı: ${result.number}`;

    let output2 = document.createElement("p");
    output2.textContent = `Dizinin uzunluğu: ${result.longest} adım`;

    document.body.appendChild(output);
    document.body.appendChild(output2);
});
