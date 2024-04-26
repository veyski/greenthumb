import React, { useState, useEffect } from "react";
import { API_KEY } from "../Extras/config";

type ResultsProps = {
  queries: { [key: string]: { q: string; ans: string } };
};

const Results = ({ queries }: ResultsProps) => {
  const [aiResult, setAiResult] = useState("Loading...");

  useEffect(() => {
    const makeApiCall = async () => {
      try {
        const queryText = Object.keys(queries)
          .map((key) => `${queries[key].q}: ${queries[key].ans}`)
          .join("\n");

        console.log("Query Text:", queryText); // Log queryText before API call

        const res = await fetch("YOUR_API_ENDPOINT", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({ query: queryText }),
        });

        const json = await res.json();
        setAiResult(json.textOutputOrSomeOtherPropertyOnThisObject);
      } catch (e) {
        setAiResult("Unable to fetch data");
      }
    };

    makeApiCall();
  }, [queries]);

  return aiResult;
};

export default Results;
