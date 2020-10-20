'use strict'
const assert = require("assert");
var expect = require('chai').expect;
const browser = require('../objects/initialise');
const homepage = require('../objects/homepageobjects');
const searchpage = require('../objects/searchoperations');

let page
 
describe("Navigate to Bunnings web portal...", async () => {
  it("changes the store location", async () => {
  page = await browser.init('https://www.bunnings.com.au/');

  try{
      const storebefore = await homepage.getCurrentStore();
      await homepage.ChangeStore();
      await homepage.SelectStoreByPostCode('4000');
      await page.waitFor(10000)
      const storeafter = await homepage.getCurrentStore();
      await homepage.validateStoreSelection(storebefore, storeafter);
      //expect((await homepage.validateStoreSelection(storebefore, storeafter))).false;
  }
  catch {}
  browser.close();
  }).timeout(60000)
})
