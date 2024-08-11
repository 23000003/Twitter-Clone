import { format, formatDistanceToNow, differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';

export function ConvertDate(date) {
    let timestampDate;

    // Attempt to parse the ISO date string
    try {
        timestampDate = new Date(date);
        if (isNaN(timestampDate)) throw new Error("Invalid date"); 
    } catch (error) {
        console.error("Invalid date format:", date);
        return "Invalid date";
    }

    const now = new Date();
    const minutes = differenceInMinutes(now, timestampDate);
    const hours = differenceInHours(now, timestampDate);
    const days = differenceInDays(now, timestampDate);

    let elapsed;

    if (minutes < 60) {
        elapsed = `${minutes}m ago`;
    } else if (hours < 24) {
        elapsed = `${hours}h ago`;
    } else if (days < 30) {
        elapsed = `${days}d ago`;
    } else {
        elapsed = format(timestampDate, 'MMM d'); // e.g., Aug 1
    }

    return elapsed;
}

export function ConvertToPostDate(date) {
    let timestampDate;

    try {
        timestampDate = new Date(date);
        if (isNaN(timestampDate)) throw new Error("Invalid date"); 
    } catch (error) {
        console.error("Invalid date format:", date);
        return "Invalid date";
    }

    const formattedDate = format(timestampDate, `h:mm a • MMMM d, yyyy`);

    return formattedDate;
}
