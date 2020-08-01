document.addEventListener('DOMContentLoaded', async () => {

    const start = document.getElementById("start")
    const cancel = document.getElementById("cancel")
    const video = document.getElementById("video-content")
    const textBoxContainer = document.getElementById("text-box-container")
    const videoBoxContainer = document.getElementById("video-box-container")
    const record = document.getElementById("recording-buttom")
    const cameraImg = document.getElementById("camera-img")
    const captureImg = document.getElementById("capture-img")
    const previewBoxContainer = document.getElementById("preview-box-container")
    const successBoxContainer = document.getElementById("success-box-container")
    const previewButtonsContainer = document.getElementById("preview-buttons-container")
    const gifContainer = document.getElementById("gif-container")
    

    let recorder = null
    let stream = null

    const recordConfig = {
      type: 'gif',
      framerate: 1,
      quality: 10,
      width: 360,
      height: 240
    }
    // Parte mis guifos
    misGuifos(gifContainer)

    cancel.addEventListener("click", async () => {
      textBoxContainer.style = "display: none"
      video.srcObject = null
      video.pause()
      recorder = null
    })
    
    start.addEventListener('click', async () => {
      stream = await getMedia()
      textBoxContainer.style = "display: none"
      videoBoxContainer.style = "display: flex; flex-direction: column"

      video.srcObject = stream
      video.play()
    })
    // Comenzar a grabar
    record.addEventListener('click', async () => {
      if (recorder === null) {
        recorder = new RecordRTCPromisesHandler(stream, recordConfig)
        recorder.startRecording()
        // Cambio de estilos VALIDAR DAY/NIGHT EN FUTURO
        record.style = "background: #FF6161;"
        record.innerText = "Listo"
        captureImg.style = "background: #FF6161;"
        cameraImg.setAttribute("src", "./assets/recording.svg")

      } else {
        await recorder.stopRecording();
        let blob = await recorder.getBlob();
        // Antes de enviarlo.. lo mostramos
        videoBoxContainer.style = "display: none;"
        previewBoxContainer.style = "display: flex; flex-direction: column"     
        getPreviewGif(blob, previewButtonsContainer)
        
        // Opcion volver a generar el gif
        const repeat = document.getElementById("repeatButtom")
        repeat.addEventListener("click", () => {
          previewBoxContainer.style = "display: none;"
          videoBoxContainer.style = "display: flex; flex-direction: column;"
          recorder = null
          cameraImg.setAttribute("src", "./assets/camera.svg")
          record.style = "background: #F7C9F3;"
          record.innerText = "Capturar"
          captureImg.style = "background: #F7C9F3;"
        })

        // Opcion cargarlo
        const upload = document.getElementById("uploadGuifo")
        upload.addEventListener("click", () => {
          // Llamamos a función para enviar el blob
          const res = sendGifToApi(blob)
          if (res != null) {
            // Modificamos el DOM 
            //previewToSuccess(previewBoxContainer, previewButtonsContainer, repeat, upload)
            // Cargamos el nuevo
            previewBoxContainer.style = "display: none;"
            successBoxContainer.style = "display: flex; flex-direction: column"           

 
            const uploadGif = document.getElementById("upload-gif")
            const preview = document.getElementById("preview-gif")
            const srcPreview = preview.getAttribute("src")
            console.log(srcPreview)
            uploadGif.setAttribute("src", srcPreview)
            
           
            // Botones de descarga y copiado al portapapeles
            const copyLinkGif = document.getElementById("copyLinkGif")
            copyLinkGif.addEventListener("click", () => {
              copyToClipboard(res)
              console.log("Copiado a portapapeles")
              //successBoxContainer.style = "display: none"
              //recorder = null
            })

            const downloadGif = document.getElementById("downloadGif")
            downloadGif.addEventListener("click", () => {
              invokeSaveAsDialog(blob);
              //successBoxContainer.style = "display: none"
              //recorder = null
            })

            const ok = document.getElementById("finally-ok")
            ok.addEventListener("click", () => {
              successBoxContainer.style = "display: none;"
              video.srcObject = null //ojo
              recorder = null
              textBoxContainer.style = "display: flex; flex-direction: column;"
              // actualizamos mis guifos
              misGuifos(gifContainer)
            })
          }   
        })
         // Cambiamos estilos y reiniciamos el recorder
        recorder = null
        cameraImg.setAttribute("src", "./assets/camera.svg")
        record.style = "background: #F7C9F3;"
        record.innerText = "Capturar"
        captureImg.style = "background: #F7C9F3;"
      }
    })

})


