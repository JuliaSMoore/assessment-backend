const characterDB = require(`./db.json`)
let id = 4
module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortunes = [`You will see a ghost.`, `Relax!`, `Grim path ahead!`, `Awesome fortune!`, `Keep your eyes wide open!`]
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];
        res.status(200).send(randomFortune)
    },

    getCharacters : (req, res) => {
        res.send(characterDB)
    },


    createCharacter: (req, res) => {
        let obj = req.body
        let newCharacter = {
            name: obj.name,
            coolness: +obj.coolness,
            imageURL: obj.imageURL,
            id
        }
        id++

        characterDB.push(newCharacter)
        console.log(characterDB)
        res.send(characterDB)
    },

    deleteCharacter: (req, res) => {
        id = +req.params.id
        let index
        for (let i = 0; i<characterDB.length; i++) {
            if (characterDB[i].id === id) {
                index = i
            }
        }
        if (index !== undefined) {
            characterDB.splice(index, 1)
            res.status(200).send(characterDB)
        } else {
            res.status(400).send(`Movie not found`)
        }
    },

    updateCoolness: (req, res) => {
        let id = +req.params.id
        let {type} = req.body

        let index

for (let i = 0; i < characterDB.length; i++) {
    if(characterDB[i].id === id) {
        index = i
        }
    }

if (index !== undefined && type === `plus` && characterDB[index].coolness < 5) {
    characterDB[index].coolness++
    res.send(characterDB)
} else if (index !== undefined && type === `minus` && characterDB[index].coolness > 1) {
    characterDB[index].coolness--
    res.send(characterDB)
}else {
    res.status(400).send(`client error`)
}
}
    }