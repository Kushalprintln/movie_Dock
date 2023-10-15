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

// CREATING 2 ARRAYS FOR THE FAVOURITE;
var favMovies = [];
var favMovieDetails = [];

// CHECKING IF PREVIOUS STORAGE IS AVAILABE IF AVAILABLE THEN UPDATING
// THIS IS IIFE;
(function updatePreviousStorage(){
    // console.log("Checking Previous Update");
    if(localStorage.getItem('Mov-ids')){
        favMovies = JSON.parse(localStorage.getItem('Mov-ids'));
        favMovieDetails = JSON.parse(localStorage.getItem('Mov-details'));

        // printing
        // console.log(favMovies);
        // console.log(favMovieDetails);
    }
})();

// PAGE NO. AND POSTER PATH
let onPage = 1;
const posterPath = 'https://image.tmdb.org/t/p/original/';

// UPDATING FIRST PAGE

function pageUpdate(pagenum) {
    let movieapi = fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${pagenum}`);
    movieapi.then((data) => {
        return data.json();
    }).then((data) => {
        let movieArray = data.results; // EXTRACTING MOVIE ARRAY AND STOREING IT IN VARIBALE;

        // printing
        // console.log(data);
        // console.log(movieArray);

        displayMovie(movieArray); // CALLING THIS FOR DISPLAYING MOVIES;

        // ADDING EVENT LISTNERS ON SORTING BUTTONS;
        SBR.addEventListener('click', () => {
            // console.log("Sorting As Per Rating");
            sortingOnRating(movieArray);
        })
        SBD.addEventListener('click', () => {
            // console.log("Sorting As Per Date");
            sortingOnDate(movieArray);
        })
    })
}

pageUpdate();

// DISPLAY MOVIE FUNCTION
function displayMovie(movieArray) {
    movieList.innerHTML = "";             // FIRST OF ALL CLEARING PREVIOUS LOADED IMAGES;
    for (let movie of movieArray) {
        // CREATING CARD OF EACH MOVIE

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
        star.classList.add('fa-star');

        // CHECKING IF MOVIE IS PREVIOUSLY ABALIABE IN FAVOURITE
        if(checkfav(movie.id)){ 
            star.classList.add('fa-solid','fav'); // IF AVAILABE THEN SOLID STAR
        }else{
            star.classList.add('fa-regular'); // IF NOT THEN HOLLOW STAR
        }

        favico.appendChild(star); //APPENDING STAR IN FAVICO ELEMENT

        // ADDING EVENTLISTNER FOR ADDING AND REMOVING FAV
        favico.addEventListener('click',()=>{
            favoriteAdding(star,movie.id,movie.title,movie.vote_count,movie.vote_average,movie.release_date,movie.popularity,movie.poster_path);
        })
        // APPEDNING ALL THE ELEMENTS
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
 function favoriteAdding(star,movieid,moviename,vote,voteavg,reldate,popul,posterpath){
    star.classList.toggle('fav');
    if(checkfav(movieid)){
        let index = favMovies.indexOf(movieid);
        favMovies.splice(index,1);
        favMovieDetails.splice(index,1);
        star.classList.replace('fa-solid','fa-regular');
        // console.log(`${moviename} ${movieid} Already There In Fav`);
        // console.log(`Removing ${moviename} From Fav`);
        // only have ot do it when we are on the favsection;
        // displayMovie(favMovieDetails);
        //REMOVING IT FROM LOCALSTORAGE
        storageUpdate();
    }else{
        // console.log(`${moviename} ${movieid} Was Not There In Fav`);
        // console.log(`${moviename} Now Added To Fav`);
        favMovies.push(movieid);
        favMovieDetails.push({title:moviename,vote_count:vote,vote_average:voteavg,release_date:reldate,popularity:popul,poster_path:posterpath,id:movieid})
        star.classList.replace('fa-regular','fa-solid');
        //ADDING IT IN THE LOCALSTORAGE
        storageUpdate();

    }
    // printing array and checking
    // console.log(favMovies);
    // console.log(favMovieDetails);
 }

// THIS FUNCTION WILL UPDATE LOCALSTORAGE ADDING AND REMOVING DONE IN THIS FUNCTION
 function storageUpdate(){
    console.log('Updating Local Storage');
    localStorage.setItem('Mov-ids', JSON.stringify(favMovies));
    localStorage.setItem('Mov-details',JSON.stringify(favMovieDetails));
    //PRINT CHECK
    console.log(localStorage.getItem('Mov-ids'));
    console.log(localStorage.getItem('Mov-details'));
 }

 // CHECKING WHTHER IT IS AVAILABLE IN FAVLIST
 function checkfav(movieid){
    return favMovies.includes(movieid);
 }

// SORTING AS PER RATING
function sortingOnRating(movieArray) {
    movieArray.sort((a, b) => {
        return a.popularity - b.popularity;
    })
    displayMovie(movieArray);
}

// SORTING AS PER DATES
function sortingOnDate(movieArray) {
    movieArray.sort((a, b) => {
        return new Date(a.release_date) - new Date(b.release_date);
    })
    displayMovie(movieArray);
}
//ADDING EVENT LISTNER ON ALL 
all.addEventListener('click',()=>{
    pageUpdate(onPage);;
    prev.style.visibility = 'visible';
    curr.style.visibility = 'visible';
    next.style.visibility = 'visible';
})
//ADDING EVENT LISTENER ON FAV
favorite.addEventListener('click',()=>{
    displayMovie(favMovieDetails);
    prev.style.visibility = "hidden";
    curr.style.visibility = "hidden";
    next.style.visibility = "hidden";
})

// ADDING EVEN LISTENER ON NEXT
next.addEventListener('click',()=>{
    onPage++;
    pageUpdate(onPage);
    curr.innerHTML = `Current Page: ${onPage}`;
    lastpages();
})

// ADDING EVEN LISTENER ON PREV
prev.addEventListener('click',()=>{
    onPage--;
    pageUpdate(onPage);
    curr.innerHTML = `Current Page: ${onPage}`;
    lastpages();
})
// CHECKING IF WEE REACH LAST PAGE
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
