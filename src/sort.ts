import { wait } from "./wait";

export async function sort(numbers: Array<number>, onChange) {
  let hasSwapped: boolean;
  let totalCounter = 0;
  let outerCounter = 0;

  do {
    hasSwapped = false;
    outerCounter++;

    for (let i = 0; i < numbers.length; i++) {
      totalCounter++;

      const current = numbers[i];
      const next = numbers[i + 1];

      if (next && current > next) {
        numbers[i] = next;
        numbers[i + 1] = current;
        hasSwapped = true;
      }
      await wait(500);
      onChange({
        hasSwapped,
        outerI: outerCounter,
        innerI: i,
        current,
        next,
        numbers,
        counter: totalCounter,
      });
    }
  } while (hasSwapped);

  return numbers;
}
