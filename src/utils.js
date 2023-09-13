export const dateWithoutTime = function(date) {
    return date ? date.split("T")[0] : ""
}

export const normalizeDate = function(date_str) {
    var date = new Date(date_str)
    var options = {
        // weekday: 'long',
        // year: 'numeric',
        // month: 'short',
        // day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        // second: 'numeric',
        hour12: false // Use 12-hour format
    }
    var formattedString = date.toLocaleString(undefined, options)
    return formattedString
}
