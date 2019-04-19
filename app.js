const app = require('./routes');
const path = require('path')
require('dotenv')
.config({
    path: path.resolve(process.cwd(),'../src/dotenv/.env')
});

app.listen(process.env.PORT_APP, () => console.log("My Pwipper App is running"));