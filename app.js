const div = document.getElementById("parent");
const flag = document.getElementById("flag");
const selectBox = document.getElementById("countries");
const countryTitle = document.querySelector(".countryTitle");
const capital = document.querySelector(".capital");
const currencies = document.querySelector(".currencies");

async function getData() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();
  getListOfCountryName(data);

  // Print The Infos And The Flag Of Selected Country In The Document
  selectBox.addEventListener("change", () => {
    const countrySelected = selectBox.value;
    const countryIndex = data.indexOf(
      data.find((country) => country.name.common === countrySelected)
    );
    const countryCurrency = Object.keys(data[countryIndex].currencies);

    countryTitle.innerHTML = countrySelected;
    flag.src = data[countryIndex].flags.svg;
    capital.innerHTML = `The Country Capital Is : ${data[countryIndex].capital}`;
    currencies.innerHTML = `The Country Currency Is : ${countryCurrency[0]}`;
  });
}
getData();

// Get The List Names Of Countries
function getListOfCountryName(data) {
  const countryList = [];
  for (let i = 0; i < data.length; i++) {
    countryList.push(data[i].name.common);
    countryList.sort();
  }
  addCountriesToSelectBox(countryList);
}
// Add Countries To The select Box
function addCountriesToSelectBox(countries) {
  for (let i = 0; i < countries.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = countries[i];
    selectBox.appendChild(option);
  }
}
