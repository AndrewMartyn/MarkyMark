const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    createAccessToken: (userId, email, firstName, lastName, tags) => {
        const user = {
            userId: userId,
            email: email,
            firstName: firstName,
            lastName: lastName,
            tags: tags,
        };
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "20s",
        });
    },
    createRefreshToken: (userId) => {
        const user = {
            userId: userId,
        };
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1d",
        });
    },
    authenticateToken: (accessToken) => {
        let ret;
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            ret = { user: user, error: "" };

            if (err) ret = { error: "Invalid access token" };
        });
        return ret;
    },
    refresh: (refreshToken, accessToken) => {
        jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
            const decoded = jwt.decode(accessToken, { complete: true });
            console.log(decoded);
            let newAccessToken = jwt.sign(
                {
                    userId: decoded.payload.userId,
                    email: decoded.payload.email,
                    firstName: decoded.payload.firstName,
                    lastName: decoded.payload.lastName,
                    tags: decoded.payload.tags,
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "20s" }
            );

            ret = { accessToken: newAccessToken, error: "" };
            console.log(err);
            if (err) ret = { error: "Invalid refresh token" };
        });

        return ret;
    },
};
