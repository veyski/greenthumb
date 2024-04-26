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
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [q4, setQ4] = useState("");

  const handleValueChange = (key: string, value: string) => {
    setQueries((prevQueries) => ({
      ...prevQueries,
      [key]: { ...prevQueries[key], ans: value },
    }));
  };

  return (
    <>
      <Wizard>
        <Question
          query="What is wrong with your plant?"
          onValueChange={(value) => {
            setQ1(value);
            handleValueChange("q1", value);
          }}
          isFirst
        />
        <Question
          query="How big is your plant?"
          onValueChange={(value) => {
            setQ2(value);
            handleValueChange("q2", value);
          }}
        />
        <Question
          query="How often do you water your plant?"
          onValueChange={(value) => {
            setQ3(value);
            handleValueChange("q3", value);
          }}
        />
        <Question
          query="Describe your plant."
          onValueChange={(value) => {
            setQ4(value);
            handleValueChange("q4", value);
          }}
          isLast
        />
      </Wizard>
    </>
  );
}

export default App;
