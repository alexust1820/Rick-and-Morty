let pageNumber = 1;
let charactersCount = 20;
let arrayCount = 0;

showCards();

function showCards() {
	axios.get(`https://rickandmortyapi.com/api/character/${getSearchParams()}`).then(response =>{

		arrayCount = response.data.info.count
		arrayPages = response.data.info.pages
		allCharactersCount = response.data.results.length

		document.getElementById('js-allCharacters').innerHTML = `Всего персонажей ${response.data.info.count}`
		document.getElementById('js-more').innerHTML = `Показать еще ${charactersCount} из ${arrayCount - charactersCount}`

		console.log(charactersCount, arrayCount - charactersCount)

		response.data.results.forEach(response =>{
					document.getElementById('charactersList').innerHTML += 
					`<div class="card mb-3" style="
					max-width: 540px; 
					background-color: #2e2e2e; 
					color: white;
					margin: 0 auto;">
					  <div class="row g-0">
					    <div class="col-md-4">
					      <img style=" max-width:170px" 
					      src="${response.image}" alt="...">
					    </div>
					    <div class="col-md-8">
					      <div class="card-body">
					        <h5 class="card-title">${response.name}</h5>
					        <div class="d-flex justify-content-start align-items-center">
					        	<div id="js-status" class="life__trigger 
					        	${checkStatus(response.status)}" style="margin-right: 10px;"></div>
					        	<p class="card-text">${response.status} - ${response.gender}</p>
					        </div>
					        	<h6 class="text-secondary mb-0">Последняя локация</h6>
					        	<p class="mb-0">${showLoc(response.location)}</p>
					        <p class="card-text"><small class="text-muted"></small></p>
					      </div>
					    </div>
					  </div>
					</div>`;
			})
	})
}

function getSearchParams() {
	const searchName = document.querySelector('#searchName').value 
	const searchStatus = document.querySelector('#searchStatus').value
	const searchGender = document.querySelector('#searchGender').value
	if (!searchName  && !searchStatus && !searchGender) {
		let result = `?page=${pageNumber}`;
		return result;

	} else {
		let result = `/?page=${pageNumber}&`;

		if (searchName) {
			result += `name=${searchName}&`;
		} 
		if (searchStatus) {
			result += `status=${searchStatus}&`;
		} 
		if (searchGender) {
			result += `gender=${searchGender}`;
		}
		return result
		console.log(result)
		showCards();
	}
}

function cl() {
	document.getElementById('js-more').classList.remove('-hide')
	document.getElementById('charactersList').innerHTML = '';
}

function showLoc(array) {
	return array.name
} 

function checkStatus(array) {
	if (array == 'Dead') {
		return ' -dead'
	} 

	if (array == 'unknown') {
		return ' -unknown'
	} else {
		return
	}
}

function showMoreCharacters() {
		pageNumber++
		showCards();
		charactersCount += allCharactersCount
		document.getElementById('js-more').innerHTML = `Показать еще ${charactersCount} из ${arrayCount - charactersCount}`
}