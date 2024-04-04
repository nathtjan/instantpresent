function mainInputs() {
    function sendPresentationData() {
        broadcastChannel.postMessage(getPresentationData());
    }

    function getPresentationData() {
        return {
            "rawPresentationText": rawPresentationText,
            "fontSize": fontSize,
            "backgroundColor": backgroundColor,
            "textColor": textColor
        };
    }

    function updateFontSize() {
        fontSizeValue.textContent = fontSizeInput.value + "px";
        setFontSize(fontSizeInput.value + "px");
        sendPresentationData();
    }

    function updateBackgroundColor() {
        setBackgroundColor(backgroundColorPicker.value);
        sendPresentationData();
    }

    function updateTextColor() {
        setTextColor(textColorPicker.value);
        sendPresentationData();
    }

    function updatePresentation() {
        setPresentation(presentationTextInput.value);
        sendPresentationData();
    }

    function openPreviewWindow() {
        let url = "/preview.html?presentationId=" + presentationId;
        windowProxy = window.open(url, "_blank", "menubar=false,location=false");
        windowProxy.window.addEventListener("load", sendPresentationData);
    }

    function elementIsInput(element) {
        return inputElements.some(inputElement=>element==inputElement);
    }

    var presentationTextInput = document.getElementById("presentationTextInput");
    presentationTextInput.addEventListener("change", updatePresentation);
    presentationTextInput.addEventListener("keyup", updatePresentation);

    var fontSizeInput = document.getElementById("fontSizeInput");
    fontSizeInput.addEventListener("input", updateFontSize);
    updateFontSize();
    
    var backgroundColorPicker = document.getElementById("backgroundColorPicker");
    backgroundColorPicker.addEventListener("change", updateBackgroundColor);
    backgroundColorPicker.addEventListener("input", updateBackgroundColor);
    updateBackgroundColor();
    
    var textColorPicker = document.getElementById("textColorPicker");
    textColorPicker.addEventListener("change", updateTextColor);
    textColorPicker.addEventListener("input", updateTextColor);
    updateTextColor();
    
    var previewWindowButton = document.getElementById("previewWindowButton");
    previewWindowButton.addEventListener("click", openPreviewWindow);

    var inputElements = [
        presentationTextInput,
        fontSizeInput,
        backgroundColorPicker,
        textColorPicker,
        previewWindowButton
    ];

    window.addEventListener("keydown", (event)=>{
        if (elementIsInput(event.target)) {
            return;
        }

        if (event.key == "ArrowRight") {
            goToNextPage();
        } else if (event.key == "ArrowLeft") {
            goToPrevPage();
        }
    });
}

window.addEventListener("load", mainInputs);