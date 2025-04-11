const express = require('express');
const app = express();
const env = require("dotenv").config();
const port = process.env.PORT;
const database = require("./config/database");
const router =  require("./router/client/index.router");
const routerAdmin = require("./router/admin/index.router")
const bodyParser = require('body-parser');
const systemConfig = require("./config/system");
const methodOverride = require('method-override');

//Hiển thị thông báo khi thực hiện hành động
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(cookieParser("thienle25"));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', `${__dirname}/views`);// truy cập vào folder tên là views. Thư mục chứa các file template
app.set('view engine', 'pug');// loại template engine là: pug
const mongoose = require('mongoose');
mongoose.connect(process.env.Database);

database.connect();
router(app);
routerAdmin(app);


app.use(express.static(`${__dirname}/public`));
app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
});