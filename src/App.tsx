import { useState } from "react";
import { Wizard } from "react-use-wizard";
import { Question } from "./Question";
import "./App.css";

const API_KEY = import.meta.env.API_KEY;

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

export const App = () => {
  const [queries, setQueries] = useState<Queries>({
    q1: { q: "What is wrong with your plant?", ans: "" },
    q2: { q: "How big is your plant?", ans: "" },
    q3: { q: "How often do you water your plant?", ans: "" },
    q4: { q: "Describe your plant", ans: "" },
  });

  const updateQuery = (key: string, value: string) => {
    setQueries((prevQueries) => ({
      ...prevQueries,
      [key]: { ...prevQueries[key], ans: value },
    }));
  };

  const [results, setResults] = useState("");
  const makeApiCall = async (userPrompt: string) => {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
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
      const json = await res.json();
      const answer = json.choices[0].message.content;
      const parsedAnswer = JSON.parse(answer);
      const formattedAnswer = parsedAnswer.answer;
      setResults(formattedAnswer);
    } catch (e) {
      console.error(e);
    }
  };

  // Avg input -- 200 tokens conservatively
  // Avg output -- 150 tokens conservatively

  const handleSubmit = () => {
    const userPrompt = generateuserPrompt(queries);
    console.log(userPrompt);
    makeApiCall(userPrompt);
  };

  return (
    <div className={"wrapper"}>
      <Wizard>
        <Question
          query={queries.q1}
          onValueChange={(value: string) => updateQuery("q1", value)}
        />
        <Question
          query={queries.q2}
          onValueChange={(value: string) => updateQuery("q2", value)}
        />
        <Question
          query={queries.q3}
          onValueChange={(value: string) => updateQuery("q3", value)}
        />
        <Question
          query={queries.q4}
          onValueChange={(value: string) => updateQuery("q4", value)}
          onSubmit={handleSubmit}
        />
      </Wizard>
      <div>
        <h2>Results</h2>
        <textarea value={results} rows={10} cols={50} readOnly />
      </div>
    </div>
  );
};
