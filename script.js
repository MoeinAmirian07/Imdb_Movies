const API_KEY = "api_key=476726ebc31a6401a6bfd974c076910c";
const BASE_URL = "https://api.themoviedb.org/3";
const FIRST_PAGE_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500/"
const GET_URL = BASE_URL + "/movie/";
const FIND_URL = BASE_URL + "/find/";

const MAIN = document.getElementById("main");
const loading_spiner = document.getElementById("loading-spiner");
const pop_up_window =document.getElementById('pop-up-window');
var span = document.getElementsByClassName("close")[0];


FristPageMoevies(FIRST_PAGE_URL);

async function FristPageMoevies(firstPageUrl) {
    const response = await fetch(firstPageUrl);
    const movieData = await response.json();
    chek_response(movieData, response.status);
    // console.log(movieData.results);

}

function showMovies(moviesData) {
    moviesData.forEach(movie => {
        const { original_title, poster_path, overview, vote_average , id} = movie;

        const moviePart = document.createElement('div');

        moviePart.classList.add("movie");

        moviePart.innerHTML = `
        <img src="${IMAGE_URL + poster_path}" alt="${original_title}">
            <div class="movie-info">
                <h3>${original_title}</h3>
                <span class="${voteColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overwiew">${overview}
            <button id="moreInfoButton" onclick="buttonHandler(${id})">More info</button>
            </div>
            `
        MAIN.appendChild(moviePart);
    })

}

async function getMovieDetails(id){
    const response = await fetch(GET_URL + id + '?'+ API_KEY);//getting movies details from moviedb database
    const movieData_moviedb = await response.json();
    const response_imdb = await fetch(FIND_URL + movieData_moviedb.imdb_id+'?'+API_KEY + '&external_source=imdb_id');//getting movies details from imdb database 
    const movieDetail_imdb=await response_imdb.json();
    
    console.log(movieData_moviedb);
    console.log(movieDetail_imdb);
} 



function popupMoreInfo (){




}



function buttonHandler(id) {
    pop_up_window.style.display = "block";
    getMovieDetails(id);
}

span.onclick = function() {
    pop_up_window.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == pop_up_window) {
    pop_up_window.style.display = "none";
    }
}

function voteColor(vote) {
    if (vote > 7) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}


function changeMenuIcon(x) {
    x.classList.toggle("change");
}


function chek_response(movieData, response) {
    switch (response) {
        case 200:
            loading(false);
            showMovies(movieData.results);
            break;
        // case 500:
        //     break;    
        default:
            loading(true);
            break;
    }

}

function loading(show) {
    loading_spiner.style.display = show ? "block" : "none";
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




