const setting = require("../../model/setting-general.model");

module.exports.general = async (req, res, next)=>{
    const settinggeneral = await setting.findOne();

    res.locals.general = settinggeneral;
    next();
}