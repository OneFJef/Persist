const { User } = require("../models");

const currentUser = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.oidc.user.email,
            }
        })
        req.currentuser = user.get({ plain: true });
        next();
    } catch (err) {
        res.status(400).send();
        console.error(err);

    };

};
        

module.exports = {
    currentUser
}
