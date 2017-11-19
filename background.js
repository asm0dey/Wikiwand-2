var pattern = "*://*.wikipedia.org/wiki/*"
var regex = /^https?:\/\/(.*)\.wikipedia\.org\/wiki\/(.+)(?!oldformat=true)$/gm

function redirect(requestDetails) {
    var defaultRedirect = {

    }
    if (requestDetails.url.endsWith("?oldformat=true")) return defaultRedirect
    var matches = regex.exec(requestDetails.url)
    if (matches[1].startsWith("Talk:")) return defaultRedirect
    var wikiwandUrl = "https://wikiwand.com/" + matches[1] + "/" + matches[2]
    return {
        redirectUrl: wikiwandUrl
    }
}

browser.webRequest.onBeforeRequest.addListener(
    redirect, { urls: [pattern], types: ["main_frame"] }, ["blocking"]
)