class TimeUtils {

    toLocalISOString(date) {
        function pad(number) {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        }

        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds()) +
            '.' + (date.getMilliseconds() / 1000).toFixed(3).slice(2, 5) +
            'Z';
    }

    toDisplayString(JavaCalendarString) {
        return new Intl.DateTimeFormat(
            "en-US", {
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        }
        ).format(new Date(JavaCalendarString));
    }

}

export default new TimeUtils();