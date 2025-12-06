const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

let cryptoData = [];
let filteredData = [];


// FETCH DATA USING async/await

async function fetchUsingAsync() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    cryptoData = data;
    filteredData = data;
    renderTable(data);
  } catch (err) {
    console.log(err);
  }
}


// FETCH USING .then()

function fetchUsingThen() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      cryptoData = data;
      filteredData = data;
      renderTable(data);
    })
    .catch(err => console.log(err));
}

// CALL ANY ONE OF THESE
fetchUsingAsync();
// fetchUsingThen();


// RENDER TABLE

function renderTable(data) {
  const table = document.getElementById("tableBody");
  table.innerHTML = "";

  data.forEach(coin => {
    const row = `
      <tr>
        <td><img src="${coin.image}" /> ${coin.name}</td>
        <td>${coin.symbol.toUpperCase()}</td>
        <td>$${coin.current_price.toLocaleString()}</td>
        <td>${coin.total_volume.toLocaleString()}</td>
        <td>${coin.market_cap.toLocaleString()}</td>
        <td style="color:${coin.price_change_percentage_24h >= 0 ? 'lightgreen' : 'red'}">
          ${coin.price_change_percentage_24h.toFixed(2)}%
        </td>
      </tr>
    `;
    table.innerHTML += row;
  });
}


// SEARCH FUNCTION

document.getElementById("searchBtn").addEventListener("click", () => {
  const input = document.getElementById("searchInput").value.toLowerCase();
  filteredData = cryptoData.filter(coin =>
    coin.name.toLowerCase().includes(input)
  );
  renderTable(filteredData);
});


// SORT BY MARKET CAP

document.getElementById("sortMcapBtn").addEventListener("click", () => {
  filteredData.sort((a, b) => b.market_cap - a.market_cap);
  renderTable(filteredData);
});


// SORT BY % CHANGE

document.getElementById("sortChangeBtn").addEventListener("click", () => {
  filteredData.sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  );
  renderTable(filteredData);
});
