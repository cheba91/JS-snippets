async function fetchCountries() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    const sortedCountries = countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    addCountriesToSelects(sortedCountries);
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
}

function addCountriesToSelects(countries) {
  const selects = document.querySelectorAll('[data-countries-all]');
  selects.forEach((select) => {
    countries.forEach((country) => {
      const option = document.createElement('option');
      option.textContent = country.name.common;
      option.value = country.cca2;
      select.appendChild(option);
    });
  });
}

document.addEventListener('DOMContentLoaded', fetchCountries);

async function fetchLanguages() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    const languages = extractAndSortLanguages(countries);
    addLanguagesToSelects(languages);
  } catch (error) {
    console.error('Error fetching countries for languages:', error);
  }
}

function extractAndSortLanguages(countries) {
  const languageSet = new Set();
  countries.forEach((country) => {
    if (country.languages) {
      Object.values(country.languages).forEach((language) => {
        languageSet.add(language);
      });
    }
  });
  return Array.from(languageSet).sort((a, b) => a.localeCompare(b));
}

function addLanguagesToSelects(languages) {
  const selects = document.querySelectorAll('[data-languages-all]');
  selects.forEach((select) => {
    languages.forEach((language) => {
      const option = document.createElement('option');
      option.textContent = language;
      option.value = language;
      select.appendChild(option);
    });
  });
}

document.addEventListener('DOMContentLoaded', fetchLanguages);
