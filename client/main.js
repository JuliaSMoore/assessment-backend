const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById(`fortuneButton`)
const characterContainer = document.getElementById(`character-container`)
const form = document.querySelector('form')


const characterCallback = ({ data: chars }) => displayCharacters(chars)
const errCallback = err => console.log(err.response.data)

const getCharacters = () => axios.get(`http://localhost:4000/api/characters`).then(characterCallback).catch(errCallback)

const deleteCharacter = id => axios.delete(`http://localhost:4000/api/characters/${id}`).then(characterCallback).catch(errCallback)

const updateCoolness = (id, type) => axios.put(`http://localhost:4000/api/characters/${id}`, {type}).then(characterCallback).catch(errCallback)

const createCharacter = body => axios.post(`http://localhost:4000/api/characters`, body).then(characterCallback).catch(errCallback)

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => (
    axios.get (`http://localhost:4000/api/fortune/`)
    .then (res => {
        alert(res.data)
    })


)

function createCharacterCard (char) {
const characterCard = document.createElement(`div`)
characterCard.classList.add('character-card')

characterCard.innerHTML = `<img src=${char.imageURL} class="char-image"/>
<p class="char-name">${char.character}</p>
<div class="btns-container">` + (char.coolness === 1 ? `<div class ="filler-div"></div>` : `<button onclick="updateCoolness(${char.id}, 'minus')">-</button>`) +
`<p class="char-coolness">${char.coolness}</p>` +
(char.coolness >= 5 ? `<div class ="filler-div"></div>` : `<button onclick="updateCoolness(${char.id}, 'plus')">+</button>`) +
` </div>
<button onclick="deleteCharacter(${char.id})">delete</button>`

characterContainer.appendChild(characterCard)
}


function displayCharacters(arr) {
    characterContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createCharacterCard(arr[i])
    }
}

function submitCreate(event) {
    event.preventDefault()

    let name = document.getElementById('character-name')
    let coolness = document.querySelector('input[name="coolness"]:checked')
    let imageURL = document.getElementById('img')

    let bodyObj = {
        name: name.value,
        coolness: coolness.value, 
        imageURL: imageURL.value
    }

    createCharacter(bodyObj)

    name.value = ''
    coolness.checked = false
    imageURL.value = ''
}

complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener(`click`, getFortune)
form.addEventListener('submit', submitCreate)

getCharacters()