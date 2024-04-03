function onStorageUpdate(storageEvent) {
    if (storageEvent.key != presentationId)
        return;
    loadPresentation(getPresentationData());
}

function getPresentationId() {
    let queryString = window.location.search,
        urlParams = new URLSearchParams(queryString),
        presentationId = urlParams.get("presentationId");
    return presentationId;
}

function getPresentationData() {
    return JSON.parse(localStorage.getItem(getPresentationId()));
}

function loadPresentation(presentationData) {
    if (!presentationData)
        return;
    updatePresentation(presentationData.rawPresentationText);
    setFontSize(presentationData.fontSize);
}

function mainPreview() {
    let presentationData = getPresentationData();
    console.log(presentationData);
    loadPresentation(presentationData);
}

window.addEventListener("storage", onStorageUpdate);
window.addEventListener("load", mainPreview);