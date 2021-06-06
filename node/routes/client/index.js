const path = require('path');
const root = path.dirname(require.main.filename);


module.exports = function(app) {
    app.get('/', async (req, res) => {
        res.status(200).sendFile( path.join(root + '/public/index.html') );
    });
};
