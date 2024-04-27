import React, { useState } from "react";
import { useWizard } from "react-use-wizard";

type QuestionProps = {
  query: string;
  onValueChange: (value: string) => void;
  isFirst?: boolean;
  isLast?: boolean;
};

const Question = ({ query, onValueChange, isFirst, isLast }: QuestionProps) => {
  const { nextStep, previousStep } = useWizard();
  const [value, setValue] = useState("");

  const handleNextStep = () => {
    if (!isLast) {
      onValueChange(value);
      nextStep();
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    onValueChange(value);
    console.log("submitted");
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
        {!isFirst && <button onClick={() => previousStep()}>Previous</button>}
        {isLast ? (
          <button onClick={handleNextStep}>Submit</button>
        ) : (
          <button onClick={handleNextStep}>Next</button>
        )}
      </div>
    </>
  );
};

export default Question;
