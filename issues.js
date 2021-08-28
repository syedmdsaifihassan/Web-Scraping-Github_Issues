const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const path = require('path');
const pdfkit = require("pdfkit");

function getIssuesHtml(url, topic, repoName) {
    request(url, cb);
    function cb(err, response, html){
        if(err){
            console.error(err);
        }else if(response.statusCode === 404){
            console.log("Page Not Found");
        }else{
            // console.log(html);
            getIssues(html);
        }
    }

    function getIssues(html) {
        let $ = cheerio.load(html);
        let issuesElemArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        let issuesArr = [];
        for(let i=0; i< issuesElemArr.length; i++) {
            let issuesLink = $(issuesElemArr[i]).attr("href");
            let fullIssuesLink = `github.com${issuesLink}`;
            issuesArr.push(fullIssuesLink);
        }
        // console.log(topic,"          ",issuesArr);

        // folder path where topics folder is created
        let folderpath = path.join(__dirname,topic);
        dirCreater(folderpath);
        // filePath of the repoName is created
        let filePath = path.join(folderpath, repoName+".pdf");
        // let text = JSON.stringify(issuesArr);
        let pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.font('Courier-Bold')

        let title = "Github_WebScraping by syedmdsaifihassan"
        pdfDoc.fillColor('#333').fontSize(16).text(title)

        let h = 120;
        for(let i=0; i<issuesArr.length; i++){
            let text = JSON.stringify(issuesArr[i]);
            pdfDoc.fillColor('#6e5494').fontSize(12).text(text, 70, h, {align: 'justify'});
            h += 20;
        }
        // pdfDoc.fillColor('#6e5494').fontSize(12).text(text, 70, 100, {align: 'justify'});
        pdfDoc.end();

        // file is created of that repoName
        // fs.writeFileSync(filePath, );
    }
}

module.exports = getIssuesHtml;

function dirCreater(folderpath){
    if(fs.existsSync(folderpath) == false){
        // making folder of topics
        fs.mkdirSync(folderpath);
    }
}