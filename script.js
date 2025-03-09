// This is the API of ODMb:
const api = "http://www.omdbapi.com/?apikey=fa2eb633";


//DOM elements:
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResult = document.getElementById("search-result");

//Event Listner:
searchButton.addEventListener("click", function () {
    //This thing will get the input value by removing the whitespaces around them.
    const query = searchInput.value.trim();
    if (query !== "") { //If query is not empty:
        searchMovie(query);
    }
    else {
        alert("Please enter a valid movie name");
    }
})

async function searchMovie(query) {
    try {
        //This made API request:
        const response = await fetch(`${api}&s=${query}`);
        //This json made response data into usable formmat.
        const data = await response.json();

        if (data.Response === "True") {
            displayMovie(data.Search);
        }
        else {
            searchResult.innerHTML = "<p>No such movie is found. Please try again</p>"
        }
    }
    catch (error) {
        console.log("Error fetching data:", error);
        searchResult.innerHTML = "<p>Something went wrong. Please try again</p>";
    }
}


function displayMovie(movies) {
    searchResult.innerHTML = "";
    movies.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");

        //Movie Info:
        movieElement.innerHTML = ` <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;

        //Now append the div to Parent.
        searchResult.append(movieElement);

    });
}


