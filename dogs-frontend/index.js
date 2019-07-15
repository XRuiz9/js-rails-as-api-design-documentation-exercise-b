console.log("Logging from the dogs-frontend/index.js");
document.addEventListener('DOMContentLoaded', function(){
	document.querySelector("form").addEventListener('submit', function(e){
		e.preventDefault();

		// console.log(e.target.children[3].children.filter(n => checked()))
		const name = e.target.children[1].value
		const checked = (e.target.parentElement.children[1].children[3].querySelector("input[type=radio]:checked").value)
		const BASE_URL = "https://flatiron-dogs-api.herokuapp.com"
		const url = BASE_URL + "/dog_search/?query=" + name + "&sort_field=" + checked

		fetch(url, {
			method: "GET",
			header: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
		.then(resp => resp.json())
		.then(dogs => {
			console.log(dogs)
			const ulEl = document.querySelector("ul")
			ulEl.innerHTML = ""
			for (let dog of dogs){
				ulEl.innerHTML += `
					        <li>
					            <h3 class="name">${dog.name}</h3>
					            <div class="info">
					                <div class="breed">
					                    <label for="breed">Breed: </label>
					                    ${dog.breed}
					                </div>
					                <div class="phrase">
					                    <label for="phrase">Tweet: </label>
					                    ${dog.phrase}
					                </div>
					                <div class="size">
					                    <label for="size">Size: </label>
					                    ${dog.size}
					                </div>
					            </div>
					        </li>`
			}
		})
	})
})
