var contador = 0
var contadorLetra = 0
var word = ""
var words = ""
var fraseCompletaUsuario = ""
var fraseCompleta = ""
var interval = ""

const tempo = {
    millisegundos: 0,
    segundos: 0,
    minutos: 0,
    horas: 0,
}
const palavras = [
    "amor",
    "casa",
    "paz",
    "felicidade",
    "vida",
    "amizade",
    "liberdade",
    "pessoa",
    "natureza",
    "sabedoria",
    "trabalho",
    "familia",
    "energia",
    "sucesso",
    "saude",
    "progresso",
    "prosperidade",
    "alegria",
    "criatividade",
    "espiritualidade",
    "motivacao",
    "optimismo",
    "realizacao",
    "entusiasmo",
    "harmonia",
    "simplicidade",
    "verdade",
    "abundancia",
    "gratidao",
    "harmonia",
    "paixao",
    "evolucao",
    "crescimento",
    "desenvolvimento",
    "competencia",
    "confianca",
    "excelencia",
    "autoestima",
    "auto-conhecimento",
    "auto-aperfeicoamento",
    "auto-disciplina",
    "auto-eficacia",
    "auto-motivacao",
    "auto-sabedoria",
    "auto-dominio",
    "auto-regulacao",
    "auto-responsabilidade",
    "auto-estima",
    "auto-respeito",
    "auto-amor",
    "bondade",
    "carater",
    "compaixao",
    "coragem",
    "dignidade",
    "equidade",
    "generosidade",
    "integridade",
    "justica",
    "nobreza",
    "perdao",
    "respeito",
    "responsabilidade",
    "sinceridade",
    "tolerancia",
    "verdade",
    "virtude",
    "bem-estar",
    "bem-aventuranca",
    "bem-estar",
    "bem-estar",
    "prazer",
    "satisfacao",
    "contentamento",
    "equilibrio",
    "felicidade",
    "harmonia",
    "paz",
    "plenitude",
    "serenidade",
    "tranquilidade"];

const citacoes = [
]

const preferencias = {
    tipoPalavras: "gerar",
    color: "#e706e7",
    quantidade: 50,
    tema: "dark",
    ordem: "⇩",
    filtro: "tempo"
}

const paletaDark = {
    bgColor: "#323437",
    bgColor2: "#383737",
    border: "#000000",
    bgDivs: "#2c2e31",
    colorGray: "#808080",
    box: "#000000bf",
    colorWhite: "#ffffff"
}

const paletaWhite = {
    bgColor: "#ffffff",
    bgColor2: "#b1b1b1",
    border: "#000000",
    bgDivs: "#c4c3c3",
    colorGray: "#535353",
    box: "#000000bf",
    colorWhite: "black"
}

let paletaAtual = {
    bgColor: "#323437",
    bgColor2: "#383737",
    border: "#000000",
    bgDivs: "#2c2e31",
    colorGray: "#808080",
    box: "#000000bf",
    colorWhite: "#ffffff"
}
   
let border = "3px solid red;"

const svgSun = `
<path d="M12 7a5 5 0 1 0 0 10 5 5 0 1 0 0-10z"></path>
<path d="M12 1v2"></path>
<path d="M12 21v2"></path>
<path d="m4.22 4.22 1.42 1.42"></path>
<path d="m18.36 18.36 1.42 1.42"></path>
<path d="M1 12h2"></path>
<path d="M21 12h2"></path>
<path d="m4.22 19.78 1.42-1.42"></path>
<path d="m18.36 5.64 1.42-1.42"></path>`

const svgMoon = `
<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"></path>
`

function listarHistorico(){
    console.log(localStorage.getItem("Historico"))
}

function limparHistorico(){
    localStorage.removeItem("Historico")
}

function organizarLayout(){
    lerPreferencias();
    alinharHeader()
    criarFrase()
    trocarCor()
    lerTema()
}

function lerPreferencias(){
    try{
        pref = JSON.parse(localStorage.getItem("preferencias"))
    
        preferencias.tipoPalavras = pref.tipoPalavras
        if (pref.palavras == "palavras"){
            preferencias.palavras = palavras
        }else if(pref.palavras == "citacoes"){
            preferencias.palavras = citacoes
        }
    
        preferencias.color = pref.color
        preferencias.quantidade = pref.quantidade
        preferencias.tema = pref.tema
    
        document.getElementById("quantidade").innerText = preferencias.quantidade.toString().padStart(2, "0")
    }catch(e){
        
    }


}




function salvarPreferencias(){
    console.log("salvando")
    localStorage.setItem("preferencias", JSON.stringify(preferencias))    
    lerPreferencias()
}

function trocarTema(){
    if (preferencias.tema == "dark"){
        preferencias.tema = "light"
    }else{
        preferencias.tema = "dark"
    }

    salvarPreferencias()
    lerTema()
}

function lerTema(){
    let tema = document.getElementById("tema")
    tema.innerHTML = ""
    if (preferencias.tema == "dark"){
        tema.innerHTML += svgSun
        paletaAtual = paletaDark
    }else if(preferencias.tema == "light"){
        tema.innerHTML +=  svgMoon
        paletaAtual = paletaWhite
    }




    document.body.style.setProperty("--bg-color", paletaAtual.bgColor);
    document.body.style.setProperty("--bg-color2", paletaAtual.bgColor2);
    document.body.style.setProperty("--border", paletaAtual.border);
    document.body.style.setProperty("--bg-divs", paletaAtual.bgDivs);
    document.body.style.setProperty("--color-gray", paletaAtual.colorGray);
    document.body.style.setProperty("--box", paletaAtual.box);
    document.body.style.setProperty("--color-white", paletaAtual.colorWhite);

    
}

function trocarCor(e){
    
    try{
        e = e.target.value
        preferencias.color = e;
        salvarPreferencias()
    }
    catch(erro){
        e = preferencias.color
    }
    
    document.body.style.setProperty("--color", e)
    border = "3px solid "+ document.body.style.getPropertyValue("--color")
    document.getElementsByClassName("item-menu-type2")[0].value = e


    
}

function alinharHeader(){
    let logoSvg = document.getElementsByClassName("logo-svg")[0]
    let logoText = document.getElementsByClassName("logo-text")[0]

    logoText.style.height = logoSvg.clientWidth + "px"
    logoText.style.fontSize = logoSvg.clientWidth-5 + "px"


}

function alterarNumeroDePalavras(){
    preferencias.quantidade = parseInt(document.getElementById("quantidade").innerText) - 5
    if (preferencias.quantidade == 0) preferencias.quantidade = 50
    document.getElementsByClassName("words")[0].innerHTML = ""
    document.getElementById("quantidade").innerText = preferencias.quantidade.toString().padStart(2, "0")
    buscarHistorico()
    salvarPreferencias()
    criarFrase()
    
}

function recomecarTeste(){

    criarFrase()
}

function criarFrase(){
    let words = document.getElementsByClassName("words")[0]
    words.setAttribute("onclick", "iniciarTeste1()")
    words.innerHTML = ""
    fraseCompleta = ""
    fraseCompletaUsuario = ""
    contador = 0
    contadorLetra = 0
    clearInterval(interval)
    interval = ""
    let timer = document.getElementsByClassName("timer")[0]
    let timerText = document.getElementsByClassName("timer-text")[0]
    let resultado = document.getElementsByClassName("resultado")[0]
    resultado.style.opacity = "0"
    
    timer.style.marginTop = -15 +"px"
    timerText.innerText = ""

    if(preferencias.tipoPalavras === "gerar"){
        for (let cont = 0; cont < preferencias.quantidade; cont++){
            let aleatorio = Math.floor(Math.random() * palavras.length)
            let word = document.createElement("div")

            palavras[aleatorio].split("").forEach(function (letra) {
                let letter = document.createElement("letter")
                letter.innerText = letra
                word.className = "word"
                word.appendChild(letter)   
                fraseCompleta += letra

            })
            fraseCompleta += " "
            words.appendChild(word)
        }
    }else{

    }

}

function iniciarTeste1(){
    words = document.getElementsByClassName("words")[0]
    word = words.childNodes[contador]
    word.childNodes[0].style.borderRight = border
    word.className = "word-actual"
    document.getElementsByTagName("body")[0].setAttribute("onkeyup", "digitarPalavra(event)")
    words.setAttribute("onclick", "")
}

function iniciarTimer(){

    let timer = document.getElementsByClassName("timer")[0]
    let timerText = document.getElementsByClassName("timer-text")[0]
    timer.style.marginTop = 0
    timerText.innerText = 0
    tempo.millisegundos = 0   
    tempo.segundos = 0
    tempo.segundos = 0
    tempo.minutos = 0

    mostrarComTransition(timerText)

    interval = setInterval(() => {
        tempo.millisegundos++

        if (tempo.millisegundos == 100){
            tempo.millisegundos = 0   
            tempo.segundos++
        }

        if (tempo.segundos == 60){
            tempo.segundos = 0
            tempo.minutos++
        }

        if (tempo.minutos == 60){
            tempo.segundos = 0
            tempo.minutos++
        }

        let milisegundosFormatados = tempo.millisegundos = 0 ? " " : tempo.millisegundos.toString().padStart(2, "0")
        let minutosFormatados = tempo.segundos == 0 ? " " : tempo.segundos.toString().padStart(2, "0") + ":"
        let segundosFormatados = tempo.minutos == 0 ? " " : tempo.minutos.toString().padStart(2, "0") + ":"
        let horasFormatadas = tempo.horas == 0 ? "" : tempo.horas.toString().padStart(2, "0")+ ":"

        timerText.innerHTML = `${horasFormatadas}${segundosFormatados}${minutosFormatados}${milisegundosFormatados}`

    }, 10);

}

function mostrarComTransition(elemento, tempo = 100, somatiorio = 0.100){
    let opacity = 0
    let transition  = setInterval(() => {
        opacity += somatiorio
        elemento.style.opacity = opacity
    }, tempo);


    setInterval(() => {
        clearInterval(transition)
    }, (1/somatiorio)*tempo);
}

function verificarLetra(key){
    let letter = word.childNodes[contadorLetra];
    letter.style.borderRight = ""
    if (key === letter.innerText){
        letter.style.color = paletaAtual.colorWhite
    }else{
        letter.style.color = "red"
    }
}

function digitarPalavra(key){


    if (contador === 0 && contadorLetra ===0 && interval == "" && "abcdefghijklmnopqrstuvxwyz-,.".search(key.key) != -1){
        
        iniciarTimer()
    }

    if (words.childNodes.length -1 == contador && word.childNodes.length-1 == contadorLetra){
        document.getElementsByTagName("body")[0].setAttribute("onkeyup", "")
        fraseCompletaUsuario += key.key
        verificarLetra(key.key)

        finalizarTeste();

    }else if (key.key === "Backspace"){
        apagarUltimoValor()}
    else if (word.childNodes[contadorLetra] === undefined && key.key == " "){
        word.className = "word"
        contador += 1
        word = words.childNodes[contador]
        word.className = "word-actual"
        word.style.borderLeft = ""
        contadorLetra = 0
        letra = word.childNodes[contadorLetra];
        letra.style.borderRight = border
        fraseCompletaUsuario += key.key
        
    }else if(word.childNodes[contadorLetra] !== undefined && "abcdefghijklmnopqrstuvxwyz-,.".search(key.key) != -1){
        let letter = word.childNodes[contadorLetra];
        letter.style.borderRight = ""
        fraseCompletaUsuario += key.key

        verificarLetra(key.key)

        contadorLetra += 1
        if (word.childNodes[contadorLetra] === undefined){
            words.childNodes[contador+1].style.borderLeft = border
        }else{
            letter = word.childNodes[contadorLetra];
            letter.style.borderRight = border
        }
    }  
}

function apagarUltimoValor(){
    if(word.childNodes[contadorLetra] === undefined){
        words.childNodes[contador+1].style.borderLeft = "none"
    }else{
        words = document.getElementsByClassName("words")[0]
        word = words.childNodes[contador]
        let letter = word.childNodes[contadorLetra]
        letter.style.border = "None"
        letter.style.color = "#808080"
    }

    contadorLetra = contadorLetra - 1

    if (contadorLetra < 0 && contador > 0){
        contador = contador - 1
        word = words.childNodes[contador]
        contadorLetra = word.childNodes.length - 1
    }else if(contador == 0 && contadorLetra == -1){
        contadorLetra = 0
    }
    letter = word.childNodes[contadorLetra]
    letter.style.borderRight = border
    letter.style.color = "#808080"
    if (fraseCompletaUsuario[fraseCompletaUsuario.length - 1] == " "){
        fraseCompletaUsuario = fraseCompletaUsuario.substring(0, fraseCompletaUsuario.length - 1);
        fraseCompletaUsuario = fraseCompletaUsuario.substring(0, fraseCompletaUsuario.length - 1);
    }else{
        fraseCompletaUsuario = fraseCompletaUsuario.substring(0, fraseCompletaUsuario.length - 1);
    }

}

function finalizarTeste(){
    clearInterval(interval)
    let milisegundosFormatados = tempo.millisegundos = 0 ? " " : tempo.millisegundos.toString().padStart(2, "0")
    let minutosFormatados = tempo.segundos == 0 ? " " : tempo.segundos.toString().padStart(2, "0") + ":"
    let segundosFormatados = tempo.minutos == 0 ? " " : tempo.minutos.toString().padStart(2, "0") + ":"
    let horasFormatadas = tempo.horas == 0 ? "" : tempo.horas.toString().padStart(2, "0")+ ":"
    let tempoHTML = document.getElementById("tempo").innerHTML = `Tentativa Atual: <a>${horasFormatadas}${segundosFormatados}${minutosFormatados}${milisegundosFormatados}</a>`

    let resultado = document.getElementsByClassName("resultado")[0]
    let taxa = calcularDadosTexto()
    let acertoErro = document.getElementById("acerto").innerHTML = "Taxa de Acerto: " + "<a>" + taxa +"</a>"

    let textoUsuario = document.getElementById("texto").innerHTML = "Texto Digitado por voce: " + "<a>" +fraseCompletaUsuario +"</a>"

    mostrarComTransition(resultado);

    let data = new Date()
    data = `${data.getDay().toString().padStart(2, "0")}/${(data.getMonth()+1).toString().padStart(2, "0")}/${data.getFullYear()}`

    try{
        let bdLocal = JSON.parse(localStorage.getItem("Historico"))
        let novoRegistro = {data: data, tempo: `${horasFormatadas}${segundosFormatados}${minutosFormatados}${milisegundosFormatados}`, quantidade: preferencias.quantidade, tipo: preferencias.tipoPalavras, taxa: taxa}
        bdLocal.push(novoRegistro)
        localStorage.setItem("Historico", JSON.stringify(bdLocal))   

    }catch(erro){
        let bdLocal = [{data: data, tempo: `${horasFormatadas}${segundosFormatados}${minutosFormatados}${milisegundosFormatados}`, quantidade: preferencias.quantidade, tipo: preferencias.tipoPalavras, taxa: taxa}]
        localStorage.setItem("Historico", JSON.stringify(bdLocal))
    }

    buscarHistorico()

}

function calcularDadosTexto(){
    let numeroPalavras = fraseCompleta.replaceAll(" ", "").length
    let numeroErros = 0
    let fraseusuario = fraseCompletaUsuario.replaceAll(" ", "")


    fraseCompleta.replaceAll(" ", "").split("").forEach(function (letra, index) {
        if (letra != fraseusuario[index]){
            numeroErros++ 
        }
    })
    return ((100 - ((numeroErros*100)/numeroPalavras)).toFixed(2)).toString() + "% - "+numeroErros+" Letras Incorretas" ;



}

function ocultarHistorico(){
    let body = document.body
    body.style.gridTemplateColumns  = "100%"
    body.style.gridTemplateAreas =  '"header header" "functions functions""words words""timer timer""resultado resultado"';
    body.style.setProperty("--margin", "auto auto auto auto")
    let mostrarHistorico = document.getElementById("mostrarHistorico")
    mostrarHistorico.setAttribute("onclick", "mostrarHistorico()")
    document.getElementsByClassName("historico")[0].remove()
}

function mostrarHistorico(){
    let body = document.body
    let historicoElement = document.createElement("div")
    let type = document.createElement("span")
    let elementos = document.createElement("div")
    let ul = document.createElement("ul")
    let mostrarHistorico = document.getElementById("mostrarHistorico")

    mostrarHistorico.setAttribute("onclick", "ocultarHistorico()")

    body.style.setProperty("--margin", "auto 0 auto auto")

    historicoElement.className = "historico"
    type.className = "type"
    elementos.className = "elementos"
    ul.id = "lista"

    type.textContent = `TOP ${preferencias.quantidade} Palavras`

    body.style.gridTemplateColumns  = "60% 40%"
    body.style.gridTemplateAreas =  '"header header" "functions historico""words historico""timer historico""resultado resultado"';
    
    historicoElement.appendChild(type)
    elementos.appendChild(ul)
    historicoElement.appendChild(elementos)
    body.appendChild(historicoElement)
    buscarHistorico()
}

function mudarFiltro(){
    let texto = document.getElementsByClassName("type")[0].childNodes[1].textContent

    if (preferencias.filtro == "tempo"){
        preferencias.filtro = "erro"
    }else{
        preferencias.filtro = "tempo"
    }

    salvarPreferencias()
    buscarHistorico()
}




function mudarOrdem(){

    if (preferencias.ordem =="⇩"){
        preferencias.ordem = "⇧"
    }else{
        preferencias.ordem = "⇩"
    }

    salvarPreferencias()
    buscarHistorico()
}

function buscarHistorico(){
        console.log("entreu")
        document.getElementsByClassName("type")[0].innerHTML = `| TOP ${preferencias.quantidade} Palavras | <a onclick="mudarFiltro()">${preferencias.filtro}</a> <a onclick="mudarOrdem()">${preferencias.ordem}</a>`
        let array = localStorage.getItem("Historico")
        let ul = document.getElementById("lista")
        ul.innerHTML = ""

        array = JSON.parse(array)
        array.filter(value =>{
            if (value.quantidade == preferencias.quantidade){
                return value
            }
            
        })
        
        if (preferencias.filtro == "tempo" && preferencias.ordem == "⇩"){
            array.sort(function(a,b) {
                a  = parseInt(a.tempo.replaceAll(":", ""))
                b  = parseInt(b.tempo.replaceAll(":", ""))
                return a-b;
            });
        }else if(preferencias.filtro == "tempo" && preferencias.ordem == "⇧"){
            array.sort(function(a,b) {
                a  = parseInt(a.tempo.replaceAll(":", ""))
                b  = parseInt(b.tempo.replaceAll(":", ""))
                return b-a;
            });
        }else if(preferencias.filtro == "erro" && preferencias.ordem == "⇩"){
            array.sort(function(a,b) {
                
                a  = parseInt((a.taxa.slice(a.taxa.search("-")+1, a.taxa.search("L"))).replaceAll(" ", ""))
                b  = parseInt(b.taxa.slice(b.taxa.search("-")+1, b.taxa.search("L")))
                return b-a;
            });
        }else if(preferencias.filtro == "erro" &&   preferencias.ordem == "⇧"){
            array.sort(function(a,b) {
                a  = parseInt(a.taxa.slice(a.taxa.search("-")+1, a.taxa.search("L")))
                b  = parseInt(b.taxa.slice(b.taxa.search("-")+1, b.taxa.search("L")))
                console.log(a)

                return a-b;
            });
        }

    
        array.forEach((value) => {
            if (value.quantidade == preferencias.quantidade){
            let li = document.createElement("li")
            li.textContent = `${value.data}: ${value.tempo} Taxa: ${value.taxa}`
            console.log(li)
            console.log(`${value.data}: ${value.tempo} Taxa: ${value.taxa}`)
            ul.appendChild(li)         
            }
        })

    
        
    
}


