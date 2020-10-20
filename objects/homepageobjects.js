//const puppeteer = require('puppeteer');
const { objectselectors } = require('./objectselectors');

let homepage = {}; //store some global's.

before(() => {
  console.log('homepage BEFORE...');
});

before(() => {
  console.log('homepage AFTER...');
});

homepage.getCurrentStore = async function () {      
      // get current store
      const element = await page.$(objectselectors.selectedStore)   
      const store =  await page.evaluate(element => element.textContent, element);
      console.log("getCurrentStore: " + store)
    return store;
}

homepage.ChangeStore = async function () {      
      ////click 'Change Store'
      let search = await page.$(objectselectors.changeStore)           
      await page.evaluate(async() => { await new Promise(function(resolve) { setTimeout(resolve, 3000) }); });
      await search.click()
      console.log("'Change-Store' Click: done")
}

homepage.SelectStoreByPostCode = async function (postcode) {      
    //// select 'search by postcode'
    let search_field = await page.$$(objectselectors.storeLocator) ;         
    await search_field[0].click();
    await page.keyboard.type(postcode, { delay: 450 });
    await page.waitForSelector(objectselectors.storeLocatorLink, { visible: true })     
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    let submit = await page.$(objectselectors.storeLocatorLink)
    await submit.click()
    console.log("Search by Postcode: "+ postcode + " done")
    ////select 'Set as my store'
    //await page.waitForSelector(".set-store-btn", { visible: true }) 
    await page.evaluate(async() => { await new Promise(function(resolve) { setTimeout(resolve, 3000) }); });
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
        //let setStore = await page.$("//button['@class=header-store-locator_card_button-area_primary-button']")
        //await setStore.click()
    console.log("Store Selection: done")
}

homepage.validateStoreSelection = async function (storebefore,storeafter) {      
if (storebefore !== storeafter) {
    console.log( "New store selected...");
    return true;
  } else {
    console.log( "ERROR in store selection...");
    return false;
  }
}


module.exports = homepage;