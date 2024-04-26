type QuestionProps = {
  query: string;
  onValueChange: (value: string) => void;
  isFirst?: boolean;
};
const Question = ({ query, onValueChange, isFirst }: QuestionProps) => {
  return (
    <div>
      {query}
      {isFirst ? null : <button>previous</button>}
      <input onChange={(e) => onValueChange(e.currentTarget.value)} />
      <button>next</button>
    </div>
  );
};

const Main = () => {
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");

  const foo: { [key: string]: { q: string; ans: string } } = {
    q1: { q: "What's wrong with your plant", ans: q1 },
  };

  return (
    <Wizard>
      <Question
        query="What's wrong with your plant"
        onValueChange={setQ1}
        isFirst
      />
      <Question
        query="How often do you water your plants?"
        onValueChange={setQ2}
      />
      <Results queries={foo} />
    </Wizard>
  );
};

/*
type ResultsProps = {
  queries: { [key: string]: { q: string; ans: string } };
};
const Results = ({ queries }: ResultsProps) => {

    const [aiResult, setAiResult] = useState(idk)
    useEffect(() => {
        const makeApiCall = async () => {
            // Make API call
            try {
            const res = await fetch("openai", { body: JSON.stringify({ myqueries or something })})
            const json = res.json();
            setAiResult(json.textOutputOrSomeOtherPropertyOnThisObject)
            } catch(e) {
                setAiResult("Unable to ")
            }
        }

        makeApiCall()
    }, [queries])

    return <div>
        {aiResult}
    </div>
};
*/
