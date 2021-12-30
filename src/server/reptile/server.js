const http = require('http');

const superagent = require('superagent');
const cheerio = require('cheerio');
const async = require('async');

const url = 'https://read.douban.com/ebooks/?dcs=book-nav&dcm=douban';
let bookUrls = [];
let resArr = [];

function start() {
  function onRequest(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    superagent(url).end((err, resp) => {
      const $ = cheerio.load(resp.text);
      const bookNodes = $('.shadow-cover a')
      for(let i = 0; i < bookNodes.length; i++) {
        const url = bookNodes.eq(i).attr('href');
        bookUrls.push(`https://read.douban.com/${url}`);
      }
      bookUrls = bookUrls.splice(0, 10);
      let count = 0;
      
      function getEachBook(url, callback) {
        const delay = Math.ceil(Math.random() * 5000 + 5000);
        count++;
        console.log(`现在的并发数是${count},正在抓取的是${url},延时是${delay}毫秒`);
        superagent(url).end((err, resp) => {
          const $ = cheerio.load(resp.text);
          const metas = $('.article-meta p');
          const obj = {};
          for(let j = 0; j < metas.length; j++) {
            const label = metas.eq(j).find('.label').text();
            const value = metas.eq(j).find('.labeled-text a').text();
            obj[label] = value;
          }
          resArr.push(obj);
          setTimeout(() => {
            count--;
            callback(null, `${url} call back content`);
          }, delay)
        })
      }
      
      // 使用async.mapLimit控制并发数，
      async.mapLimit(bookUrls, 2, function(url, callback) {
        getEachBook(url, callback);
      }, function(err, result) {
        if(resArr.length === bookUrls.length) {
            resArr = resArr.map(item => JSON.stringify(item))
            res.write(resArr.join('\r\n'));
            res.end()
          }
      })
    })
    
  }
  const server = http.createServer(onRequest);

  server.listen(6000, () => {
    console.log('listening port 6000', new Date().toLocaleString());
  })
}

exports.start = start;