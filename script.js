const API_KEY = "api_key=476726ebc31a6401a6bfd974c076910c";
const BASE_URL = "https://api.themoviedb.org/3";
const FIRST_PAGE_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500/"
const GET_URL = BASE_URL + "/movie/";
const FIND_URL = BASE_URL + "/find/";
const FULL_CAST_URL = "https://imdb-api.com/en/API/FullCast/k_wirbdr79/";
const TRAILER_URL = "https://imdb-api.com/en/API/Trailer/k_wirbdr79/";

const MAIN = document.getElementById("main");
const loading_spiner = document.getElementById("loading-spiner");
const pop_up_window =document.getElementById('pop-up-window');


FristPageMoevies(FIRST_PAGE_URL);

async function FristPageMoevies(firstPageUrl) {
    
    const response = await fetch(firstPageUrl);
    const movieData = await response.json();

    chek_response(movieData, response.status);

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
    const response_full_cast = await  fetch(FULL_CAST_URL + movieData_moviedb.imdb_id );
    const fullCast = await response_full_cast.json();
    const response_trailer = await fetch(TRAILER_URL+ movieData_moviedb.imdb_id)
    const Trailer =await response_trailer.json() ;
    buttonClicked(movieData_moviedb, fullCast,Trailer);

} 



function popupMoreInfo (movieDetail, fullCast, trailer )  {
    const { original_title, poster_path, overview, vote_average, genres, production_companies, spoken_languages, release_date} = movieDetail;
    const {actors, directors, writers} = fullCast;
    const{linkEmbed} = trailer

    const writers_name =writers.items.map(writers =>{return writers.name});
    const directors_name =directors.items.map(directors =>{return directors.name})
    const actors_name =actors.map(actors =>{return actors.name});
    const genres_name = genres.map(genres => {return genres.name});
    const croduction_companies_name = production_companies.map(name => {return name.name});
    const spoken_languages_name =spoken_languages.map(name => {return name.english_name});

    pop_up_window.classList.add("popup");
    pop_up_window.innerHTML = `
        <div class="popup-title"><h3>${original_title}</h3></div>
        <div class="popup-content">
            <div class="popup-overwiew"> <p>Overwiew:</p>${overview}</div>
            <div class="cast">
                <p><strong>CAST</strong></p>
                <p>Director/Directors:</p>${directors_name}
                <p>Writers:</p>${writers_name}
                <p>Actors:</p>${actors_name}
            </div>
            <div class="popup-genres__companies">
                <p><strong>Other informations</strong></p>
                <p>Genres:</p>${genres_name}
                <p>release date:</p>${release_date}
                <p>production companies:</p>${croduction_companies_name}
                <p>spoken languages:</p>${spoken_languages_name}
            </div>  
            <div class="img_span">   
                <img src="${IMAGE_URL + poster_path}" alt="${original_title}">
                <span class="${voteColor(vote_average)}"><p>Rating</p>${vote_average}</span>            
            </div>
            <iframe 
                width="620" 
                height="280" 
                src="${linkEmbed}" 
                referrerpolicy="no-referrer" 
                allowfullscreen="true" 
                frameborder="0" 
                >
            </iframe>
            
            
                

        </div>

    `
}


function buttonHandler(id) {
    pop_up_window.style.display = "block";
    getMovieDetails(id);
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
        default:
            loading(true);
            break;
    }

}
function buttonClicked(movieDetails,fullCast,trailer) {
if (pop_up_window.style.display == "block") {

    popupMoreInfo(movieDetails, fullCast, trailer);
    
}    
}

function loading(show) {
    loading_spiner.style.display = show ? "block" : "none";
}






