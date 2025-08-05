export const url = window.location.hostname === "localhost" ? "http://localhost:8000" : "https://reservation.aimane-web-dev.com/";

export const firstLetterCapital = (text) =>{
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
}