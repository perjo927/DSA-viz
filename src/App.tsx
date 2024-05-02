import "./App.css";
import { useEffect, useState, JSX } from "react";
import { sort } from "./sort";
import { clsx } from "clsx";
import { Code } from "./Code";

const DetailsWrapper = ({
  summary,
  children,
  open = false,
}: {
  summary: string;
  open: boolean;
  children?: JSX.Element;
}) => {
  return (
    <details open={open}>
      <summary>{summary}</summary>
      {children}
    </details>
  );
};
const explanationDetails = (
  <DetailsWrapper summary="Details" open={true}>
    <p>
      Bubble Sort works by comparing adjacent values in an array and swapping
      the values if the current value is greater than the next (for ascending
      order). For each iteration, the largest value "bubbles" to the top. The
      process is repeated until all the elements are in their right position.
    </p>
  </DetailsWrapper>
);
const algorithmDetails = (
  <DetailsWrapper summary="Steps" open={false}>
    <ol>
      <li>Create a flag to indicate if values have been swapped</li>
      <li>
        Create a loop that runs at least once, given the swapped flag is set to
        true.
      </li>
      <li>
        Start a nested iteration from 0, compare the value of the current index
        (i) with the value from the next index (i+1).
      </li>
      <li>
        If the value in index <em>i</em> is greater than the value in index i+1,
        swap the values. Set a flag to indicate that values have been swapped.
      </li>
      <li>
        Move to the next index in the list and perform the same operation, until
        the end of the array is reached.
      </li>
      <li>
        If no values have been swapped, it means the array is sorted. Then we
        will exit the outer loop. If values have been swapped we will iterate
        over the array once again from step 3.
      </li>
    </ol>
  </DetailsWrapper>
);
const complexityDetails = (
  <DetailsWrapper summary="Best & worst case" open={false}>
    <>
      <p>
        Best case: linear O(n): when the input array is already sorted. In this
        case, we only have to iterate through each set of numbers once.
      </p>
      <p>
        Worst case: quadratic O(n²): this is the case when every element of the
        input array is exactly opposite of the sorted order. Every element needs
        to be swapped with every other element. We will iterate n*n times.
      </p>
    </>
  </DetailsWrapper>
);

export default function App() {
  const numbersDescending = [5, 4, 3, 2, 1];
  const numbersAscending = [1, 2, 3, 4, 5];

  const [numbers, setNumbers] = useState(numbersDescending);
  const [swapped, setSwapped] = useState<string | undefined>("false");
  const [shouldSwap, setShouldSwap] = useState(false);
  const [i, setI] = useState<number | undefined>(0);
  const [current, setCurrent] = useState<number | undefined>(
    numbersDescending.at(0)
  );
  const [next, setNext] = useState<number | undefined>(numbersDescending.at(1));
  const [executingLineOfCode, setExecutingLineOfCode] = useState<string | null>(
    null
  );
  const [noOfIterations, setNoOfIterations] = useState(0);

  useEffect(() => {
    getNumbers(numbersDescending);
  }, []);

  async function getNumbers(_numbers: Array<number>) {
    const arr = await sort(_numbers, onChange);
    return arr.join(",");
  }

  const onChange = async ({
    counter,
    loc,
    numbers,
    hasSwapped,
    i,
    current,
    next,
    shouldSwap = false,
  }: {
    counter: number;
    loc: string | null;
    numbers: number[];
    hasSwapped?: boolean;
    i?: number;
    current?: number;
    next?: number;
    shouldSwap?: boolean;
  }) => {
    setI(i);
    setCurrent(current);
    setNext(next);
    setNoOfIterations(counter);
    setSwapped(hasSwapped?.toString());
    setShouldSwap(shouldSwap);
    setNumbers(numbers);
    setExecutingLineOfCode(loc);
  };

  return (
    <main>
      <h1>Bubble Sort</h1>
      <h2>Explanation</h2>
      {explanationDetails}
      <h2>Algorithm</h2>
      {algorithmDetails}
      <h2>Time complexity</h2>
      {complexityDetails}
      <h2>Example Code</h2>
      <Code
        highlightedLine={executingLineOfCode}
        code={`
  function sort(numbers) { {{numbers = ${numbers}}}
    let hasSwapped; {{hasSwapped = ${swapped}}}

    do {
      hasSwapped = false;
     
      for (let i = 0; i < numbers.length; i++) {{i = ${i}}}
        const current = numbers[i]; {{current = ${current}}}
        const next = numbers[i + 1]; {{next = ${next}}}

        if (current > next) { {{current > next = ${current > next}}}
          numbers[i] = next; 
          numbers[i + 1] = current;
          hasSwapped = true;
        }
      }
    } while (hasSwapped);

    return numbers;
  }`}
      />
      <section id="numbers">
        {numbers.map((value, index) => {
          return (
            <div
              key={value}
              className={clsx({ outer: true, index: index === i })}
            >
              <div className="pointer">{index === i && "↓"}</div>
              <div
                className={clsx({
                  "list-box": true,
                  current: value === current,
                  next: value === next,
                  swap: shouldSwap,
                })}
              >
                {value}
              </div>
            </div>
          );
        })}
      </section>
      <p>Iterations: {noOfIterations}</p>
      TODO: Worst case / best case comparison play/pause/speed/quit
      <div></div>
    </main>
  );
}
