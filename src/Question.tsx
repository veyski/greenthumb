import { useState } from "react";
import { Wizard, useWizard } from "react-use-wizard";

export const Quesiton = () => {
  const { handleStep, previousStep, nextStep } = useWizard();
  const [value, setValue] = useState("");

  return (
    <>
      <h1>This is Step 1</h1>
      <input
        type="text"
        className="form-input"
        value={value}
        placeholder="What is wrong with your plant?"
        onChange={(e) => setValue(e.target.value)}
      />

      <button onClick={() => nextStep()}>Next ⏭</button>
    </>
  );
};
