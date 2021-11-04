const { NOMEM } = require("dns");
const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

let message = "";
const pokedex = [
    {
        numero:133,
        nome:"Eevee",
        tipo:"Normal",
        imagem:"/img/evee.png",
        descricao:"It has the ability to alter the composition of its body to suit its surrounding environment.",
        altura:1,
        peso:14.3,
        categoria:"Evolution",
        habilidade:"Run Away, Adapdability",
    },
    {
        numero:196,
        nome:"Espeon",
        tipo:"Psychic",
        imagem:"/img/espeon.png",
        descricao:"By reading air currents, it can predict things such as the weather or its foe’s next move.",
        altura:2.11,
        peso:58.4,
        categoria:"Sun",
        habilidade:"Synchronize",
    },
    {
        numero:197,
        nome:"Umbreon",
        tipo:"Dark",
        imagem:"/img/umbreon.png",
        descricao:"When this Pokémon becomes angry, its pores secrete a poisonous sweat, which it sprays at its opponent’s eyes.",
        altura:3.03,
        peso:59.5,
        categoria:"Moonlight",
        habilidade:"Synchronize",
    }
];

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded());

app.get("/", function(req, res) {
    
    res.render("index", {pokedex:pokedex,message:message});
});

app.get("/cadastro", function (req, res){
    res.render("cadastro");
});

app.post("/new", (req, res) => {
    const pokemon = req.body;
    pokedex.push(pokemon); 
    message = "Pokemon cadastrado com sucesso!";    
    res.redirect("/");
    
});

app.get("/detalhes/:id", (req, res) => {
    const id = req.params.id;
    const pokemon = pokedex[id];
    console.log(pokemon);
    res.render("detalhes", {pokemon:pokemon}
    );
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));