function mainInputs() {
    function updateFontSize() {
        fontSize = fontSizeInput.value + "px";
        fontSizeValue.textContent = fontSize;
        setFontSize(fontSize);
        sendPresentationData();
    }

    function openPreviewWindow() {
        let url = "/preview.html?presentationId=" + presentationId;
        windowProxy = window.open(url, "_blank", "menubar=false,location=false");
        windowProxy.window.addEventListener("load", sendPresentationData);
    }

    var presentationTextInput = document.getElementById("presentationTextInput");
    
    presentationTextInput.addEventListener("change", ()=>{updatePresentation(presentationTextInput.value); updateStorage();});
    presentationTextInput.addEventListener("keyup", ()=>{updatePresentation(presentationTextInput.value); updateStorage();});

    fontSizeInput.addEventListener("input", updateFontSize);

    var previewWindowButton = document.getElementById("previewWindowButton");
    previewWindowButton.addEventListener("click", openPreviewWindow);

    window.addEventListener("keydown", (event)=>{
        if (elementIsInput(event.target))
            return;
        if (event.key == "ArrowRight") {
            goToNextPage();
        } else if (event.key == "ArrowLeft") {
            goToPrevPage();
        }
    })
}

window.addEventListener("load", mainInputs);