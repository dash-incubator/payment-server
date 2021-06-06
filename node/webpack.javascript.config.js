let glob = require('glob'),
    path = require('path'),
    public = {
        js: path.resolve(__dirname, './public/js')
    };

module.exports = {
    entry: {
        'app': glob.sync('./resources/!(node_modules)/**/!(webpack)*.js')
    },
    mode: 'development',
    output: {
        path: public.js,
    }
};
