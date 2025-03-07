async function getData(location) {
  const data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=UQEYSE2MNGKTQ34PRDEX24VUD`);
  const results = await data.json();
  return results
}
  
function processDay(data) {
  const location = data.resolvedAddress
  const description = data.currentConditions.conditions
  const temp = data.currentConditions.temp
  const prep = data.currentConditions.precipprob
  const humidity = data.currentConditions.humidity
  
  return {
    location,
    description,
    temp,
    prep,
    humidity,
  }
}

export { getData, processDay }