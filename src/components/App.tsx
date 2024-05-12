import "./App.css";
import { useEffect, useState } from "react";
import { getSorter } from "../lib/sorter";
import { clsx } from "clsx";
import { Code } from "./Code";
import { DetailsWrapper } from "./Details";
import { ArrowDown, Minus, Pause, Play, Plus, Recycle, Reset } from "./Svg";
import { step } from "../lib/step";

const explanationDetails = (
  <DetailsWrapper summary="Details" open={true}>
    <p>
      Bubble Sort works by comparing adjacent values in an array/list.
      <br />
      <br />
      If the value at the current index is greater than the next, those values
      will be swapped (for sorting in ascending order). <br />
      <br /> For each iteration, the largest value "bubbles" to the top.
      <br />
      <br />
      The process is repeated until all the elements are in their right
      position.
    </p>
  </DetailsWrapper>
);
const algorithmDetails = (
  <DetailsWrapper summary="Steps" open={true}>
    <ol>
      <li>Create a flag to indicate if values have been swapped.</li>
      <li>
        Create a loop that runs at least once, then continues to run given the{" "}
        <span className="inline-code">hasSwapped</span> flag is set to true.
      </li>
      <li>
        Start a nested iteration from <span className="inline-code">0</span>,
        compare the value of the current index (
        <span className="inline-code">i</span>) with the value from the next
        index (<span className="inline-code">i+1</span>).
      </li>
      <li>
        If the value in index <span className="inline-code">i</span> is greater
        than the value in index <span className="inline-code">i+1</span>, swap
        the values. Set a flag to indicate that values have been swapped.
      </li>
      <li>
        Move to the next index in the list and perform the same operation, until
        the end of the list is reached.
      </li>
      <li>
        If no values have been swapped, it means that the list is sorted. Then
        we will exit the outer loop. If values have been swapped we will iterate
        over the list once again from step 3.
      </li>
    </ol>
  </DetailsWrapper>
);
const complexityDetails = (
  <DetailsWrapper summary="Best & worst case" open={true}>
    <div id="complexity">
      <p>
        <b>BEST CASE</b>: <b className="inline-code">O(n)</b>
        <br />
        <em>Linear.</em> <br />
        <br />
        This is the case when the input list is already sorted. In this case, we
        only have to iterate through each set of numbers once.
      </p>
      <p>
        <b>WORST CASE</b>: <b className="inline-code">O(n²)</b>
        <br />
        <em>Quadratic.</em> <br />
        <br />
        This is the case when every element of the input list is exactly
        opposite of the sorted order. Every element needs to be swapped with
        every other element. We will iterate <b className="inline-code">
          n*n
        </b>{" "}
        times.
      </p>
      <p>
        ... where <b className="inline-code">n</b> is the number of items in the
        list
      </p>
    </div>
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
      setTimeout(handleReset, 2000);
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

    const newOrder =
      sortOrder === SortOrder.Ascending
        ? SortOrder.Descending
        : SortOrder.Ascending;

    const newNumbers =
      newOrder === SortOrder.Ascending
        ? numbersAscending.slice()
        : numbersDescending.slice();

    setSorter(getSorter(newNumbers));
    setCodeExampleValues({
      count: 0,
      step: step(0),
      numbers: newNumbers,
    });
    setSortOrder(newOrder);
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

      <section id="explanations">
        <div>
          <h2>EXPLANATION</h2>
          {explanationDetails}
        </div>
        <div>
          <h2>ALGORITHM</h2>
          {algorithmDetails}
        </div>
        <div id="complexity">
          <h2>TIME COMPLEXITY</h2>
          {complexityDetails}
        </div>
      </section>

      <section id="example-code">
        <div>
          <h2>EXAMPLE CODE</h2>
          <div id="buttons">
            <button onClick={isPlaying ? handlePause : handlePlay}>
              {isPlaying ? (
                <span>
                  <Pause />
                </span>
              ) : (
                <span>
                  <Play />
                </span>
              )}
              {isPlaying ? "Pause " : "Play "}
            </button>
            <button onClick={handleReset} disabled={!hasStarted}>
              <span>
                <Reset />
              </span>
              Reset
            </button>

            <button onClick={handleOrder} disabled={hasStarted}>
              <span>
                <Recycle />
              </span>
              Change to{" "}
              {sortOrder === SortOrder.Ascending ? "worst case" : "best case"}
            </button>
          </div>

          <h3>Speed Control</h3>
          <div id="speed-control">
            <button
              onClick={() => handleSpeed(1)}
              disabled={hasStarted || isPlaying || intervalLength >= speed.MAX}
            >
              <span>
                <Minus />
              </span>
            </button>
            <div id="speed" className={clsx({ disabled: hasStarted })}>
              <span
                className={clsx({ disabled: hasStarted })}
                id="speed-indicator"
                style={{ left: `${20 - intervalLength / 50}rem` }}
              ></span>
            </div>
            <button
              onClick={() => handleSpeed(-1)}
              disabled={hasStarted || isPlaying || intervalLength <= speed.MIN}
            >
              <span>
                <Plus />
              </span>
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
        </div>

        <div>
          <div id="visualization">
            <h2>VISUALIZATION</h2>

            <div>
              <div id="arrow">
                <span style={{ left: `${0.5 + (i ?? 0) * 4.5}rem` }}>
                  <ArrowDown />
                </span>
              </div>
              <div id="numbers">
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
              </div>
            </div>

            <p>
              <span>&nbsp;</span>
              {current && next && current > next && (
                <>
                  <span>{` ${current} is greater than ${next}. `}</span>
                  <span>{` Swap  ${current} and ${next}.`}</span>
                </>
              )}
            </p>

            <div id="iterations">
              <i>iterations</i>
              <div>
                ×<span id="iterations-counter">{noOfIterations}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
