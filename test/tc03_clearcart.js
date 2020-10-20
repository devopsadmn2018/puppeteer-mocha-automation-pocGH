'use strict'
const assert = require("assert");
const browser = require('../objects/initialise');
const homepage = require('../objects/homepageobjects');
const searchpage = require('../objects/searchoperations');

let page

describe("end-to-end product order...", async () => {
  it("orders a product, verifies the cart and clears cart for next execution", async () => {
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
            await searchpage.clearCart();
          } else {
            console.log( "no search results found... search something else...")
          }
        }
    catch {}
    browser.close();
  }).timeout(600000)
})
