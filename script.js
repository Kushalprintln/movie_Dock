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

const favMovies = [];
console.log(favMovies);

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
        let moviecard = document.createElement('div');
        moviecard.setAttribute('class','movie-card');
        let poster = document.createElement('img');
        poster.setAttribute('src',`${posterPath}${movie.poster_path}`);
        let moviedetails = document.createElement('div');
        moviedetails.className = 'movie-details';
        let title = document.createElement('div');
        title.className = 'title';
        title.innerText = `${movie.title}`;
        let votecount = document.createElement('div');
        votecount.className = 'votecount';
        votecount.innerText = `${movie.vote_count}`;
        let votavg = document.createElement('div');
        votavg.className = 'votavg';
        votavg.innerText = `${movie.vote_average}`;
        let release = document.createElement('div');
        release.className = 'release';
        release.innerText = `${movie.release_date}`;
        let populrty = document.createElement('div');
        populrty.className = 'populrity';
        populrty.innerText = `${movie.popularity}`;
        let favico = document.createElement('div');
        favico.className = 'favrateico';
        let star = document.createElement('i');

        star.classList.add('fa-regular','fa-star');
        favico.appendChild(star);

        favico.addEventListener('click',()=>{
            console.log(movie.title);
            console.log(movie.id);
            console.log(checkfav(movie.id));
            favoriteAdding(star,movie.id);
        })

        moviedetails.appendChild(title);
        moviedetails.appendChild(votecount);
        moviedetails.appendChild(votavg);
        moviedetails.appendChild(release);
        moviedetails.appendChild(populrty);
        moviedetails.appendChild(favico);
        moviecard.appendChild(poster);
        moviecard.appendChild(moviedetails);
        movieList.appendChild(moviecard);
   
    }
}

//ADDING AND REMOVING FROM FAVORITTE
 function favoriteAdding(star,movieid){
    if(star.classList.contains("fa-regular")){
        star.classList.replace('fa-regular','fa-solid');
    }else{
        star.classList.replace('fa-solid','fa-regular');
    }
    if(favMovies.includes(movieid)){
        let index = favMovies.indexOf(movieid);
        favMovies.splice(index,1);
        console.log('removing from fav');
    }else{
        console.log("added to fav");
        favMovies.push(movieid);
    }
    console.log(favMovies);
 }
 // CHECKING WHTHER IT IS AVAILABLE IN FAVLIST
 function checkfav(movieid){
    return favMovies.includes(movieid);
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
