import "./App.css";
import { useState } from "react";
import { getSorter } from "../lib/sorter";
import { clsx } from "clsx";
import { Code } from "./Code";
import { DetailsWrapper } from "./Details";
import { ArrowDown } from "./ArrowDown";
import { step } from "../lib/step";

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
      <li>Create a flag to indicate if values have been swapped.</li>
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

const enum SortOrder {
  Descending,
  Ascending
}

export default function App() {
  const numbersDescending = [5, 4, 3, 2, 1];
  const numbersAscending = [1, 2, 3, 4, 5];

  // TODO: useReducer
  const [intervalRef, setIntervalRef] = useState<number | null>(null)
  const [intervalLength, setIntervalLength] = useState(500)
  const [sortOrder, setSortOrder] = useState(SortOrder.Descending);
  const [numbers, setNumbers] = useState(numbersDescending);
  const [swapped, setSwapped] = useState<string | undefined>("false");
  const [shouldSwap, setShouldSwap] = useState(false);
  const [i, setI] = useState<number | undefined>(0);
  const [current, setCurrent] = useState<number | undefined>(
    numbersDescending.at(0)
  );
  const [next, setNext] = useState<number | undefined>(numbersDescending.at(1));
  const [highlightedCodeStep, setHighlightedCodeStep] = useState<string>("-1");
  const [noOfIterations, setNoOfIterations] = useState(0);
  const [sorter, setSorter] = useState(getSorter(numbers))
  const [isPlayEnabled, setIsPlayEnabled] = useState(true)

  // TODO: ascending / descending radio buttons
  function handlePlay() {
    // TODO: disable if playing 7 stopped / needs reset

    setIsPlayEnabled(false)

    const interval = setInterval(() => {
      const { value, done } = sorter.next()

      if (done) {
        if (intervalRef) {
          clearInterval(intervalRef);
        }
      }

      if (value) {
        setValues(value)
      }
    }, intervalLength);
    setIntervalRef(interval)
  }

  function handlePause() {
    setIsPlayEnabled(true)

    if (intervalRef) {
      clearInterval(intervalRef);
    }
  }

  function handleStop() {
    sorter.return(null)
    setValues({ count: 0, step: step(1), numbers })
    setSorter(getSorter(numbers))
    setIsPlayEnabled(true)
    if (intervalRef) {
      clearInterval(intervalRef);
    }
  }

  const setValues = ({
    count,
    step,
    numbers,
    hasSwapped,
    i,
    current,
    next,
    shouldSwap = false,
  }: {
    count: number;
    step: string;
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
    setNoOfIterations(count);
    setSwapped(hasSwapped?.toString());
    setShouldSwap(shouldSwap);
    setNumbers(numbers);
    setHighlightedCodeStep(step);
  };

  return (
    <main id="mfe--bubble-sort">
      <h1>BUBBLE SORT</h1>
      <h2>EXPLANATION</h2>
      {explanationDetails}
      <h2>ALGORITHM</h2>
      {algorithmDetails}
      <h2>TIME COMPLEXITY</h2>
      {complexityDetails}
      <h2>EXAMPLE CODE</h2>
      <div>
        <button onClick={handlePlay} disabled={!isPlayEnabled}>Play / resume best case</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleStop}>Reset</button>
      </div>
      <DetailsWrapper summary="Details" open={true}>
        <Code
          highlightedLine={highlightedCodeStep}
          code={`
  function sort(numbers) { {{${numbers}}} 
    let hasSwapped; {{${swapped ?? ""}}} ${step(1)}

    do {
      hasSwapped = false; ${step(2)}
     
      for (let i = 0; i < numbers.length; i++) {{${i ?? ""}}} ${step(3)}
        const current = numbers[i]; {{${current ?? ""}}} ${step(4)}
        const next = numbers[i + 1]; {{${next ?? ""}}} ${step(5)}

        if (current > next) { {{${current > next ?? ""}}} ${step(6)}
          numbers[i] = next; ${step(7)}
          numbers[i + 1] = current; ${step(8)}
          hasSwapped = true; ${step(9)}
        }
      }
    } while (hasSwapped);

    return numbers; ${step(10)}
  }`}
        />
      </DetailsWrapper>
      <section id="numbers">
        {numbers.map((value, index) => {
          return (
            <div
              key={value}
              className={clsx({ outer: true, index: index === i })}
            >
              <div className="pointer">{index === i && <ArrowDown />}</div>
              <div
                className={clsx({
                  "list-box": true,
                  current: value === current,
                  next: value === next,
                  swap: shouldSwap,
                })}
              >
                <span>{value}</span>
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
