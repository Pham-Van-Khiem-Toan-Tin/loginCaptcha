const sendToken = (user, status, res) => {
    const token = user.getJWTToken();

    const option = {
        expires: new Date(
            Date.now()  + 3*24*60*60*1000
        ),
        httpOnly: true
    };

    res.status(status).cookie("token", token, option).json({
        success: true,
        user,
        token
    });
};

module.exports = sendToken;