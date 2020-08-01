// Funciones desde INDEX

// Validamos que el boton buscar este deshabilitado cuando el texto este vacío
const disabledButton = (inputSearch, buttonSearch, suggestions) => {
    if (inputSearch.value === "" || inputSearch.value === null) {
      buttonSearch.disabled = true
      // Cambiamos estilo a habilitado
      // Pintamos según el tema
      const body = document.querySelector("body")
      if (body.className === "day") {
        buttonSearch.style = "background: #E6E6E6;"
                            + "border: 1px solid #808080;"
                            + "box-shadow: inset -1px -1px 0 0 #B4B4B4, inset 1px 1px 0 0 #FFFFFF;"
                            + "color: #B4B4B4 100%;"
                            + "width: 10%;"
                            + "padding: 0.3rem;"
      } else {
        buttonSearch.style = "background: #EE3EFE;"
                            + "border: 1px solid #110038;"
                            + "box-shadow: inset -1px -1px 0 0 #A72CB3, inset 1px 1px 0 0 #FFFFFF;"
                            + "color: #B4B4B4 100%;"
                            + "width: 10%;"
                            + "padding: 0.3rem;"
      }
      // Desactivamos barra de sugerencias
      suggestions.style = "display: none"
      // Cambiamos icono de lupa
      const lupa = document.getElementById("icon-search")
      lupa.setAttribute("src", "./assets/lupa_inactive.svg")
    }
}

const scrollToGif = () => {
    const gifContainer = document.getElementById("gifs-container")
    let position = gifContainer.getBoundingClientRect()
    const yPosition = position.y
    window.scrollTo(0, yPosition)
    //console.log(yPosition)
}

// Procesamos la info
function processGifsFromGiphy(datos, limitGifs) {
    datos.then(function(respuesta){
        //console.log(respuesta)
        const data = respuesta.data
        if (limitGifs === 4) {
            setGifosRecomendation(data)
        } else {
            setGifos(data)
        }
    })
    .catch(function(error){
        console.log("Error" + error)
    })
}

// Voy recorriendo y añadiendo los gifs recomendados
function setGifosRecomendation(data){
    let gifContainer = document.getElementsByClassName("gifs-recomendation-box")
    let count = 0
    data.forEach(element => {
        const img = document.createElement("img")
        img.className = "gif"
        img.style = "background-image: url(" + "'" + element.images.original.url + "'); " 
        gifContainer[count].appendChild(img)
        count = count + 1
    })
}

// Voy recorriendo y añdiendo los gifs
function setGifos(data){
    const gifContainer = document.getElementById("gifs-container")
    // Primero limpiamos los gifs que hay de la busqueda anterior
    removeGifs(gifContainer)
    data.forEach(element => {
        const img = document.createElement("img")  
        img.className = "gif"
        img.style = "background-image: url(" + "'" + element.images.original.url + "'); " 
        gifContainer.appendChild(img)
    })
}

function removeGifs(gifContainer) {
    while (gifContainer.firstChild){
        gifContainer.removeChild(gifContainer.firstChild)
    }
}

// Función para obtener los gifs de la API
const getGifsFromGiphy = async (search, url) => {
    const resp = await fetch(url + "?q=" + search + "&api_key=" + myApiKey + "&limit=" + limitGifs)
    const datos = await resp.json()

    return datos
}

const changeThemes = () => {
  const themeButtons = document.getElementById("theme-buttons")
  if (themeButtons.style.display === "block"){
      themeButtons.style.display = "none"
  } else {
      themeButtons.style.display = "block"
  }
  // Salgo del despegable cuando hago click en otro lado
  window.onclick = function(event) {
      if (!event.target.matches('.button-chooseTheme')) {
          themeButtons.style.display = "none"
      }
  }
}

// Funciones desde UPLOAD

// Función para obtener los gifs desde Local Storage
const getIdFromLocalStg = async () => {
    keys = Object.keys(localStorage)
    console.log(keys)
    return keys;
}

const pushToMyGifs = async (id) => {
    const gifContainer = document.getElementById("gifs-container")
    // Primero limpiamos los gifs que hay de la busqueda anterior
    const img = document.createElement("img")  
    img.className = "gif"
    img.style = `background-image: url("https://media.giphy.com/media/${id}/giphy.gif")`
    gifContainer.appendChild(img)
  }


const misGuifos = async (gifContainer) => {
  if (gifContainer != null) { removeGifs(gifContainer) }
  const idLocalStorage = await getIdFromLocalStg()
  await idLocalStorage.forEach(pushToMyGifs)
}
  

/* const restart = () => {
    recorder = null
    cameraImg.setAttribute("src", "./assets/camera.svg")
    record.style = "background: #F7C9F3;"
    record.innerText = "Capturar"
    captureImg.style = "background: #F7C9F3;"
}
 */
const copyToClipboard = res => {
  const el = document.createElement('textarea');
  el.value = res;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};
/* 
const previewToSuccess = async (previewBoxContainer, previewButtonsContainer, repeat, upload) => {
  previewBoxContainer.style = "display: flex; flex-direction: column;width: 700px;height: 390px;"
  const previewBox = document.getElementById("preview-box")
  previewBox.style = "display: flex;flex-direction: row;"
  previewButtonsContainer.style = "display: flex;flex-direction: column;align-items: center;justify-content: flex-start"

  // Editamos los botones 
  repeat.style = "height: 36px;width: 200px;margin: 5px;text-align: center;background: #FFF4FD;border: 1px solid #110038;box-shadow: inset -1px -1px 0 0 #997D97, inset 1px 1px 0 0 #FFFFFF;"
  repeat.textContent = "Copiar Enlace Guifo"
  repeat.id = "copyLinkGif"

  upload.style = "height: 36px;width: 200px;margin: 5px;text-align: center;background: #FFF4FD;border: 1px solid #110038;box-shadow: inset -1px -1px 0 0 #997D97, inset 1px 1px 0 0 #FFFFFF;"
  upload.textContent = "Descargar Guifo"
  upload.id = "downloadGif" 
 
  // Modificamos el DOM con el caso de éxito
  const title = previewBoxContainer.getElementsByTagName("h2")
  title[0].innerHTML = "Guifo cargado con Exito"
  const gifUpload = document.getElementById("preview-gif")
  gifUpload.style = "width: 365px; height: 190px; padding: 15px"
  const buttom = document.createElement("button")
  buttom.style = "height: 36px;width: 130px;cursor: pointer;text-align: center;margin-top: 200px;background: #F7C9F3; border: 1px solid #110038; box-shadow: inset -1px -1px 0 0 #997D97, inset 1px 1px 0 0 #FFFFFF; cursor: pointer;"
  buttom.id = "finally-ok"
  buttom.textContent = "Listo"

  previewButtonsContainer.appendChild(buttom)
} */

const getPreviewGif = async (blob, buttomContainer) => {
  const url = URL.createObjectURL(blob)
  const preview = document.getElementById("preview-gif")
  preview.className = "gif"
  preview.style = "margin: 10px; width: 680px; height: 330px;"
  preview.setAttribute("src", url)
  let btnAvailable
  // Validamos si los botones están creados
  try {
    const r = document.getElementById("repeatButtom")
    const u = document.getElementById("uploadGuifo")
    if (r != null && u != null ){btnAvailable = true}
  } catch {
    btnAvailable = false
  }

  if (!btnAvailable) {
    console.log("Entro")
    // creamos el btn Repetir
    const repeatButtom = document.createElement("buttom")
    repeatButtom.id = "repeatButtom"
    repeatButtom.style = "height: 36px;width: 130px;cursor: pointer;text-align: center;margin: 2px;background: #FFF4FD;border: 1px solid #110038;box-shadow: inset -1px -1px 0 0 #997D97, inset 1px 1px 0 0 #FFFFFF;"
    repeatButtom.textContent = "Repetir captura"

    buttomContainer.appendChild(repeatButtom)

    // creamos el btn Subir guifo
    const uploadGuifo = document.createElement("buttom")
    uploadGuifo.id = "uploadGuifo"
    uploadGuifo.style = "height: 36px;width: 130px;cursor: pointer;text-align: center;margin: 2px;background: #F7C9F3;border: 1px solid #110038;box-shadow: inset -1px -1px 0 0 #997D97, inset 1px 1px 0 0 #FFFFFF;"
    uploadGuifo.textContent = "Subir Guifo"
    
    buttomContainer.appendChild(uploadGuifo)
  }
}

const sendGifToApi = async blob => { 
  const fData = new FormData()
  fData.append('file', blob, 'myGif.gif')
  //console.log(urlGiphyUpload)
  try {
    const res = await fetch(urlGiphyUpload, { method: "POST", mode: "cors", body: fData })
    const data = await res.json()
    // Validamos si esta OK para subirlo
    if (res.status === 200) {
        // Función para guardar los gifs en el localStorage
      localStorage.setItem(data.data.id, JSON.stringify(data))
      return data.data.id
    }
  } catch (error) {
    console.log(error)
  }
}

const getMedia = async () => {
    let stream = null
    const config = {
      video: { height: { max: 420 } },
      audio: false
    }
    try {
      stream = await navigator.mediaDevices.getUserMedia(config)
      return stream
    } catch(err) {
      console.log("Sin permisos para acceder a la camara")
    }
}
