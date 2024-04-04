broadcastChannel = createBroadcastChannel(getPresentationId());
broadcastChannel.addEventListener("message", (event)=>loadPresentation(event.data))

function getPresentationId() {
    let queryString = window.location.search,
        urlParams = new URLSearchParams(queryString),
        presentationId = urlParams.get("presentationId");
    return presentationId;
}

function loadPresentation(presentationData) {
    if (!presentationData)
        return;
    setPresentation(presentationData.rawPresentationText);
    setFontSize(presentationData.fontSize);
    setBackgroundColor(presentationData.backgroundColor);
    setTextColor(presentationData.textColor);
    console.log(presentationData);
}

window.addEventListener("keydown", (event)=>{
    if (event.key == "ArrowRight") {
        goToNextPage();
    } else if (event.key == "ArrowLeft") {
        goToPrevPage();
    }
});