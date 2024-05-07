import { step } from "./step";

export function* getSorter(numbers: Array<number>) {

  let hasSwapped: boolean;
  let count = 0;

  yield { step: step(1), numbers, count }

  do {
    hasSwapped = false;
    yield { step: step(2), numbers, count, hasSwapped }

    for (let i = 0; i < numbers.length; i++) {
      yield { step: step(3), numbers, count, i, hasSwapped }

      const current = numbers[i];
      yield { step: step(4), numbers, count, i, current, hasSwapped }

      const next = numbers[i + 1];
      yield { step: step(5), numbers, count, i, current, next, hasSwapped, }

      if (next && current > next) {
        yield { step: step(6), numbers, count, i, current, next, hasSwapped }
        yield { step: step(7), numbers, count, i, current, next, hasSwapped, shouldSwap: true }
        yield { step: step(8), numbers, count, i, current, next, hasSwapped, shouldSwap: true }

        numbers[i] = next;
        numbers[i + 1] = current;
        hasSwapped = true;
        yield { step: step(9), numbers, count, i, current, next, hasSwapped }
      }
      count++;
    }
  } while (hasSwapped);

  yield { step: step(10), numbers, count, hasSwapped }
  return null;
}
