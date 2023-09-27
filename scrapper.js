const puppeteer = require('puppeteer');

(async function scrape() {
    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();
    //await page.goto('https://huggingface.co/spaces/huggingface-projects/llama-2-7b-chat');

    await page.goto('https://huggingface-projects-llama-2-7b-chat.hf.space/?__theme=light')
    console.log('first step done')
    
    setTimeout(function() {
      // Code to be executed after the 10-second timeout
      //console.log("Timeout of 10 seconds has passed.");
    }, 10000); // 10000 milliseconds = 10 seconds
    

    const buttonXPath = "//button[contains(text(), 'Submit')]";
    const buttonId = 'component-7';

    //console.log(await page.content())


    try {
      //await page.waitForXPath(buttonXPath, { visible: true, timeout: 10000 });
      //console.log('Button with innerHTML "Submit" is now in the DOM and visible.');

      const textarea = await page.waitForSelector('textarea[data-testid="textbox"]', { visible: true });
      console.log("Text area found");
  
      await textarea.type('how do i generate best prompt for LLama.  what is the format to use for LLama prompt?');
      console.log("Message typed");

  
      // Find the submit button by innerHTML
      // Wait for the submit button and click it

      await page.waitForSelector('#component-7', { visible: true });
      await page.click('#component-7');
      // const submitButtonSelector = 'button:has-text("Submit")';
      // await page.waitForSelector(submitButtonSelector, { visible: true });
      // const submitButton = await page.$(submitButtonSelector);
      // console.log("submit button found")


      if (submitButton) {
        await submitButton.click();
        console.log("Submit button clicked");
      } else {
        console.error("Submit button not found.");
      }
      const pageHTML = await page.content();
      console.log(pageHTML);
    
    // Wait for the specific bot message to appear
    // Wait for the specific bot message to appear
      const botMessageSelector = '.message-wrap .message.bot.latest';
      console.log('Waiting for bot message...');
      await page.waitForSelector(botMessageSelector, { visible: true });
      console.log('Bot message found.');

      // Extract and log the text content of the bot message
      const botMessage = await page.$(botMessageSelector);
      const messageText = await botMessage.evaluate(node => node.textContent);
      console.log('Bot Message:', messageText);

      // You can add your logic here to process the message as needed
      // You can perform further actions with the button here
      // For example, you can click it:
      // const button = await page.$x(buttonXPath);
      // if (button.length > 0) {
      //   await button[0].click();
      // }
    } catch (error) {
      console.error('Button with innerHTML "Submit" was not found or not visible within the specified timeout.');
    }

  
    // await browser.close();

})();
