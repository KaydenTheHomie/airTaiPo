const request = require('request');
const cheerio = require('cheerio');

const fetchAqhi = function() {
  let aqhi = null;
  let options = {
    uri: 'http://www.aqhi.gov.hk/tc.html',
    transform: function(body) {
      return cheerio.load(body);
    }
  };
  return new Promise((res, rej) => {
    request(options, (error, response, body) => {
      const $ = cheerio.load(body);
      if (!error && response.statusCode == 200) {
        aqhi = $('.tblCurrAQHI_tr_15_0 > .tblCurrAQHI_tdBand')
          .text()
          .charAt(6);
        res(aqhi);
      }
    });
  });
};

const fetchTemp = function() {
  let temp = null;
  let options = {
    uri: 'https://rss.weather.gov.hk/rss/CurrentWeather_uc.xml',
    transform: function(body) {
      return cheerio.load(body);
    }
  };
  return new Promise((res, rej) => {
    request(options, (error, response, body) => {
      const $ = cheerio.load(body);
      if (!error && response.statusCode == 200) {
        // temp = $('tbody > tr:nth-child(6) > td:nth-child(2)').text();
        temp = $('font > table > tbody > tr:nth-child(6) > td:nth-child(2)').text().slice(0, 2);
        res(temp);
      }
    });
  });
};

const fetchWarn = function() {
  let warn = null;
  let options = {
    uri: 'https://rss.weather.gov.hk/rss/CurrentWeather_uc.xml',
    transform: function(body) {
      return cheerio.load(body);
    }
  };
  return new Promise((res, rej) => {
    request(options, (error, response, body) => {
      const $ = cheerio.load(body);
      if (!error && response.statusCode == 200) {
        warn = $('#warning_message').text();
        res(warn);
      }
    });
  });
};
exports.fetchTemp = fetchTemp;
exports.fetchAQHI = fetchAqhi;
exports.fetchWarn = fetchWarn;