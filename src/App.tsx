import "./App.css";
import { useEffect, useState } from "react";
import { sort } from "./sort";

export default function App() {
  const numbersList = [5, 4, 3, 2, 1];

  const [numbers, setNumbers] = useState("");
  const [swapped, setSwapped] = useState("");
  const [outerIndex, setOuterIndex] = useState(0);
  const [innerIndex, setInnerIndex] = useState(0);
  const [noOfIterations, setNoOfIterations] = useState(0);
  const [current, setCurrent] = useState(null);
  const [next, setNext] = useState(null);

  useEffect(() => {
    getNumbers(numbersList);
  }, []);

  async function getNumbers(_numbers: Array<number>) {
    const arr = await sort(_numbers, onChange);
    return arr.join(",");
  }

  const onChange = ({
    hasSwapped,
    outerI,
    innerI,
    current,
    next,
    numbers,
    counter,
  }) => {
    setOuterIndex(outerI);
    setInnerIndex(innerI);
    setCurrent(current);
    setNext(next);
    setNoOfIterations(counter);
    setSwapped(hasSwapped);
    setNumbers(numbers.join(", "));
  };

  return (
    <div>
      <h1>Bubble Sort</h1>
      <h2>Explanation</h2>
      <p>
        Bubble Sort works by comparing adjacent values in an array and swapping
        the values if the current value is greater than the next (for ascending
        order). For each iteration, the largest value "bubbles" to the top. The
        process is repeated until all the elements are in their right position.
      </p>
      <h3>Algorithm</h3>
      <ol>
        <li>Create a flag to indicate if values have been swapped</li>
        <li>
          Create a loop that runs at least once, given the swapped flag is set
          to true.
        </li>
        <li>
          Start a nested iteration from 0, compare the value of the current
          index (i) with the value from the next index (i+1).
        </li>
        <li>
          If the value in index <em>i</em> is greater than the value in index
          i+1, swap the values. Set a flag to indicate that values have been
          swapped.
        </li>
        <li>
          Move to the next index in the list and perform the same operation,
          until the end of the array is reached.
        </li>
        <li>
          If no values have been swapped, it means the array is sorted. Then we
          will exit the outer loop. If values have been swapped we will iterate
          over the array once again from step 3.
        </li>
      </ol>
      <h2>Time complexity</h2>
      <p>
        Best case: linear O(n): when the input array is already sorted. In this
        case, we only have to iterate through each set of numbers once.
      </p>
      <p>
        Worst case: quadratic O(n²): this is the case when every element of the
        input array is exactly opposite of the sorted order. Every element needs
        to be swapped with every other element. We will iterate n*n times.
      </p>
      <pre>{`
  function sort(numbers) {
    let swapped;
  
    do {
      swapped = false;
  
      for (let i = 0; i < numbers.length; i++) {
        const current = numbers[i];
        const next = numbers[i + 1];
  
        if (current > next) {
          numbers[i] = next;
          numbers[i + 1] = current;
          swapped = true;
        }
      }
    } while (swapped);
  
    return numbers;
  }
      `}</pre>
      <section>{numbers}</section>
      Iterated: x times.
      <p>
        Length: {numbersList.length}. Outer index:{outerIndex}. Innder index:{" "}
        {innerIndex}. Current: {current}. Next: {next}. Has swapped:{" "}
        {swapped ? "true" : "false"}. Iterations: {noOfIterations}
        Numbers: {numbers}
      </p>
      TODO: Worst case / best case comparison
    </div>
  );
}
