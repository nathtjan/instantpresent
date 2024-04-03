let activePageIndex,
    rawPresentationText,
    fontSize,
    display,
    presentation,
    presentationId,
    fontSizeInput,
    fontSizeValue,
    fullscreenIcon,
    prevPageIcon,
    nextPageIcon,
    pageNumberInfo, 
    broadcastChannel;


function mainDisplay() {
    activePageIndex = 0;
    fontSize = 50;

    display = document.getElementById("display");
    presentation = document.getElementById("presentation");

    presentationId = generatePresentationId();

    fontSizeInput = document.getElementById("fontSizeInput");
    fontSizeValue = document.getElementById("fontSizeValue");

    fullscreenIcon = document.getElementById("fullscreenIcon");
    fullscreenIcon.addEventListener("click", toggleFullscreenDisplay);

    prevPageIcon = document.getElementById("prevPageIcon");
    prevPageIcon.addEventListener("click", goToPrevPage);

    nextPageIcon = document.getElementById("nextPageIcon");
    nextPageIcon.addEventListener("click", goToNextPage);    

    pageNumberInfo = document.getElementById("pageNumberInfo");

    broadcastChannel = createBroadcastChannel(presentationId);

    display.addEventListener("fullscreenchange", updateFullscreenIcon);

    updatePageNumber();
    setFontSize(fontSize);
}

function updateStorage() {
    broadcastChannel.postMessage({
        "rawPresentationText": rawPresentationText,
        "fontSize": fontSize
    });
}

function updatePresentation(newText, sep="\n\n") {
    presentation.replaceChildren();
    slideTexts = newText.split(sep);
    slideTexts.forEach((text, pageIndex) => {
        slide = document.createElement("div");
        slide.setAttribute("class", "slide");
        slide.setAttribute("data-page", pageIndex);
        slide.setAttribute("data-show", "0");
        slide.style.fontSize = fontSize;
        slide.textContent = text;
        presentation.appendChild(slide);
    });
    setActivePage(activePageIndex);
    rawPresentationText = newText;
}

function getPresentationData() {
    return {
        "rawPresentationText": rawPresentationText,
        "fontSize": fontSize
    };
}

function sendPresentationData() {
    broadcastChannel.postMessage(getPresentationData());
}


function setActivePage(pageIndex) {
    pageIndex = clamp(pageIndex, 0, presentation.children.length - 1);

    if (presentation.children?.length) {
        // Hide current active page
        presentation.childNodes[activePageIndex].setAttribute("data-show", "0");

        // Show new active page
        presentation.childNodes[pageIndex].setAttribute("data-show", "1");
    }

    activePageIndex = pageIndex;

    updatePageNumber();
}

function goToPrevPage() {
    setActivePage(activePageIndex-1);
}

function goToNextPage() {
    setActivePage(activePageIndex+1);
}

function updatePageNumber() {
    if (presentation.children.length == 0) {
        pageNumberInfo.textContent = "";
    } else {
        pageNumberInfo.textContent = (activePageIndex + 1) + "/" + presentation.children.length
    }
}

function isFullscreen() {
    return document.fullscreenElement;
}

function enterFullscreenDisplay() {
    display.requestFullscreen();
}

function exitFullscreenDisplay() {
    document.exitFullscreen();
}

function toggleFullscreenDisplay() {
    if (isFullscreen()) {
        exitFullscreenDisplay();
    } else {
        enterFullscreenDisplay();
    }
}

function updateFullscreenIcon() {
    if (isFullscreen()) {
        fullscreenIcon.setAttribute("class", "fa fa-compress");
    } else {
        fullscreenIcon.setAttribute("class", "fa fa-expand");
    }
}

function setFontSize(fontSize) {
    slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.fontSize = fontSize;
    }
}

function elementIsInput(element) {
    return element == presentationTextInput || element == fontSizeInput;
}

window.addEventListener("load", mainDisplay);