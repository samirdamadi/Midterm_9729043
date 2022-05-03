/* 9729043 Seyed Alreza Mirdamadi */

moviesName = [];
releaseData = []; 
starships = []; 

// to show 10 Startships in 1 page only
let limit = 10; 
let lenOfStarShips; 
let currentMovie; 
let page; 

// design the page for the first time 
firstPage();

// this is the function we call at the start, used to show the Movies list; 
function firstPage() 
{
	let parent = document.getElementById("list");
	parent.innerHTML = "" ;
	let header = document.getElementById("header");
	header.innerHTML = "Movies";
	for ( i = 1 ; i < 7 ; i++) {
		let parent = document.getElementById("list");
		let newp = document.createElement("li");
		newp.id = "item" + (i);
		parent.appendChild(newp);
	}
	
	for ( i = 1 ; i < 7; i++ ){
		getMovie("https://swapi.dev/api/films/" + i); 
	}
}

// this function will be used by 'firstPage()' to fetch the JSON, show their content, and store some of the data in the JS variables + adding the Starship link to the list
function getMovie(url) {
	fetch(url)
		.then(response => response.json())
		.then( data => { 
			num = data.episode_id; 
			moviesName[num-1] = (data.title); 
			releaseData[num-1] = (data.release_date); 
			starships[num-1] = (data.starships); 
			id = "item" + num; 
			document.getElementById(id).innerHTML = (data.title + " - " + num + " - " + data.release_date); 
			let item = document.getElementById(id);
			let links = document.createElement("a");
			links.id = "link" + (num);
			links.href = "javascript: void(0)"; 
			links.onclick = showStarships; 
			links.innerHTML = "Starship";
			item.appendChild(links);
		}
		);
}

// this function will be called when user clicks on one of the 'Starship' links, 
// then adds 3 bottons, set their id, onclick handler, etc.
// and calls 'printStarships()' to print the Starship list on the screen.
function showStarships() {
	let num; 
	let header = document.getElementById("header");
	for ( i = 1; i < 7 ; i++ ) {
		if ("link" + i === this.id )
			num = i;
	}
	header.innerHTML = "Starship - " + moviesName[num-1];
	let main = document.getElementById("mainFrame");
	let next_botton = document.createElement("Button");
	next_botton.id = "next";
	next_botton.onclick = next_handler;
	next_botton.innerHTML = "next"; 
	let pre_botton = document.createElement("Button");
	pre_botton.id = "pre";
	pre_botton.onclick = pre_handler;
	pre_botton.innerHTML = "previous"; 
	let movies_botton = document.createElement("Button");
	movies_botton.id = "movie";
	movies_botton.onclick = movie_handler;
	movies_botton.innerHTML = "back to movies"; 
	main.appendChild (pre_botton); 
	main.appendChild (movies_botton); 
	main.appendChild (next_botton); 
	let len = starships[num-1].length ;
	lenOfStarShips = len;
	currentMovie = num; 
	if ( len < 10) {
		printStarships(1 ,len , num) ;
	}else {
		printStarships(1, 10 , num) ;
		page = 1; 
	}
	
}

// this is the 'next botton' handler, if number of Starships are greater than 10, goes to the next page.
function next_handler()
{
	if ( lenOfStarShips > 10 * page) {
		printStarships((page * 10)+1, (++page) * 10 , currentMovie) ;
	}
}
// this is the 'previous botton' handler, goes to the last page if pressed.
function pre_handler()
{
	if ( page > 1) {
		printStarships(((page-2) * 10)+1, (page-1) * 10 , currentMovie) ;
		page--; 
	}
}
// this is the 'Movies botton' handler, used to go back to the Movies list and remove the bottons
function movie_handler()
{
	let main = document.getElementById("mainFrame");
	main.removeChild(document.getElementById("next")); 
	main.removeChild(document.getElementById("pre")); 
	main.removeChild(document.getElementById("movie")); 
	detailsList = document.getElementById("detailsList"); 	
	detailsList.innerHTML = ""; 
	firstPage(); 
}
// this funtion is used to print at most 10 Starship of a Movie, gets the start index and length of list, and print the data on the screen 
function printStarships(start, len, num) {
	let parent = document.getElementById("list");
	parent.innerHTML = "" ;
	let min = Math.min(len, lenOfStarShips); 
	for ( i = start; i <= min ; i++ ) {
		let newp = document.createElement("li");
		newp.id = "item" + (i);
		newp.onclick = showDetails; 
		parent.appendChild(newp);
		fetch(starships[num-1][i-1])
			.then(response => response.json())
			.then( data => {
				newp.innerHTML = data.name; 
			}
		);
	}
}
// this handler function is used to show the details of a Starship if user clicks on it, 
// it will print the name, model, crew, passengers, and films related to this Starship
function showDetails(){
	let num; 
	for ( i = 1; i <= lenOfStarShips; i++ ) {
		if ("item" + i === this.id )
			num = i;
	}
	console.log(num); 
	detailsList = document.getElementById("detailsList"); 	
	detailsList.innerHTML = ""; 
	fetch(starships[currentMovie-1][num-1])
			.then(response => response.json())
			.then( data => {
				let name = document.createElement("h1");
				let model = document.createElement("li"); 
				let crew = document.createElement("li"); 
				let passengers = document.createElement("li"); 
				name.innerHTML =  data.name; 
				model.innerHTML = data.model; 
				crew.innerHTML = data.crew; 
				passengers.innerHTML = data.passengers; 
				if (data.name)
					detailsList.appendChild(name); 
				if (data.model)
					detailsList.appendChild(model); 
				if (data.crew)
					detailsList.appendChild(crew); 
				if (data.passengers)
					detailsList.appendChild(passengers); 
				let number; 
				for (i = 0 ; i < data.films.length ; i++ ) {
					for ( j = 1; j <= 6 ; j++ ){
						if (data.films[i] == ("https://swapi.dev/api/films/" + j + "/" ) )
							number = ((j + 2) % 6);   
					}
					let film = document.createElement("li"); 
					film.innerHTML = moviesName[number] ;
					detailsList.appendChild(film); 
				}
			}
		);
	
}

	