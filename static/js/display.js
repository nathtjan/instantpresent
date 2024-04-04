let activePageIndex,
    rawPresentationText,
    fontSize,
    backgroundColor,
    textColor,
    display,
    presentation,
    presentationId,
    fontSizeValue,
    fullscreenIcon,
    prevPageIcon,
    nextPageIcon,
    pageNumberInfo, 
    broadcastChannel;


function mainDisplay() {
    activePageIndex = 0;

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
    setBackgroundColor(backgroundColor);
    setTextColor(textColor);
}

function setPresentation(newText, sep="\n\n") {
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

function setFontSize(_fontSize) {
    slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.fontSize = _fontSize;
    }
    fontSize = _fontSize;
}

function setBackgroundColor(_backgroundColor) {
    display.style.backgroundColor = _backgroundColor;
    backgroundColor = _backgroundColor
}

function setTextColor(_textColor) {
    display.style.color = _textColor;
    textColor = _textColor;
}

window.addEventListener("load", mainDisplay);