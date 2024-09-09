
// L'adresse du backend local
// const BACKEND = 'http://localhost:8989';
// Le backend est également déployé sur heroku
// Attention : le chargement initial peut être un peu long...
const BACKEND = "http://localhost:3000";

/**
 * Faire un appel AJAX avec l'API fetch
 * Permet de récupérer erreur réseau et erreur de l'API
 * usage :
 * doAjaxRequest(url, options).then(showResult).catch(showError);
 * @param {string} url L'endpoint de l'API
 * @param {object} options Les options de la requête AJAX
 * @returns {Promise} Une promesse qui sera résolue avec le résultat de l'appel AJAX
 * @throws {object} Une exception qui sera levée si l'API a signalé une erreur
 */
async function doAjaxRequest(url, options) {
    // On fait l'appel AJAX
    // On récupère le résultat transmis en format JSON
    // 204 : NO-CONTENT
    // L'API a signalé une erreur, on lève une exception
    // Tout s'est bien passé, on renvoie le résultat
    return await fetch(BACKEND + url, options);
}

export { BACKEND, doAjaxRequest };