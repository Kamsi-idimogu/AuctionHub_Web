export const EpochToDateTime = (epoch: number): string => {
    const date = new Date(epoch);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    if (hours < 10) {
        return `0${hours}:${minutes}:${seconds}`;
    }
    if (minutes < 10) {
        return `${hours}:0${minutes}:${seconds}`;
    }
    if (seconds < 10) {
        return `${hours}:${minutes}:0${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
};
