const cheerio = require('cheerio');
const request = require('request');
const getIssuesHtml = require("./issues");

function getReposPagehtml(url, topic) {
    request(url, cb);
    function cb(err, response, html){
        if(err){
            console.error(err);
        }else if(response.statusCode === 404){
            console.log("Page Not Found");
        }else{
            // console.log(html);
            getReposLink(html);
        }
    }

    function getReposLink(html){
        // cheerio
        let $ = cheerio.load(html);
        let headingArr = $(".f3.color-text-secondary.text-normal.lh-condensed");
        console.log("---"+topic+"---")
        for(let i=0; i<8; i++){
            let twoAnchors = $(headingArr[i]).find("a");
            let link = $(twoAnchors[1]).attr("href");
            console.log(link);

            // Issues page Link
            let fullLink = `https://github.com${link}/issues`;
            let repoName = link.split("/").pop();

            // Redirecting to -> issues.js
            getIssuesHtml(fullLink, topic, repoName);
        }
        console.log("---------------------");
    }
}

module.exports = getReposPagehtml;