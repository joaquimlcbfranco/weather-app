import fetchData from "./fetch.js";

const dom = (() => {
  const form = document.querySelector("form");
  const input = document.querySelector("form input");
  const dayTitle = document.querySelector(".location");
  const dayDescription = document.querySelector(".description");
  const dayImage = document.querySelector(".middle-data img");
  const dayTemp = document.querySelector(".middle-data .temp");
  const dayRain = document.querySelector(".bottom-data .precip");
  const dayWind = document.querySelector(".bottom-data .wind");
  const tempCheckbox = document.querySelector("label.checkbox input");
  const weekCards = document.querySelectorAll(".card");
  const cardsList = [...weekCards];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (input.value === "a") {
      return console.log("Please provide a value");
    }

    let data;
    fetchData
      .getData(input.value)
      .then((result) => {
        data = result;
      })
      .then(() => {
        displayStats(data);
        displayWeek(data);
      })
      .catch((error) => {
        console.log(error);
      });

    input.value = "";
  });

  const displayStats = (data) => {
    data = fetchData.processDay(data);
    const parsedLocation = data.location.split(",");
    console.log(data);
    console.log(data.temp);
    dayTitle.textContent = parsedLocation[0];

    dayDescription.textContent = data.description;
    console.log(checkTempUnit());
    if (checkTempUnit() === "farenheit") {
      dayTemp.textContent = `${data.temp}º F`;
    } else {
      const tempInCelsius = Math.floor((data.temp - 32) / 1.8);
      dayTemp.textContent = `${tempInCelsius}º C`;
    }

    dayRain.textContent = `Rain: ${data.precip}%`;
    dayWind.textContent = `Wind: ${data.windspeed}km/h`;
    const loadImage = require.context("./icons", false, /\.svg$/);
    const iconPath = loadImage(`./${data.icon}.svg`);
    dayImage.src = iconPath;
  };

  const displayWeek = (data) => {
    data = fetchData.processWeek(data);
    for (let i = 0; i < cardsList.length; i++) {
      console.log(cardsList[i]);
      const date = cardsList[i].querySelector("p:first-child");
      const img = cardsList[i].querySelector("img");
      const temp = cardsList[i].querySelector(".temp");
      date.textContent = data[i].date;
      if (checkTempUnit() === "farenheit") {
        temp.textContent = `${data[i].temp}º F`;
      } else {
        const tempInCelsius = Math.floor((data[i].temp - 32) / 1.8);
        temp.textContent = `${tempInCelsius}º C`;
      }
      const loadImage = require.context("./icons", false, /\.svg$/);
      const iconPath = loadImage(`./${data[i].icon}.svg`);
      img.src = iconPath;
    }
  };

  const checkTempUnit = () => {
    if (tempCheckbox.checked) {
      return "farenheit";
    } else {
      return "celsius";
    }
  };

  tempCheckbox.addEventListener("click", () => {
    if (checkTempUnit() === "farenheit") {
      const currTemp = +dayTemp.textContent.split("º")[0];
      dayTemp.textContent = `${Math.floor(currTemp * 1.8 + 32)}º F`;
      for (let i = 0; i < cardsList.length; i++) {
        const temp = cardsList[i].querySelector(".temp");
        const currTemp = +temp.textContent.split("º")[0];
      temp.textContent = `${Math.floor(currTemp * 1.8 + 32)}º F`;
      }
    } else {
      const currTemp = +dayTemp.textContent.split("º")[0];
      dayTemp.textContent = `${Math.floor((currTemp - 32) / 1.8)}º C`;
      for (let i = 0; i < cardsList.length; i++) {
        const temp = cardsList[i].querySelector(".temp");
        const currTemp = +temp.textContent.split("º")[0];
        temp.textContent = `${Math.floor((currTemp - 32) / 1.8)}º C`;
      }
    }
  });

  return {
    displayStats,
    displayWeek,
    checkTempUnit,
  };
})();

export default dom;
