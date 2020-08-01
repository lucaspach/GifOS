
document.addEventListener('DOMContentLoaded', () => {
    // Desplegable de temas Day and Night
    /* const buttomsTheme = document.getElementsByClassName("button-chooseTheme")
    for (let i = 0; i < buttomsTheme.length; i++) {
        buttomsTheme[i].addEventListener("click", changeThemes())
        } */
    
    // Validamos que el boton buscar este deshabilitado cuando el texto este vacío
    const inputSearch = document.getElementById("input-search")
    const buttonSearch = document.getElementById("button-search")
    const suggestions = document.getElementById("suggestions")
    disabledButton(inputSearch, buttonSearch, suggestions)
    
    inputSearch.addEventListener("keyup", () => {
        //console.log("Tecla presionada")
        buttonSearch.disabled = false
        // Pintamos según el tema
        const body = document.querySelector("body")
        const lupa = document.getElementById("icon-search")
        if (body.className === "day") {
            buttonSearch.style = "background: #F7C9F3;"
            + "border: 1px solid #110038;"
            + "box-shadow: inset -1px -1px 0 0 #997D97, inset 1px 1px 0 0 #FFFFFF;"
            + "color: #997D97 100%;"
            + "width: 10%;"
            + "padding: 0.3rem;"
            // Cambiamos icono de lupa
            lupa.setAttribute("src", "./assets/lupa_light.svg")
        } else {
            buttonSearch.style = "background: #B4B4B4;"
            + "border: 1px solid #808080;"
            + "box-shadow: inset -1px -1px 0 0 #B4B4B4, inset 1px 1px 0 0 #FFFFFF;"
            + "color: #997D97 100%;"
            + "width: 10%;"
            + "padding: 0.3rem;"
            // Cambiamos icono de lupa
            lupa.setAttribute("src", "./assets/lupa.svg")
        }
        

        // Activamos la barra de sugerencias
        suggestions.style = "display: block"
        //console.log(inputSearch.value)

        disabledButton(inputSearch, buttonSearch, suggestions)
        //
    } )
    // FIN 

    // Scroll hasta el resultado
    buttonSearch.addEventListener("click", () => {
        //console.log("Entro")
        scrollToGifs()
        
    })

    const buttonTheme = document.getElementById("button-theme")
    buttonTheme.addEventListener('click', () => {
        changeThemes()
    })

    const buttonWArrow = document.getElementById("button-withArrow")
    buttonWArrow.addEventListener('click', () => {
        changeThemes()
    })

 
     // Cambio de temas en index.html CASO DIA
    document.getElementById("day").addEventListener('click', () => {
        const body = document.querySelector("body")
        const logo = document.getElementById("logo")
        body.classList.add("day")
        body.classList.remove("night")
        logo.setAttribute("src", "./assets/gifOF_logo.png")
    })

    // Cambio de temas en index.html CASO NOCHE
    document.getElementById("night").addEventListener('click', () => {
        const body = document.querySelector("body")
        const logo = document.getElementById("logo")
        body.classList.add("night")
        body.classList.remove("day")
        logo.setAttribute("src", "./assets/gifOF_logo_dark.png")
    })

    // Funcionalidad boton buscar
    document.getElementById("button-search").addEventListener('click', () => {
        //const container = document.getElementsByClassName("gifs-container")
        const search = document.getElementById("input-search").value
        limitGifs = 12
        const datos = getGifsFromGiphy(search, urlGiphySearch)
        processGifsFromGiphy(datos, limitGifs)
    })

    // Agregamos de buscar los resultados sugeridos

    const suggestionBatman = document.getElementById("suggestion-batman")
    const suggestionRe = document.getElementById("suggestion-RE")
    const suggestionHl = document.getElementById("suggestion-HL")

    suggestionBatman.addEventListener("click", () => {
        const datos = getGifsFromGiphy('batman', urlGiphySearch)
        processGifsFromGiphy(datos, 12)
        scrollToGif()
    })

    suggestionRe.addEventListener("click", () => {
        const datos = getGifsFromGiphy('resident evil', urlGiphySearch)
        processGifsFromGiphy(datos, 12)
        scrollToGif()
    })

    suggestionHl.addEventListener("click", () => {
        const datos = getGifsFromGiphy('half life', urlGiphySearch)
        processGifsFromGiphy(datos, 12)
        scrollToGif()
    })
})


// Cambio de temas en index.html
/*document.addEventListener('DOMContentLoaded', () => {
    let theme = document.querySelector('.button-theme')
    theme.addEventListener('click', () => {
        const body = document.querySelector("body")
        const logo = document.getElementById("logo")
        console.log(theme.id)
        //console.log(body.className)
        if (theme.id === "day"){
            body.classList.add('day')
            body.classList.remove('night')
            logo.setAttribute("src", "./assets/gifOF_logo.png")
        } else {
            body.classList.remove('day')
            body.classList.add('night')
            logo.setAttribute("src", "./assets/gifOF_logo_dark.png")
        }
    })
})*/

//Cargamos los 4 de mi recomendacion 
let limitGifs = 4
let datos = getGifsFromGiphy('terminator', urlGiphySearch)
processGifsFromGiphy(datos, limitGifs)
// luego 12 en trending
limitGifs = 12
datos = getGifsFromGiphy('', urlGiphyTrending)
processGifsFromGiphy(datos, limitGifs)



/* async function getGifsFromGiphy(search, url) {
    const resp = await fetch(url + "?q=" + search + "&api_key=" + myApiKey + "&limit=" + limitGifs)
    const datos = await resp.json()

    return datos
} */

