import React, { useState } from "react";
import { Wizard } from "react-use-wizard";
import Question from "./Question";
import Results from "./Results";

import "./App.css";

interface Query {
  q: string;
  ans: string;
}

function App() {
  const [queries, setQueries] = useState<{ [key: string]: Query }>({
    q1: { q: "What is wrong with your plant?", ans: "" },
    q2: { q: "How big is your plant?", ans: "" },
    q3: { q: "How often do you water your plant?", ans: "" },
    q4: { q: "Describe your plant.", ans: "" },
  });

  const updateQuery = (key: string, value: string) => {
    setQueries((prevQueries) => ({
      ...prevQueries,
      [key]: { ...prevQueries[key], ans: value },
    }));
  };

  return (
    <>
      <Wizard>
        <Question
          query={queries.q1.q}
          onValueChange={(value) => updateQuery("q1", value)}
          isFirst
        />
        <Question
          query={queries.q2.q}
          onValueChange={(value) => updateQuery("q2", value)}
        />
        <Question
          query={queries.q3.q}
          onValueChange={(value) => updateQuery("q3", value)}
        />
        <Question
          query={queries.q4.q}
          onValueChange={(value) => updateQuery("q4", value)}
          isLast
        />
      </Wizard>
    </>
  );
}

export default App;
