var path = require('path');

module.exports = {
  //...
  devServer: {
    host: '0.0.0.0',
    port: 1994,
    contentBase: path.join(__dirname, 'dist'),
  }
};

