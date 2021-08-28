let url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");

const getReposPagehtml = require("./repoPage");

request(url, cb);

function cb(err, response, html) {
    if(err){
        console.error(err);
    }else if(response.statusCode === 404){
        console.log("Page Not Found");
    }else{
        // console.log(html);
        getTopicsLink(html);
    }
}

function getTopicsLink(html){
    let $ = cheerio.load(html);
    let linkArr = $(".no-underline.d-flex.flex-column.flex-justify-center");

    for(let i=0; i<linkArr.length; i++){
        let links = $(linkArr[i]).attr("href");
        // console.log(links);
        let topicName = links.split("/").pop();
        // console.log(topicName);
        let fullLink = `https://github.com${links}`;
        // console.log(fullLink);

        // Redirecting to -> repoPage.js
        getReposPagehtml(fullLink, topicName);
    }
}