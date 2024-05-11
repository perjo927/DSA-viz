import "./App.css";
import { useEffect, useState } from "react";
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
      those values if the value at the current index is greater than the next
      (for ascending order sorting). For each iteration, the largest value
      "bubbles" to the top. The process is repeated until all the elements are
      in their right position.
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
// TODO: scientific notation
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
  Ascending,
}

const speed = {
  MIN: 100,
  INCREMENT: 100,
  DEFAULT: 500,
  MAX: 1000,
};

export default function App() {
  const numbersDescending = [5, 4, 3, 2, 1];
  const numbersAscending = [1, 2, 3, 4, 5];

  const [intervalRef, setIntervalRef] = useState<number | null>(null);
  const [intervalLength, setIntervalLength] = useState(500);
  const [sortOrder, setSortOrder] = useState(SortOrder.Descending);
  const [numbers, setNumbers] = useState(numbersDescending.slice());
  const [swapped, setSwapped] = useState<string | undefined>(undefined);
  const [shouldSwap, setShouldSwap] = useState(false);
  const [i, setI] = useState<number | undefined>(undefined);
  const [current, setCurrent] = useState<number | undefined>(undefined);
  const [next, setNext] = useState<number | undefined>(undefined);
  const [highlightedCodeStep, setHighlightedCodeStep] = useState<string>(
    step(0)
  );
  const [noOfIterations, setNoOfIterations] = useState(0);
  const [sorter, setSorter] = useState(getSorter(numbers));
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isSortingDone, setIsSortingDone] = useState(false);

  useEffect(() => {
    if (isSortingDone && intervalRef) {
      handleReset();
    }
  }, [isSortingDone, intervalRef]);

  function handleSorter() {
    const { value, done } = sorter.next();

    if (done) {
      setIsSortingDone(true);
    }

    if (value) {
      setCodeExampleValues(value);
    }
  }

  function handlePlay() {
    setIsPlaying(true);
    setHasStarted(true);
    setIsSortingDone(false);

    const interval = setInterval(handleSorter, intervalLength);
    setIntervalRef(interval);
  }

  function handlePause() {
    setIsPlaying(false);

    if (intervalRef) {
      clearInterval(intervalRef);
    }
  }

  function handleReset() {
    if (intervalRef) {
      clearInterval(intervalRef);
    }

    sorter.return(null);

    const newNumbers =
      sortOrder === SortOrder.Ascending
        ? numbersAscending.slice()
        : numbersDescending.slice();
    setSorter(getSorter(newNumbers));
    setIsPlaying(false);
    setHasStarted(false);
    setCodeExampleValues({
      count: 0,
      step: step(0),
      numbers: newNumbers,
    });
  }

  function handleSpeed(direction: number) {
    const newSpeed = intervalLength + direction * speed.INCREMENT;
    if (newSpeed < speed.MIN || newSpeed > speed.MAX) {
      return;
    }
    setIntervalLength(newSpeed);
  }

  function handleOrder() {
    sorter.return(null);

    const order =
      sortOrder === SortOrder.Ascending
        ? SortOrder.Descending
        : SortOrder.Ascending;

    const newNumbers =
      sortOrder === SortOrder.Ascending
        ? numbersAscending.slice()
        : numbersDescending.slice();

    setSorter(getSorter(newNumbers));
    setCodeExampleValues({
      count: 0,
      step: step(0),
      numbers: newNumbers,
    });
    setSortOrder(order);
    setNumbers(newNumbers);
  }

  const setCodeExampleValues = ({
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
      {/* Control panel */}
      <div>
        <button onClick={isPlaying ? handlePause : handlePlay}>
          {isPlaying ? "Pause" : "Play"} best case
        </button>
        <button onClick={handleReset} disabled={!hasStarted}>
          Reset
        </button>

        <button onClick={handleOrder} disabled={hasStarted}>
          Change order
        </button>
      </div>
      <div>
        {/* Speed Indicator */}
        <button
          onClick={() => handleSpeed(1)}
          disabled={(hasStarted && isPlaying) || intervalLength >= speed.MAX}
        >
          {"-"}
        </button>
        <div id="speed">
          <span
            id="speed-indicator"
            style={{ left: `${32 - intervalLength / 31}rem` }}
          ></span>
        </div>
        <button
          onClick={() => handleSpeed(-1)}
          disabled={(hasStarted && isPlaying) || intervalLength <= speed.MIN}
        >
          {"+"}
        </button>
      </div>
      <DetailsWrapper summary="Source code details" open={true}>
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

        if (current > next) { {{${
          !current || !next ? "" : current > next
        }}} ${step(6)}
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
      <div id="arrow">
        <span style={{ left: `${0.5 + (i ?? 0) * 4.5}rem` }}>
          <ArrowDown />
        </span>
      </div>
      <section id="numbers">
        {numbers.map((value, index) => {
          return (
            <div
              key={value}
              className={clsx({ outer: true, index: index === i })}
            >
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
      <p>
        <span>Iterations: {noOfIterations}.</span>
        {current && next && current > next && (
          <span>{` ${current} is greater than ${next}. Swapping  ${current} and ${next}.`}</span>
        )}
      </p>
      <div></div>
    </main>
  );
}
