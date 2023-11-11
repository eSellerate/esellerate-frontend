const extractCookie = (cookieName) => {
    const cookie = document.cookie
        .split(';')
        .find((cookie) => cookie.includes(cookieName))
    if (cookie) {
        return cookie.split('=')[1]
    }
    return null
}

export default extractCookie