const express = require('express');
const app = express();
const path = require("path");
require("dotenv").config();
const port = process.env.PORT;
const database = require("./config/database");
const router = require("./router/client/index.router");
const routerAdmin = require("./router/admin/index.router");
const bodyParser = require('body-parser');
const systemConfig = require("./config/system");
const methodOverride = require('method-override');
const moment = require('moment');

//Thông báo, session, cookie
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(cookieParser("thienle25"));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

//Biến toàn cục 
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// 🔥 Kết nối database
database.connect();

// Router
router(app);
routerAdmin(app);

// Static files
app.use(express.static(`${__dirname}/public`));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.listen(port, () => {
  console.log(`🚀 Server chạy ở http://localhost:${port}`);
});
