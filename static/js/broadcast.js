function createBroadcastChannel(presentationId) {
    return new BroadcastChannel("presentation-"+presentationId);
}