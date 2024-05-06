import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

dotenv.config();
//console.log(process.env);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export type Query = {
  q: string;
  ans: string;
};

export type Queries = { [key: string]: Query };

const generateuserPrompt = (queries: Queries): string => {
  let userPrompt = `
    Format all output as JSON with the following properties:
      answer: string

    Give advice on how to best care for a plant given the following questions and answers. 
    Don't ask for clarification, just provide an answer to the best of your ability given the following info.

  `;
  Object.values(queries).forEach((query) => {
    userPrompt += `${query.q}: ${query.ans}\n`;
  });

  return userPrompt;
};

app.post("/makeapicall", async (req, res) => {
  const { queries } = req.body;

  const userPrompt = generateuserPrompt(queries);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        max_tokens: 500,
        temperature: 0.5,
        messages: [
          {
            role: "user",
            content: userPrompt,
          },
        ],
      }),
    });

    const json = await response.json();

    res.json(json.choices[0].message.content);
  } catch (e) {
    res.json({ error: "Unable to make API call" });
  }
});
