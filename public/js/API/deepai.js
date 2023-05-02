const path = require('path');
const dotenv = require('dotenv');
const envPath = path.join(__dirname, '..', '..', '..', '.env');
dotenv.config({ path: envPath });

// Get the 'deepai' package here (Compatible with browser & nodejs):
//     https://www.npmjs.com/package/deepai
// All examples use JS async-await syntax, be sure to call the API inside an async function.
//     Learn more about async-await here: https://javascript.info/async-await


// Example posting a local image file (Node.js only):
const fs = require('fs');

const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML

deepai.setApiKey(process.env.DEEPAI_API_KEY);

(async function() {
    var resp = await deepai.callStandardApi("colorizer", {
        image: fs.createReadStream("../.../img/image.png"),
    });
    console.log(resp);
})()

//function to print the API key
function printAPIkey() {
    console.log('KEY:');
    console.log(process.env.DEEPAI_API_KEY);
}

//function to test the API key - returns true if valid
async function testAPIkey() {
    try {
        await deepai.callStandardApi("colorizer", {
            image: fs.createReadStream("../.../img/image.png"),
        });
        console.log('API key is valid');
    } catch (error) {
        console.log('API key is invalid');
        console.log(error);
    }
}

//printAPIkey();
//testAPIkey();

