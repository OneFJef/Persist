const { User } = require("../models");

const currentUser = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.oidc.name,
            }
        })
        req.currentuser = user.get({ plain: true })
        next()
    } catch (err) {
        res.status(400).send();
        console.error(err);

    };

};

module.exports = {
    currentUser
}
