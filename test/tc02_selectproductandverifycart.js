'use strict'
const assert = require("assert");
const browser = require('../objects/initialise');
const homepage = require('../objects/homepageobjects');
const searchpage = require('../objects/searchoperations');

let page

describe("order product for delivery...", async () => {
  it("orders a product and verifies the cart", async () => {
        page = await browser.init('https://www.bunnings.com.au/');
    
        try{
            const storebefore = await homepage.getCurrentStore();
            await homepage.ChangeStore();
            await homepage.SelectStoreByPostCode('4000');
            await page.waitFor(10000)
            const storeafter = await homepage.getCurrentStore();
            await homepage.validateStoreSelection(storebefore, storeafter);
            let searchresults=await searchpage.searchProduct("shovel");
            if ((searchresults.split(" "))[0] > 0 ) {
                await searchpage.addForDelivery();
                await searchpage.viewCart();
                await searchpage.verifyQtyinCart();
              } else {
                console.log( "no search results found... search something else...")
              }
            }
        catch {}
        browser.close();
  }).timeout(600000)
})
 