const path = require('path');
const dotenv = require('dotenv');
const envPath = path.join(__dirname, '..', '..', '..', '.env');
dotenv.config({ path: envPath });



const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = openai;


// Test is API is not empty
if(process.env.OPENAI_API_KEY === undefined) {
    console.log('OPENAI_API_KEY is not defined');
    console.log('Please check your .env file');
    process.exit(1);
} else {
    console.log('OPENAI_API_KEY is defined');
}

// function to print the API key
function printAPIkey() {
    console.log('KEY:');
    console.log(process.env.OPENAI_API_KEY);
}

// function to test the API key - returns true if valid
async function testAPIkey() {
    try {
        await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "this is a test",
            temperature: 0,
            max_tokens: 5,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["\"\"\""],
        });
        console.log('API key is valid');
    } catch (error) {
        console.log('API key is invalid');
        console.log(error);
    }
}

// printAPIkey();
// testAPIkey();

// Chatbot function
async function chatbot(prompt) {
    try {
        const gptResponse = await openai.createCompletion({
            engine: 'text-davinci-003',
            prompt: prompt,
            maxTokens: 15,
            temperature: 0.9,
            topP: 1,
            presencePenalty: 0,
            frequencyPenalty: 0,
            bestOf: 1,
            n: 1,
            stream: false,
            stop: '\n',
        });
        return gptResponse.data.choices[0].text;
    } catch (error) {
        console.log(error);
    }
}

// chatbot('Hello, my name is Bob. What is your name?');

// export the chatbot function
module.exports = chatbot;

// function text to image
async function textToImage(prompt) {
    try {
        const gptResponse = await openai.createCompletion({
            engine: 'davinci',
            prompt: prompt,
            maxTokens: 15,
            temperature: 0.9,
            topP: 1,
            presencePenalty: 0,
            frequencyPenalty: 0,
            bestOf: 1,
            n: 1,
            stream: false,
            stop: '\n',
        });
        return gptResponse.data.choices[0].text;
    } catch (error) {
        console.log(error);
    }
}