const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/chat-bison-001";

const API_KEY = 'AIzaSyDZ0Ey-vbCsRjSbGeVIq7rbAV9Cl2Jj42k';

const auth = new GoogleAuth().fromAPIKey(API_KEY);

// Create a new DiscussServiceClient instance using the authenticated client
const client = new DiscussServiceClient({
  authClient: auth
});

export default function handler(req, res) {
    let messages = [{ content: req.query.ques }];
  
client.generateMessage({
  // required, which model to use to generate the result
  model: MODEL_NAME,
  // optional, 0.0 always uses the highest-probability result
  temperature: 0.25,
  // optional, how many candidate results to generate
  candidateCount: 1,
  // optional, number of most probable tokens to consider for generation
  top_k: 40,
  // optional, for nucleus sampling decoding strategy
  top_p: 0.95,
  prompt: {
    messages: messages,
  },
}).then(result => {
    console.log("First Response:", result[0].candidates[0]?.content);

    messages.push({ content: result[0].candidates[0]?.content });
   // console.log(JSON.stringify(result, null, 2));
    res.status(200).json({ resp: messages })
});
}