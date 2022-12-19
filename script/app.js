// ************* var **************

let filter = 1;


// ************* extra methods **************

const getCardHtml = function(jsonObject){
    let html = '';
    jsonObject.forEach(element => { 
        let listIngredient = getIngredients(element);
        html += `<div class="c-cocktail__item" tabindex="0">
        <div class="cocktail__item-inner">
            <div class="c-cocktail__item-front">
                <div>
                    <img class="c-cocktail__image" src="${element.strDrinkThumb}" alt="" height="100%">
                </div>
                <div class="c-cocktail__name">
                    ${element.strDrink}
                </div>
                <div class="c-chart" style="--percentage: ${listIngredient[1]*10}">${listIngredient[1]} <br> Ingredients</div>
                <div class="c-chart__label">
                    <div>Easy</div>
                    <div>Hard</div>
                </div>
            </div>
            <div class="c-cocktail__item-back">
                <h5>Cocktail Glass</h5>
                ${element.strGlass}
                <h5>Ingrendient</h5>
                ${listIngredient[0]}
                <h5>Instructions</h5>
                ${element.strInstructions}
            </div>
        </div>
    </div>`;
    });
    return html;
    //document.querySelector('.js-cocktailList').innerHTML = html;
};

const getIngredients = function (element){
    var listIngredient = '';
    var listLength = 0;
    if(element.strIngredient1 != null){
        listLength = 1;
        if(element.strMeasure1 != null){
            listIngredient += `${element.strMeasure1} ${element.strIngredient1}<br>`;
        }else{
            listIngredient += `${element.strIngredient1}<br>`;
        }
    }
    if(element.strIngredient2 != null){
        listLength = 2;
        if(element.strMeasure2 != null){
            listIngredient += `${element.strMeasure2} ${element.strIngredient2}<br>`;
        }else{
            listIngredient += `${element.strIngredient2}<br>`;
        }
    }
    if(element.strIngredient3 != null){
        listLength = 3;
        if(element.strMeasure3 != null){
            listIngredient += `${element.strMeasure3} ${element.strIngredient3}<br>`;
        }else{
            listIngredient += `${element.strIngredient3}<br>`;
        }
    }
    if(element.strIngredient4 != null){
        listLength = 4;
        if(element.strMeasure4 != null){
            listIngredient += `${element.strMeasure4} ${element.strIngredient4}<br>`;
        }else{
            listIngredient += `${element.strIngredient4}<br>`;
        }
    }
    if(element.strIngredient5 != null){
        listLength = 5;
        if(element.strMeasure5 != null){
            listIngredient += `${element.strMeasure5} ${element.strIngredient5}<br>`;
        }else{
            listIngredient += `${element.strIngredient5}<br>`;
        }
    }
    if(element.strIngredient6 != null){
        listLength = 6;
        if(element.strMeasure6 != null){
            listIngredient += `${element.strMeasure6} ${element.strIngredient6}<br>`;
        }else{
            listIngredient += `${element.strIngredient6}<br>`;
        }
    }
    if(element.strIngredient7 != null){
        listLength = 7;
        if(element.strMeasure7 != null){
            listIngredient += `${element.strMeasure7} ${element.strIngredient7}<br>`;
        }else{
            listIngredient += `${element.strIngredient7}<br>`;
        }
    }
    if(element.strIngredient8 != null){
        listLength = 8;
        if(element.strMeasure8 != null){
            listIngredient += `${element.strMeasure8} ${element.strIngredient8}<br>`;
        }else{
            listIngredient += `${element.strIngredient8}<br>`;
        }
    }
    if(element.strIngredient9 != null){
        listLength = 9;
        if(element.strMeasure9 != null){
            listIngredient += `${element.strMeasure9} ${element.strIngredient9}<br>`;
        }else{
            listIngredient += `${element.strIngredient9}<br>`;
        }
    }
    return [listIngredient, listLength];
};



// ************* callback show methods **************
const showCocktailsByName = function(jsonObject){
    console.log(jsonObject.drinks);
    html = getCardHtml(jsonObject.drinks);
    document.querySelector('.js-cocktailList').innerHTML = html;
};

const showCocktailsByIngridient = function(jsonObject){
    console.log(jsonObject);
    let html = '';
    jsonObject.drinks.forEach(element => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${element.idDrink}`, {
            method: 'GET'
        }).then(function(response){
            return response.json();
        }).then(function (jsonObject) {
            html += getCardHtml([jsonObject.drinks[0]]);
            document.querySelector('.js-cocktailList').innerHTML = html;
        });
    });
};

// ************* callback No show methods **************

const callBackNothingFound = function(){
    var htmlError = document.querySelector('.js-cocktailList');
    var value = document.querySelector(".js-search").value;
    if(filter == 1){
        htmlError.innerHTML = `<div class="c-noName">
        <img class="c-noName__img" src="./img/searchCocktailByName.png" />
        <p>Sorry we couldn't find a cocktail that matches the name: <b>${value}</b></p>
        <p class="c-noName__text">Please try searching with another term.</p>
    </div>`;
    }
    else if(filter == 2){
        htmlError.innerHTML = `<div class="c-noName">
        <img class="c-noName__img" src="./img/searchCocktailByIngredient.png" />
        <p>Sorry we couldn't find a cocktail with an ingredient that matches: <b>${value}</b></p>
        <p class="c-noName__text">Please try searching with another term.</p>
    </div>`;
    }
    else{
        htmlError.innerHTML = `Geen cocktail gevonden`;
    }
};




// ************* get methods **************
const getCocktailsByName = function(cName){
    console.log(cName);
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cName}`;
    handleData(url, showCocktailsByName, callBackNothingFound);
};

const getCocktailsByIngridient = function(iName){
    console.log(iName);
    url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${iName}`;
    handleData(url, showCocktailsByIngridient, callBackNothingFound);
};

const getRandomCocktail = function(){
    url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
    handleData(url, showCocktailsByName, callBackNothingFound);
};



// ************* event listeners **************
const listenToSearchBar = function(){
    let searchBar = document.querySelector(".js-search");
    searchBar.addEventListener('keypress', function () {
        if(event.key === "Enter"){
            if(filter == 1){
                getCocktailsByName(searchBar.value);
            }
            else if(filter == 2){
                getCocktailsByIngridient(searchBar.value);
            }
        }
    });
};

const listenToFilter = function(){
    let filters = document.querySelectorAll('.js-nav__item');
    let filterRandom = document.querySelector(".js-nav__random");
    let input = document.querySelector('.js-search');
    let content = document.querySelector(".js-cocktailList");

    for(let filt of filters){
        filt.addEventListener('click', function(){
            console.log(filt.getAttribute('data-filterG'));
            
            for(let filtStyle of filters){
                if(filtStyle.classList.contains("c-nav__list-item--active")){
                    filtStyle.classList.remove("c-nav__list-item--active");
                }
            }
            if(filterRandom.classList.contains("c-nav__list-item--active")){
                filterRandom.classList.remove("c-nav__list-item--active");
            }

            filter = filt.getAttribute('data-filterG');

            //change placeholder
            if(filter == 1){
                input.placeholder='Search by cocktail name';
                content.innerHTML = `<div class="c-noName">
                    <img class="c-noName__img" src="./img/searchCocktailByName.png" />
                    <h3>What are you searching for?</h3>
                    <p class="c-noName__text">Search your favorite coktail by name.</p>
                </div>`;
            }
            else if(filter == 2){
                input.placeholder='Search by ingredient name';
                content.innerHTML = `<div class="c-noName">
                    <img class="c-noName__img" src="./img/searchCocktailByIngredient.png" />
                    <h3>What are you searching for?</h3>
                    <p class="c-noName__text">Search your favorite coktail by ingredient name.</p>
                </div>`;
            }

            
            filt.classList.add("c-nav__list-item--active");
        });
    }
    
    filterRandom.addEventListener('click', function(){
        console.log(filterRandom.getAttribute('data-filterG'));
            
        for(let filtStyle of filters){
            if(filtStyle.classList.contains("c-nav__list-item--active")){
                filtStyle.classList.remove("c-nav__list-item--active");
            }
        }

        filter = filterRandom.getAttribute('data-filterG');

        //change placeholder
        if(filter == 3){
            input.placeholder='Search Random Cocktail';
        }

        filterRandom.classList.add("c-nav__list-item--active");

        getRandomCocktail();
    });
};




// ************* DOM innit **************

const init = function(){
    listenToSearchBar();
    listenToFilter();
};

document.addEventListener('DOMContentLoaded', init);

