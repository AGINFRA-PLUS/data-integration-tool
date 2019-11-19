const getMainState = store => store.main;
const getMainStateObject = object => store => (getMainState(store) ? getMainState(store)[object] : null);
const getCommunity = store => (getMainState(store) ? getMainState(store).community : null);
const getTheme = store => (getMainState(store) ? getMainState(store).theme : null);
const getUploadType = store => (getMainState(store) ? getMainState(store).type : null);
const getUploadObjects = store => (getMainState(store) ? getMainState(store).objects : null);
const getUploadStream = store => (getMainState(store) ? getMainState(store).stream : null);
const getUploadMappings = store => (getMainState(store) ? getMainState(store).mappings : null);
const getUploadMetadata = store => (getMainState(store) ? getMainState(store).metadata : null);
const getJsonForServer = store => ({
    mappings: getUploadMappings(store),
    metadata: getUploadMetadata(store),
    type: getUploadType(store),
    objects: getUploadObjects(store),
    stream: getUploadStream(store),
    community: getCommunity(store),
});
export { getMainState, getCommunity, getTheme, getMainStateObject, getUploadType, getUploadObjects, getUploadStream, getUploadMappings, getUploadMetadata, getJsonForServer };
