import React, { useState } from "react";
import { Wizard } from "react-use-wizard";
import Question from "./Question";
import Results from "./Results";

import "./App.css";

export type Query = {
  q: string;
  ans: string;
};

export type Queries = { [key: string]: Query };

const generatePrompt = (queries: Queries): string => {
  let prompt = `
    Format all output as JSON with the following properties:
      answer: string

    Give advice on how to best care for a plant given the following questions and answers. 
    Don't ask for clarification, just provide an answer to the best of your ability given the following info.

  `;
  Object.values(queries).forEach((query) => {
    prompt += `${query.q}: ${query.ans}\n`;
  });

  return prompt;
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

  const handleSubmit = () => {
    console.log(queries);
    const prompt = generatePrompt(queries);
    console.log(prompt);

    // Do a `fetch` to openai
    // fetch("http://OPENAI", ...)

    // Story results in useState
    // setResults()
  };

  return (
    <div className={"wrapper"}>
      <Wizard>
        <Question
          query={queries.q1}
          onValueChange={(value) => updateQuery("q1", value)}
        />
        <Question
          query={queries.q2}
          onValueChange={(value) => updateQuery("q2", value)}
        />
        <Question
          query={queries.q3}
          onValueChange={(value) => updateQuery("q3", value)}
        />
        <Question
          query={queries.q4}
          onValueChange={(value) => updateQuery("q4", value)}
          onSubmit={handleSubmit}
        />
      </Wizard>
      <div>
        <h2>Results</h2>
        <textarea value={""} rows={10} cols={50} readOnly />
      </div>
    </div>
  );
};
