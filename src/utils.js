export const dateWithoutTime = function (date) {
    return date ? date.split("T")[0] : ""
}
export const normalizeMsgDate = function (dateStr) {
    var msgDate = new Date(dateStr);
    var now = new Date()

    const diffMsgDateMilliseconds = now - msgDate
    const millisecondsInADay = 24 * 60 * 60 * 1000;

    if (diffMsgDateMilliseconds >= millisecondsInADay) {
        const msgDte = now.toLocaleDateString("uz", { year: "numeric", month: "numeric", day: "2-digit" }) + " " + msgDate.toLocaleTimeString('uz', { "hour12": false, hour: "2-digit", minute: "2-digit" })
        return msgDte
    } else {
        return msgDate.toLocaleTimeString('uz', { "hour12": false, hour: "2-digit", minute: "2-digit" });
    }
};
