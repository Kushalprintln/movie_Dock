// SELECTING ALL ELEMENTS
const input = document.querySelector('#input');
const searchBtn = document.querySelector('#search-btn');
const SBD = document.querySelector('#sbd');
const SBR = document.querySelector('#sbr');
const all = document.querySelector('#all');
const favorite = document.querySelector('#favorites');
const prev = document.querySelector('#prev');
const curr = document.querySelector('#curr');
const next = document.querySelector('#next');
const movieList = document.querySelector('.movie-list');

let onPage = 1;
const posterPath = 'https://image.tmdb.org/t/p/original/';

function Firstpage() {
    let movieapi = fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=1');
    movieapi.then((data) => {
        return data.json();
    }).then((data) => {
        console.log(data);
        let movieArray = data.results;
        console.log(movieArray);
        displayMovie(movieArray);
        SBR.addEventListener('click', () => {
            console.log("as per rating");
            sortingOnRating(movieArray);
        })
        SBD.addEventListener('click', () => {
            console.log("as per date");
            sortingOnDate(movieArray);
        })
    })
}
Firstpage();

// FETCHING DATA FOR NEXT AND PRE PAGE;
function Nextpage(pagenum) {
    let movieapi = fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${pagenum}`);
    movieapi.then((data) => {
        return data.json();
    }).then((data) => {
        console.log(data);
        let movieArray = data.results;
        console.log(movieArray);
        displayMovie(movieArray);
        SBR.addEventListener('click', () => {
            console.log("as per rating");
            sortingOnRating(movieArray);
        })
        SBD.addEventListener('click', () => {
            console.log("as per date");
            sortingOnDate(movieArray);
        })
    })
}

// DISPLAY MOVIE FUNCTION
function displayMovie(movieArray) {
    movieList.innerHTML = "";
    for (let movie of movieArray) {
        // creating card of each movie
        movieList.innerHTML += `<div class="movie-card">
                <img src="${posterPath}${movie.poster_path}" alt="">
                <div class="movie-details">
                    <div class="title">${movie.title}</div>
                    <div class="votecount">${movie.vote_count}</div>
                    <div class="votavg">${movie.vote_average}</div>
                    <div class="favrateico"><i class="fa-regular fa-star"></i></div>
                    <div>${movie.release_date}</div>
                    <div>${movie.popularity}</div>
                </div>
            </div>`;
    }
}

// SORTING AS PER RATING
function sortingOnRating(movieArray) {
    const sortedarray = movieArray.sort((a, b) => {
        return a.popularity - b.popularity;
    })
    console.log(sortedarray);
    displayMovie(movieArray);
}

// SORTING AS PER DATES
function sortingOnDate(movieArray) {
    const sortedarray = movieArray.sort((a, b) => {
        let aDate = new Date(a.release_date);
        let bDate = new Date(b.release_date);
        return aDate - bDate;
    })
    console.log(sortedarray);
    displayMovie(movieArray);
}

// ADDING EVEN LISTENER ON NEXT
next.addEventListener('click',()=>{
    onPage++;
    Nextpage(onPage);
    curr.innerHTML = `Current Page: ${onPage}`;
    lastpages();
})
// ADDING EVEN LISTENER ON PREV
prev.addEventListener('click',()=>{
    onPage--;
    Nextpage(onPage);
    curr.innerHTML = `Current Page: ${onPage}`;
    lastpages();
})
function lastpages(){
    if(onPage === 1){
        prev.setAttribute('disabled',true);
    }
    if(onPage > 1){
        prev.removeAttribute('disabled');
    }
    if(onPage === 500){
        next.setAttribute('disabled',true);
    }
    if(onPage < 500){
        next.removeAttribute('disabled');
    }
}