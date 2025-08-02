import { format } from "date-fns";

// Format time using date-fns
export const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm a");
};