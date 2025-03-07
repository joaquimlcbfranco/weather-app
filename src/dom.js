import fetchData from "./fetch.js"

const dom = (() => {
  const form = document.querySelector('form');
  const input = document.querySelector('form input');
  const formButton = document.querySelector('form button');
  const dayTitle = document.querySelector('.location');
  const dayDescription = document.querySelector('.description');
  const dayImage = document.querySelector('.middle-data img');
  const dayTemp = document.querySelector('.middle-data .temp');
  const dayRain = document.querySelector('.bottom-data .precip');
  const dayWind = document.querySelector('.bottom-data .wind');
  const tempSelector = document.querySelector('label.checkbox .indicator');
  const tempCheckbox = document.querySelector('label.checkbox input');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value === 'a') {
      return console.log('Please provide a value');
    }

    let data;
    fetchData.getData(input.value)
    .then((result) => { 
      data = result
    })
    .then(() => {
      data = fetchData.processDay(data)
    })
    .then(() => {
      displayStats(data)
    })
    .catch((error) => { 
      console.log(error) 
    })

    input.value = '';
  })

  const displayStats = (data) => {
    const parsedLocation = data.location.split(',');
    console.log(data);
    console.log(data.temp)
    dayTitle.textContent = parsedLocation[0];
    

    dayDescription.textContent = data.description;
    console.log(checkTempUnit());
    if (checkTempUnit() === 'farenheit') {
      dayTemp.textContent = `${data.temp}º F`;
    }
    else {
      const tempInCelsius = Math.floor((data.temp - 32) / 1.8);
      dayTemp.textContent = `${tempInCelsius}º C`;
    }
    
    dayRain.textContent = `Rain: ${data.precip}%`;
    dayWind.textContent = `Wind: ${data.windspeed}km/h`;
  }

  const checkTempUnit = () => {
    if (tempCheckbox.checked) {
      return 'farenheit';
    }
    else {
      return 'celsius';
    }
  }

  tempCheckbox.addEventListener('click', () => {
    if (checkTempUnit() === 'farenheit') {
      const currTemp = +dayTemp.textContent.split('º')[0];
      dayTemp.textContent = `${Math.floor((currTemp * 1.8) + 32)}º F`;
    }
    else {
      const currTemp = +dayTemp.textContent.split('º')[0];
      dayTemp.textContent = `${Math.floor((currTemp - 32) / 1.8)}º C`;
    }
  }); 

  return {
    displayStats,
    checkTempUnit,
  }
})();

export default dom