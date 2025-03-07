const fetchData = (() => {
  async function getData(location) {
    try {
      const data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?key=UQEYSE2MNGKTQ34PRDEX24VUD`);
      if (!data.ok) {
        throw new Error('Error obtaining data');
      }
      else {
        const results = await data.json();
        console.log(results)
        return results
      }
    }
    catch (error) {
      console.log(error)
    }
  }
    
  function processDay(data) {
    const location = data.resolvedAddress
    const description = data.currentConditions.conditions
    const temp = data.currentConditions.temp
    const precip= data.currentConditions.precipprob
    const windspeed = data.currentConditions.windspeed
    
    return {
      location,
      description,
      temp,
      precip,
      windspeed,
    }
  }

  function processWeek(data) {
    console.log(data.days);
  }

  return {
    getData,
    processDay,
    processWeek,
  }
})();

export default fetchData