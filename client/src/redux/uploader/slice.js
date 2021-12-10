export default function uploaderVisibility(uploaderIsVisible=null, action) {
    if(action.type == "uploader/receivedUploaderVisibility") {
        uploaderIsVisible = !action.payload.uploaderIsVisible;
    }
    return uploaderIsVisible;
}

export function receivedUploaderVisibility(uploaderIsVisible) {
    return {
        type: "uploader/receivedUploaderVisibility",
        payload: {uploaderIsVisible}
    };
}