import { useState } from "react";
import { useWizard } from "react-use-wizard";
import queries from "./App";
import makeApiCall from "./Results";

type QuestionProps = {
  query: string;
  onValueChange: (value: string, isComplete?: boolean) => void;
  isFirst?: boolean;
  isLast?: boolean;
};

const Question = ({ query, onValueChange, isFirst, isLast }: QuestionProps) => {
  const { handleStep, previousStep, nextStep } = useWizard();
  const [value, setValue] = useState("");

  const handleNextStep = () => {
    nextStep();
  };

  const handleSubmit = () => {
    onValueChange(value);
    isLast = true;
    console.log("submitted");
    makeApiCall(queries);
  };

  return (
    <>
      <h1>Greenthumb :)</h1>
      <h2>{query}</h2>
      <div className="input-container">
        <input
          type="text"
          className="form-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleNextStep();
            }
          }}
        />
      </div>
      <div className="button-container">
        {isFirst ? null : (
          <button onClick={() => previousStep()}>Previous</button>
        )}
        {isLast ? (
          <button onClick={handleSubmit}>Submit</button>
        ) : (
          <button onClick={handleNextStep}>Next</button>
        )}
      </div>
    </>
  );
};

export default Question;
