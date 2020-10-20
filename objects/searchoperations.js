const browserops = require('./initialise');
//const puppeteer = require('puppeteer');
const { objectselectors } = require('./objectselectors');

before(() => {
  console.log('searchpage level');
});

let searchpage = {}; 

searchpage.searchProduct = async function (searchtext) {      
      // #region Search-Product   ....................... 
        //Search for product
        search_field = await page.$$(objectselectors.searchproductfield);        
        await search_field[0].click()
        await page.keyboard.type(searchtext, { delay: 450 })
        search = await page.$$(objectselectors.searchproducticon)               
        await search[0].click()

        await page.waitForSelector(objectselectors.searchresults);               
        const ele1 = await page.$(objectselectors.searchresults);               
        const searchresults =  await page.evaluate(ele1 => ele1.textContent, ele1);
        console.log('searchresults: ' + searchresults)
        return searchresults;
      // #endregion Search-Product   ....................... 
}

searchpage.addForDelivery = async function () {     
      //Select a product
      let selectproduct = await page.$$(objectselectors.selectsearchedproduct);        
      await selectproduct[0].click();
      // #region Add-for-Delivery   ....................... 
      const sleep = duration => new Promise(resolve => setTimeout(resolve, duration));
      await sleep(10000);
      let adddelivery = await page.$$(objectselectors.markaddfordelivery);            
      await adddelivery[0].click();
      //search for postcode and add for delivery
      try {
        await page.waitForSelector(objectselectors.markaddfordeliverypostcode, { timeout: 5000 });            
          searchpost = await page.$$(objectselectors.markaddfordeliverypostcode);
          await searchpost[0].click();
          await page.keyboard.type("4000", { delay: 450 });
          //await page.keyboard.press("Tab");
          //await page.keyboard.press("Enter");
          let adddelivery1 = await page.$$(objectselectors.markaddfordeliveryonpostcode);                 
          await adddelivery1[0].click();
      } catch (error) {
        console.log("addToDelivery 'postcode submission' element didn't appear.");
      }
  // #endregion Add-for-Delivery   .......................
}

searchpage.viewCart = async function () {      
      // #region View-Cart   ....................... 
          let viewcart = await page.$$(objectselectors.viewcart);              
          await viewcart[0].click();
      // #endregion View-Cart   ....................... 
}
searchpage.verifyQtyinCart = async function () {      
  // #region View-Cart   ....................... 
      //verify product exit in cart
      try {await page.waitForSelector(objectselectors.qty, { timeout: 20000 });  console.log("quantity verified in cart.") } 
      catch (error) { console.log("The product didn't appear in cart."); }
  // #endregion View-Cart   ....................... 
}
 
searchpage.clearCart = async function () {      
      // #region Clear-Cart   ....................... 
          //clear cart    
          let removefromcart = await page.$$(objectselectors.removelink);        
          await removefromcart[0].click();
          let removesure = await page.$$(objectselectors.removesure)               
          await removesure[0].click();
          //verify      empty-basket_title
          const sleep = duration => new Promise(resolve => setTimeout(resolve, duration));
          await sleep(5000);
          let issuccess = [];
          await page.$eval(objectselectors.emptybasket, function(heading) { 
            return heading.innerText; }).then(function(result) {
            console.log(result); 
            if (result === 'Your cart is empty') { console.log("'Your cart is empty' string is verified...")
              issuccess = true;  }
          });
        // #endregion Clear-Cart   ....................... 
}




module.exports = searchpage;