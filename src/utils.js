export const dateWithoutTime = function (date) {
    return date ? date.split("T")[0] : ""
}
export const normalizeMsgDate = function (dateStr) {
    var msgDate = new Date(dateStr);
    var now = new Date()

    if (now.toLocaleDateString() === msgDate.toLocaleDateString()) {
        return msgDate.toLocaleTimeString('uz', { "hour12": false, hour: "2-digit", minute: "2-digit" });
    } else {
        const msgDte = msgDate.toLocaleDateString("uz", { day: "2-digit", month: "numeric", year: "numeric" }) + " " + msgDate.toLocaleTimeString('uz', { "hour12": false, hour: "2-digit", minute: "2-digit" })
        return msgDte
    }
};
