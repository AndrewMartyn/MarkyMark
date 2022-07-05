// need to implement storeToken and retrieveToken methods in frontend
module.exports = {
    storeToken: (tok) => {
        try {
            localStorage.setItem('token_data', tok.accessToken);
        }
        catch (e) {
            console.log(e.message);
        }
    },
    retrieveToken: () => {
        let ud;
        try {
            ud = localStorage.getItem(('token_data'));
        }
        catch (e) {
            console.log(e.message);
        }
        return ud;
    }
}