//Thêm mogoose vào dự án
const mongoose = require("mongoose");

//Kết nối database ra bên ngoài
module.exports.connect = async () =>{
    try {
        await mongoose.connect(process.env.Database);
        console.log("connect Success");
        console.log(process.env.Database);
    } catch (error) {
        console.log("Error")
    }
}