import { useState } from "react";
import { Wizard } from "react-use-wizard";
import { Question } from "./Question";
import "./App.css";

export type Query = {
  q: string;
  ans: string;
};

export type Queries = { [key: string]: Query };

export const App = () => {
  const [queries, setQueries] = useState<Queries>({
    q1: { q: "What is wrong with your plant?", ans: "" },
    q2: { q: "How big is your plant?", ans: "" },
    q3: { q: "How often do you water your plant?", ans: "" },
    q4: { q: "Describe your plant", ans: "" },
  });

  const [results, setResults] = useState("");

  const updateQuery = (key: string, value: string) => {
    setQueries((prevQueries) => ({
      ...prevQueries,
      [key]: { ...prevQueries[key], ans: value },
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/makeapicall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ queries }),
      });
      const data = await response.json();
      const jsonResponse = JSON.parse(data);
      const answer = jsonResponse.answer;
      setResults(answer);
    } catch (error) {
      console.error(error);
      setResults("Unable to make API call");
    }
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
