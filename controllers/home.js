const scraping = require('../util/scraping');

exports.renderHome = (req, res, next) => {
  Promise.all([
    scraping.fetchAQHI(),
    scraping.fetchTemp(),
    scraping.fetchWarn(),
  ]).then(function(values) {
    console.log(values);

    res.render('home', {
      aqhi: values[0],
      temp: values[1],
      warn: values[2],
      path: '/'
    });
  });
};
