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
    updatePresentation(presentationData.rawPresentationText);
    setFontSize(presentationData.fontSize);
}