export default function guid() {
    return Math.random()
        .toString(36)
        .substr(2, 9);
}