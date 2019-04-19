const path = require('path');
const app = require('./config');
require('dotenv')
.config({
    path: path.resolve(process.cwd(),'../environment/.env')
});

app.listen(process.env.PORT_APP, () => console.log("My project running on port 3000 🎧 🥁 🎸 🔊"));
