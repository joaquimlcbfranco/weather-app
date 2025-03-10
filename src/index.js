import "./styles.css";
import fetchData from "./fetch.js";
import dom from "./dom.js";

window.fetchData = fetchData;
window.dom = dom;

fetchData.getData('Europe')
.then((result) => {
  dom.displayStats(result)
  dom.displayWeek(result)
})

