const inputEle = document.querySelector(".form-control");
const btnEle = document.querySelector(".btn-primary");
const resultSec = document.querySelector(".result-section");
const btnRight = document.querySelector(".arrow-right");
const btnLeft = document.querySelector(".arrow-left");
const cocktailItems = document.querySelectorAll(".cocktail-item");
let cocktails = [];
let stringIng = "strIngredient";
let itemIndex = 0;

btnRight.addEventListener("click", function () {
  if (cocktails.length - 1 > itemIndex) {
    itemIndex++;
    document
      .querySelectorAll(".cocktail-item")
      .forEach((item) => item.classList.add("d-none"));
    document
      .getElementById(cocktails[itemIndex]["idDrink"])
      .classList.remove("d-none");
  }
  checkBtnState();
});

btnLeft.addEventListener("click", function () {
  if (itemIndex !== 0) {
    itemIndex--;
    document
      .querySelectorAll(".cocktail-item")
      .forEach((item) => item.classList.add("d-none"));
    document
      .getElementById(cocktails[itemIndex]["idDrink"])
      .classList.remove("d-none");
  }
  checkBtnState(true, false, false);
});

const updateResult = () => {
  if (cocktails.length === 0) {
    resultSec.innerHTML = `<h5 class="text-danger lr-center"><span class="fw-bold">${inputEle.value}</span> not available</h5>`;
    return;
  }
  let cocktailHtml = "";
  cocktails?.forEach((item, index) => {
    let listHtml = "";
    let arrIngredient = [];
    for (let i = 1; i <= 15; i++) {
      let ingVal = item[`${stringIng}${i}`];
      if (ingVal !== null) {
        arrIngredient.push(ingVal);
      }
    }
    arrIngredient?.forEach((lists) => {
      listHtml += `<li>${lists}</li>`;
    });
    console.log(arrIngredient);
    cocktailHtml += `
              <div id="${item.idDrink}" class="cocktail-item ${
      index === itemIndex ? "" : "d-none"
    }">
                  <div class="img-container mb-2">
                      <img src="${
                        item.strDrinkThumb
                      }" class="img-fluid result-img"/>
                  </div>
                  <h3 class="text-center">${item.strDrink}</h3>
                  <div class="items">
                      <h5>Ingredients:</h5>
                          <ul>
                              ${listHtml}
                          </ul>
                  </div>
                  <div class="reciepe">
                      <p>${item.strInstructions}</p>
                  </div>
              </div>
          `;
  });
  resultSec.innerHTML = cocktailHtml;
};

btnEle.addEventListener("click", function (e) {
  if (inputEle.value === "") {
    alert("Please enter the inputs");
    return;
  }
  const url = `https://thecocktaildb.com/api/json/v1/1/search.php?s=${inputEle.value}`;
  resultSec.innerHTML = `<div class="d-flex justify-content-center lr-center">
  <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`;
  fetch(url)
    .then((response) => response.json())
    .then((items) => {
      items.drinks ? (cocktails = items.drinks) : (cocktails = []);
      itemIndex = 0;
      console.log(cocktails);
      updateResult();
      checkBtnState(false, false, true);
    })
    .catch((error) => {
      console.error(error);
    });
});

const checkBtnState = (state, loadState, apiState) => {
  if (state) {
    if (itemIndex === 0) {
      btnLeft.classList.add("btn-disabled");
      return;
    }
  }
  if (loadState) {
    if (itemIndex === 0) {
      btnLeft.classList.add("btn-disabled");
      btnRight.classList.add("btn-disabled");
      return;
    }
  }
  if (apiState) {
    if (itemIndex === 0 && cocktails.length > 1) {
      btnLeft.classList.add("btn-disabled");
      btnRight.classList.remove("btn-disabled");
    } else {
      btnLeft.classList.add("btn-disabled");
      btnRight.classList.add("btn-disabled");
    }
    return;
  }
  if (cocktails.length === 0) {
    btnLeft.classList.add("btn-disabled");
    btnRight.classList.add("btn-disabled");
    return;
  }
  if (cocktails.length - 1 === itemIndex) {
    btnRight.classList.add("btn-disabled");
    return;
  }
  btnRight.classList.remove("btn-disabled");
  btnLeft.classList.remove("btn-disabled");
};
checkBtnState(false, true, false);
