const cheerio = require('cheerio');
/* module file system (fs) */
const fs = require('fs');
const request = require('request');

let pathUrl = "https://www.themoviedb.org/";
/* array images */
let images = [];

request('https://www.themoviedb.org/movie?language=es-MX', (err, res, body) => {
    if(!err && res.statusCode == 200){
        let $ = cheerio.load(body);

        $('a.image', '#media_results').each(function(){
            var linksToMovie = $(this).attr('href');
            console.log(linksToMovie);
        });

        $('a.image > img', '#media_results').each(function(){
            var imgMovie = $(this).attr('src');
            console.log(imgMovie);
            if(imgMovie.indexOf('t/p/w220_and_h330_face') != -1){
                images.push(`${pathUrl}`+imgMovie);
            }
        });
    }

    for (let index = 0; index < images.length; index++) {
        const element = images[index];
        console.log(element);
        request(images[index]).pipe(fs.createWriteStream('data/img/'+index+'.jpg'));
    }
})
