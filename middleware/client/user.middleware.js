const User = require("../../model/user.model");

module.exports.user = async (req, res, next) =>{
    if(req.cookies.tokenUser){
        const inforUser = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            deleted: false,
            status: "active"
        }).select("-password -tokenUser");

        if(inforUser){
            res.locals.user = inforUser;
        }
    }
    next();
}

