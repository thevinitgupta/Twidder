import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)

function getGeminiModel(geminiApiKey : string){
    const genAI = new GoogleGenerativeAI(geminiApiKey);
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  return model;
}

async function convertToTweet(linkedInPost : string, geminiApiKey : string) {
   
    // console.log(geminiApiKey);
    const model = getGeminiModel(geminiApiKey);

  const prompt = "Analyze the provided text and generate 6 concise and engaging Twitter posts that capture the key points and essence of the content, suitable for Twitter's character limit (280 characters) and audience. Each tweet should be a complete thought and avoid cliffhangers. A PArticlar Tweet can be a Code Snippet as Well which is a 'Did you know this?' indication related to the Post I provide. Maintain a consistent non-formal voice and tone throughout the tweets. Do not change the tone of the Post. DONT ADD ANY EXTRA TEXT LIKE TWEET 1, TWEET 2, etc. Just give 3 tweets, each separated by 2 newlines"

  const result = await model.generateContent([prompt,linkedInPost]);
  const response = await result.response;
  const tweet = response.text();
  const tweetSeparator = /\n\n/; // Two newlines for separation

const tweets = tweet.split(tweetSeparator);
  // console.log(tweets);
  return tweets.join("|");
}

async function getTechJoke(geminiApiKey : string) {
    const model = getGeminiModel(geminiApiKey);

  const prompt = `Give me 1 single Tweet that is technology related, non-offensive joke that is an engaging Twitter post that is suitable for Twitter's character limit (280 characters) and audience. Each tweet should be a complete thought and avoid cliffhangers. Maintain a consistent human conversation and funny tone throughout the tweets. DONT ADD ANY EXTRA TEXT. 
  TOPICS : Programming, Javascript,NextJS, ReactJS, NodeJS, ExpressJS, VueJS, AngularJS, MongoDB, Coder Life, Bugs, Debugging, Corporate Industry. Don't include HATE SPEECH, racists, facist, communist words or tone. `;

  const result = await model.generateContent([prompt]);
  const response = await result.response;
  const joke = await response.text();
  return joke;
}

async function getTechNews(geminiApiKey : string) {
    const model = getGeminiModel(geminiApiKey);

  const prompt = `Give me 1 single Tweet that is technology related, non-offensive news or facts that that is an engaging and interesting Twitter post that is suitable for Twitter's character limit (280 characters) and audience. Each tweet should be a complete thought and avoid cliffhangers. Maintain a consistent human conversational and fun tone throughout the tweets. DONT ADD ANY EXTRA TEXT. TOPICS : Any Historical DID YOU KNOW event or Innovation, new Research on Programming Innovation, Layoff News, AI and Machine Learning Breakthroughs. IT SHOULD SPECIFICALLY BE A CLEAR NEWS OR FACT and not JUST SOME RANDOM DATA. Don't include HATE SPEECH, racists, facist, communist words or tone. `;

  const result = await model.generateContent([prompt]);
  const response = await result.response;
  const news = await response.text();
  return news;
}
export {convertToTweet,getTechJoke, getTechNews};
