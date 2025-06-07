const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const result = document.getElementById('result');

async function populateCurrencyOptions() {
  const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
  const data = await res.json();
  const currencies = Object.keys(data.rates);

  currencies.forEach(currency => {
    const option1 = document.createElement('option');
    option1.value = currency;
    option1.text = currency;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = currency;
    option2.text = currency;
    toCurrency.appendChild(option2);
  });

  fromCurrency.value = 'USD';
  toCurrency.value = 'EUR';
}

async function convertCurrency() {
  const amount = document.getElementById('amount').value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (amount === '' || isNaN(amount)) {
    result.textContent = 'Please enter a valid amount';
    return;
  }

  const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
  const data = await res.json();
  const rate = data.rates[to];
  const converted = (amount * rate).toFixed(2);

  result.textContent = `${amount} ${from} = ${converted} ${to}`;
}

populateCurrencyOptions();
