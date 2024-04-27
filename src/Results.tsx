import React, { useState, useEffect } from "react";
import { API_KEY } from "../Extras/config";

type ResultsProps = {
  queries: { [key: string]: { q: string; ans: string } };
};

const Results = ({ queries }: ResultsProps) => {
  const [aiResults, setAiResults] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const makeApiCall = async () => {
      try {
        const results: { [key: string]: string } = {};

        for (const key in queries) {
          const query = queries[key];
          const queryText = `${query.q}: ${query.ans}`;

          console.log("Query Text:", queryText);

          const res = await fetch("YOUR_API_ENDPOINT", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({ query: queryText }),
          });

          const json = await res.json();
          results[key] = json.textOutputOrSomeOtherPropertyOnThisObject;
        }

        setAiResults(results);
      } catch (e) {
        console.error("Error fetching data:", e);
        setAiResults({});
      }
    };

    makeApiCall();
  }, [queries]);

  return (
    <>
      {Object.keys(aiResults).map((key) => (
        <div key={key}>
          <h3>{queries[key].q}</h3>
          <p>{aiResults[key]}</p>
        </div>
      ))}
    </>
  );
};

export default Results;
