const API_KEY ="api_key=476726ebc31a6401a6bfd974c076910c";
const BASE_URL ="https://api.themoviedb.org/3";
const FIRST_PAGE_URL = BASE_URL+"/discover/movie?sort_by=popularity.desc&"+API_KEY;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500/"

const MAIN = document.getElementById("main");

FristPageMoevies(FIRST_PAGE_URL);

function FristPageMoevies (firstPageUrl){

    fetch(firstPageUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        showMovies(data.results);
    })
}

function showMovies(moviesData){

    moviesData.forEach(movie => { 

        const {original_title,poster_path,overview,vote_average} = movie;

        const moviePart = document.createElement('div');
        moviePart.classList.add("movie");
        moviePart.innerHTML = `
        <img src="${IMAGE_URL+poster_path}" alt="${original_title}">
            <div class="movie-info">
                <h3>${original_title}</h3>
                <span class="${voteColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overwiew">${overview}</div>
            `
        MAIN.appendChild(moviePart);
    })

}
function voteColor(vote) {
    if(vote > 7){
        return "green";
    }else if(vote >= 5){
        return "orange";
    }else{
        return "red";
    }
}

function changeMenuIcon(x) {
    x.classList.toggle("change");
}