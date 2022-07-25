// need to implement storeToken and retrieveToken methods in frontend
export function storeToken(token) {
    try {
        localStorage.setItem("token_data", token);
    } catch (e) {
        console.log(e.message);
    }
}

export function retrieveToken() {
    let ud;
    try {
        ud = localStorage.getItem("token_data");
    } catch (e) {
        console.log(e.message);
    }
    return ud;
}
