document.addEventListener("DOMContentLoaded", async () => {
    const toSelect = document.getElementById("to-currency");
  
    const apiKey = "5694d3fdc6a6e69555637f8214a1f444";
    const symbolsUrl = `https://data.fixer.io/api/symbols?access_key=${apiKey}`;
  
    try {
      const response = await fetch(symbolsUrl);
      const data = await response.json();
  
      if (data.success) {
        toSelect.innerHTML = "";
        Object.entries(data.symbols).forEach(([code, name]) => {
          if (code === "EUR") return;
          const option = document.createElement("option");
          option.value = code;
          option.textContent = `${code} - ${name}`;
          toSelect.appendChild(option);
        });
        toSelect.value = "USD";
      }
    } catch {
    }
  
    const form = document.getElementById("converter-form");
    const resultSection = document.getElementById("conversion-result");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const amount = parseFloat(document.getElementById("amount").value);
      const toCurrency = toSelect.value;
  
      const url = `https://data.fixer.io/api/latest?access_key=${apiKey}&base=EUR`;
  
      try {
        const response = await fetch(url);
        const data = await response.json();
  
        if (data.success) {
          const rate = data.rates[toCurrency];
          if (rate) {
            const converted = (amount * rate).toFixed(2);
  

            const countryRes = await fetch(`https://restcountries.com/v3.1/currency/${toCurrency.toLowerCase()}`);
            const countries = await countryRes.json();
  
            let countryInfo = "";
            countries.slice(0, 2).forEach(country => {
              countryInfo += `
                <div class="country">
                  <h3>${country.name.common}</h3>
                  <img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="100">
                  <p>Capital: ${country.capital?.[0] || "N/A"}</p>
                  <p>Region: ${country.region}</p>
                  <p>Population: ${country.population.toLocaleString()}</p>
                </div>
              `;
            });
  
            resultSection.innerHTML = `
              <h2>Result</h2>
              <p><strong>${amount} EUR</strong> = <strong>${converted} ${toCurrency}</strong></p>
              <h3>Countries that use ${toCurrency}:</h3>
              <div class="country-info">${countryInfo}</div>
            `;
            return;
          }
        }
        resultSection.innerHTML = "";
      } catch {
        resultSection.innerHTML = "";
      }
    });
  });
  
  
  
  