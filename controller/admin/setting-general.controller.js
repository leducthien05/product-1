const General = require("../../model/setting-general.model");

module.exports.general = async (req, res)=>{
    const settingGeneral = await General.findOne();
    res.render("admin/pages/setting/general", {
        titlePage: "Cài đặt chung",
        settingGeneral: settingGeneral
    });
}

module.exports.generalPatch = async (req, res)=>{
    const record = await General.findOne();
    if(record){
        await General.updateOne({
            _id: record._id
        }, req.body)
    }else{
        const general = new General(req.body);
        general.save();
    }

    res.redirect("back");
}