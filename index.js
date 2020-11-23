
// DOM Selections

const currencyOne = document.querySelector(".currency_one");
const currencyTwo = document.querySelector(".currency_two");
const amountOne = document.querySelector(".amount_one");const amountTwo = document.querySelector(".amount_two");

const swap = document.querySelector(".swap");

const currentRate = document.querySelector(".current_rate");
const latestRates = document.querySelector(".latest_rates");

// Get Latest Rates
window.addEventListener("load", e => {

    const url = `https://api.exchangerate.host/latest?base=USD`;

    async function fetchLatestRates(){
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    fetchLatestRates().then(data => {

        latestRates.innerHTML = `
        <h1>Latest Rates</h1>
        <table>
            <tr height="25px">
                <td class="fas fa-dollar-sign">1</td>
                <td> = </td>
                <td class="fas fa-rupee-sign">${(data.rates.INR).toFixed(2)}</td>
            </tr>
            <tr height="25px">
                <td class="fas fa-pound-sign">1</td>
                <td> = </td>
                <td class="fas fa-rupee-sign">${(data.rates.INR/data.rates.GBP).toFixed(2)}</td>
            </tr>
            <tr height="25px">
                <td class="fas fa-euro-sign">1</td>
                <td> = </td>
                <td class="fas fa-rupee-sign">${(data.rates.INR/data.rates.EUR).toFixed(2)}</td>
            </tr>
            <tr height="25px">
                <td class="fas fa-yen-sign">1</td>
                <td> = </td>
                <td class="fas fa-rupee-sign">${(data.rates.INR/data.rates.JPY).toFixed(2)}</td>
            </tr>
        </table>
        <p>Last Updated: ${data.date}</p>
        <p>Data obtained from <i>ExchangeRate API</i></p>
            `;
    });
});
// fetch exchange rates and update the DOM

function calculate() {
    const currency1 = currencyOne.value;
    const currency2 = currencyTwo.value;

    const url = `https://api.exchangerate.host/latest?base=${currency1}`;


    async function fetchExchangeRate(){
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    
    fetchExchangeRate().then(data => {
        const rate = data.rates[currency2];

        amountTwo.value = (amountOne.value * rate).toFixed(2);

        currentRate.innerHTML = `
       <div>1 ${currencyOne.options[currencyOne.selectedIndex].text} equals</div>
      <span>${(rate).toFixed(3)} ${currencyTwo.options[currencyTwo.selectedIndex].text}</span> `;
    });
}

currencyOne.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
currencyTwo.addEventListener("change", calculate);
amountTwo.addEventListener("input", calculate);

// swap
swap.addEventListener('click', () => {

    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();
  });

calculate();
