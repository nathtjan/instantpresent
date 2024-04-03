function main() {
    var activePageIndex = 0;
    var fontSize = 50;

    var display = document.getElementById("display");
    var presentation = document.getElementById("presentation");

    function clamp(value, start, end) {
        if (value < start)
            return start;
        if (value > end)
            return end;
        return value;
    }

    function setActivePage(pageIndex) {
        pageIndex = clamp(pageIndex, 0, presentation.children.length - 1);

        // Hide current active page
        presentation.childNodes[activePageIndex].setAttribute("data-show", "0");

        // Show new active page
        presentation.childNodes[pageIndex].setAttribute("data-show", "1");

        activePageIndex = pageIndex;

        updatePageNumber();
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

    function updateFontSize() {
        fontSize = fontSizeInput.value + "px";
        fontSizeValue.textContent = fontSize;

        slides = document.getElementsByClassName("slide");
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.fontSize = fontSize;
        }
    }

    function elementIsInput(element) {
        return element == presentationTextInput || element == fontSizeInput;
    }

    display.addEventListener("fullscreenchange", updateFullscreenIcon);

    var presentationTextInput = document.getElementById("presentationTextInput");
    
    presentationTextInput.addEventListener("change", ()=>updatePresentation(presentationTextInput.value));
    presentationTextInput.addEventListener("keyup", ()=>updatePresentation(presentationTextInput.value));

    var fontSizeInput = document.getElementById("fontSizeInput");
    var fontSizeValue = document.getElementById("fontSizeValue");

    fontSizeInput.addEventListener("input", updateFontSize);
    updateFontSize();

    var fullscreenIcon = document.getElementById("fullscreenIcon");
    fullscreenIcon.addEventListener("click", toggleFullscreenDisplay);

    var prevPageIcon = document.getElementById("prevPageIcon");
    prevPageIcon.addEventListener("click", goToPrevPage);

    var nextPageIcon = document.getElementById("nextPageIcon");
    nextPageIcon.addEventListener("click", goToNextPage);

    var pageNumberInfo = document.getElementById("pageNumberInfo");
    updatePageNumber();

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

window.addEventListener("load", main);