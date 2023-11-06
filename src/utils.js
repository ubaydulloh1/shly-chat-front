export const dateWithoutTime = function(date) {
    return date ? date.split("T")[0] : ""
}
export const normalizeDate = function(date_str) {
    if (!date_str){
        return "recently";
    }

    var date = new Date(date_str);
    var currentDate = new Date(); // Get the current date and time

    // Calculate the difference in milliseconds between the current date and the input date
    var timeDifference = currentDate.getTime() - date.getTime();

    var options = {
        hour: 'numeric',
        minute: 'numeric',
        // second: 'numeric',
        hour12: false // Use 24-hour format
    };

    if (timeDifference < 24 * 60 * 60 * 1000) { // If the time difference is less than 1 day (in milliseconds)
        return date.toLocaleDateString(undefined, options); // Show the date with hour, minute, and second
    } else {
        options = {
            hour: 'numeric',
            minute: 'numeric',
            // second: 'numeric',
            day: '2-digit',
            month: 'numeric',
            year: 'numeric',
            hour12: false // Use 24-hour format
        };
        return date.toLocaleString(undefined, options); // Show the date and time with the specified format
    }
};