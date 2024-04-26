import { useState } from "react";
import { Wizard, useWizard } from "react-use-wizard";
import { Question } from "./Question";

import "./App.css";

function App() {
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");

  const foo: { [key: string]: { q: string; ans: string } } = {
    q1: { q: "What is wrong with your plant?", ans: q1 },
    q2: { q: "How often do you water your plant?", ans: q2 },
  };

  return (
    <>
      <Wizard>
        <Question
          query="What is wrong with your plant?"
          onValueChange={setQ1}
          isFirst
        />
        <Question
          query="How often do you water your plant?"
          onValueChange={setQ2}
        />
      </Wizard>
    </>
  );
}

export default App;
