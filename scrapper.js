const puppeteer = require('puppeteer');

(async function scrape() {
    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();
    await page.goto('https://huggingface.co/spaces/huggingface-projects/llama-2-7b-chat');

    console.log('first step done')
    
    setTimeout(function() {
      // Code to be executed after the 10-second timeout
      console.log("Timeout of 10 seconds has passed.");
    }, 10000); // 10000 milliseconds = 10 seconds
    

    const buttonXPath = "//button[contains(text(), 'Submit')]";
    const buttonId = 'component-7';

    console.log(await page.content())


    try {
      await page.waitForXPath(buttonXPath, { visible: true, timeout: 10000 });
      console.log('Button with innerHTML "Submit" is now in the DOM and visible.');

      
      // You can perform further actions with the button here
      // For example, you can click it:
      // const button = await page.$x(buttonXPath);
      // if (button.length > 0) {
      //   await button[0].click();
      // }
    } catch (error) {
      console.error('Button with innerHTML "Submit" was not found or not visible within the specified timeout.');
    }

    // await page.waitForSelector('#author');
    // await page.select('#author', 'Albert Einstein');

    // await page.waitForSelector('#tag');
    // await page.select('#tag', 'learning');

    // await page.click('.btn');
    // await page.waitForSelector('.quote');

    // extracting information from code
    // let quotes = await page.evaluate(() => {

    //     let quotesElement = document.body.querySelectorAll('.quote');
    //     let quotes = Object.values(quotesElement).map(x => {
    //         return {
    //             author: x.querySelector('.author').textContent ?? null,
    //             quote: x.querySelector('.content').textContent ?? null,
    //             tag: x.querySelector('.tag').textContent ?? null,

    //         }
    //     });

    //     return quotes;

    // });

    // // logging results
    // console.log(quotes);
    // await browser.close();

})();
