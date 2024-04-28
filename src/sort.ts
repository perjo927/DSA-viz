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

      onChange({
        hasSwapped,
        outerI: outerCounter,
        innerI: i,
        current,
        next,
        numbers,
        counter: totalCounter,
      });
      await wait(1000);

      if (next && current > next) {
        numbers[i] = next;
        numbers[i + 1] = current;
        hasSwapped = true;

        onChange({
          hasSwapped,
          outerI: outerCounter,
          innerI: i,
          current,
          next,
          numbers,
          counter: totalCounter,
        });
        await wait(1000);
      }
    }
  } while (hasSwapped);

  return numbers;
}
