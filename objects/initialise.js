
const puppeteer = require('puppeteer');

let browserops = {}; //store some global's.
let browser;
let sleep;

before(() => {
    console.log('browserops BEFORE...');
  });
  
after(() => {
console.log('browserops AFTER...');
});

browserops.init = async function (url) {      
    // #region get-browser-&-navigate   .......................
    browser = await puppeteer.launch({ headless: false })

    page = await browser.newPage()
    page.setViewport({ "width": 1024,  "height": 768 })
    await page.goto(url, { waitUntil: "load", timeout: 30000 }); 
    console.log("browse home page: done")
    // #endregion get-browser-&-navigate   ....................... 
    return page;
}
 
browserops.close = async function () {      
    browser.close()
}

browserops.sleep = async function () {
    sleep = duration => new Promise(resolve => setTimeout(resolve, duration));
    return sleep;
}



module.exports = browserops;