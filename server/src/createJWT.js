const jwt = require('jsonwebtoken');
require('dotenv').config();

function createToken(id, fn, ln, tags) {
    let ret;

    try {
        const expiration = new Date();
        const user = {userId: id, firstName: fn, lastName: ln, tags: tags};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {'expiresIn': '30m'});
        ret = {token: accessToken, userId:id, firstName: fn, lastName: ln, tags: tags};
    } catch (e) {
        ret = {error: "Token error: " + e.toString()};
    }

    return ret;
}

module.exports = {
    createToken: (id, fn, ln, tags) => {
        return createToken(id, fn, ln, tags);
    },
    isExpired: (token) => {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,
            (err, verifiedJwt) => {
                return err;
            });
    },
    refresh: (token) => {
        let ud = jwt.decode(token, {complete: true});
        let userId = ud.payload.userId;
        let firstName = ud.payload.firstName;
        let lastName = ud.payload.lastName;
        let tags = ud.payload.tags;

        return createToken(userId, firstName, lastName, tags);
    }
}