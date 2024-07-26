import { useWizard } from "react-use-wizard";
import styles from "./Question.module.css";
import { Query } from "./App";

export type QuestionProps = {
  query: Query;
  onValueChange: (value: string) => void;
  onSubmit?: () => void;
};

export const Question = ({ query, onValueChange, onSubmit }: QuestionProps) => {
  const { nextStep, previousStep, isFirstStep, isLastStep } = useWizard();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!isLastStep) {
        nextStep();
      } else if (onSubmit) {
        onSubmit();
      }
    }
  };

  return (
    <div className={styles.question}>
      <h1>Greenthumb :)</h1>
      <h2>{query.q}</h2>
      <div className={styles.buttonContainer}>
        <input
          type="text"
          className="form-input"
          value={query.ans}
          onChange={(e) => onValueChange(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={styles.buttonContainer}>
        {!isFirstStep && (
          <button onClick={() => previousStep()}>Previous</button>
        )}
        {isLastStep ? (
          <button onClick={onSubmit}>Submit</button>
        ) : (
          <button onClick={nextStep}>Next</button>
        )}
      </div>
    </div>
  );
};
