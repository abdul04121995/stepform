import { render } from "./render.js";
import { logicChecker, scoreEl } from "./logic.js";

let containerEl = document.querySelector(".container");
let resetEl = document.querySelector(".reset");
const starterEl = document.querySelector(".starter");
let dataContainer;
function loader() {
  containerEl.innerHTML = "<h1>loading.....</h1>";
}
async function fetcher() {
  loader();
  await fetch("https://opentdb.com/api.php?amount=50&category=17&type=multiple")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log("boom");
      }
    })
    .then((data) => {
      dataContainer = data.results;
      // console.log(dataContainer);
      containerEl.innerHTML = render(dataContainer);
      logicChecker();
      // ObserverFunc();
    });
}
starterEl.addEventListener("click", fetcher);

resetEl.addEventListener("click", function () {
  fetcher();
  scoreEl.textContent = "0";
});

let options = {
  threshold: 0.5,
};
function ObserverFunc() {
  let holders = document.querySelectorAll(".holder");
  let io = new IntersectionObserver(checker, options);
  function checker(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // console.log(entry);
        entry.target.classList.add("red");
      } else {
        entry.target.classList.remove("red");
      }
    });
  }
  holders.forEach((holder) => {
    io.observe(holder);
  });
}
