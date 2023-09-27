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
  
      await textarea.type('how do i generate best prompt for LLama.  what is the format to use for LLama prompt?  I am particularly strugging with prompt format');
      console.log("Message typed");

      // Wait for the submit button and click it
      const submitButtonSelector = '#component-7';
      await page.waitForSelector(submitButtonSelector, { visible: true });
      await page.click(submitButtonSelector);

      console.log("Submit button clicked");  

          // initial Wait for 10 seconds (adjust the duration as needed)
      await page.evaluate(() => {
        return new Promise(resolve => {
          setTimeout(resolve, 10000); // 10000 milliseconds = 10 seconds
        });
      });

      const botMessageSelector = '.message-wrap .message.bot.latest';
      let lastMessageText = '';

      // Function to periodically check for updates and collect the message
      async function checkAndUpdateMessage() {
        while (true) {
          // Wait for 5 seconds before checking for updates (adjust as needed)
          await page.evaluate(() => {
            return new Promise(resolve => {
              setTimeout(resolve, 5000); // 10000 milliseconds = 10 seconds
            });
          });

          // Check the current message text
          const botMessage = await page.$(botMessageSelector);
          const messageText = await botMessage.evaluate(node => node.textContent);

          if (messageText === lastMessageText) {
            // Message has not been updated, assume it has stopped
            console.log('Message has stopped updating. Collecting message...');
            console.log('Bot Message:', messageText);
            break;
          }

          // Update the last known message text
          lastMessageText = messageText;
        }
      }

    // Call the function to check for updates and collect the message
      await checkAndUpdateMessage();


    } catch (error) {
      console.error('Button with innerHTML "Submit" was not found or not visible within the specified timeout.');
    }

  
    // await browser.close();

})();
