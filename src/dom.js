import { getData, processDay } from "./fetch.js"

const dom = (() => {
  const form = document.querySelector('form');
  const input = document.querySelector('form input');
  const formButton = document.querySelector('form button');
  const dayTitle = document.querySelector('.location');
  const dayDescription = document.querySelector('.description');
  const dayImage = document.querySelector('.middle-data img');
  const dayTemp = document.querySelector('.middle-data .temp');
  const dayRain = document.querySelector('.bottom-data .precip');
  const dayHumidity = document.querySelector('.bottom-data .hum');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value === 'a') {
      return console.log('Please provide a value');
    }

    let data;
    getData(input.value)
    .then((result) => { 
      data = result
    })
    .then(() => {
      data = processDay(data)
    })
    .then(() => {
      displayStats(data)
    })
    .catch((error) => { 
      console.log(error) 
    })
  })

  const displayStats = (data) => {
    const parsedLocation = data.location.split(',');
    console.log(data);
    console.log(data.temp)
    dayTitle.textContent = parsedLocation[0];
    

    dayDescription.textContent = data.description;
    dayTemp.textContent = `${data.temp}º C`;
    dayRain.textContent = `Rain: ${data.precip}%`;
    dayHumidity.textContent = `Wind: ${data.windspeed}km/h`; 
  }
})();

export default dom