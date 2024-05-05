import { step } from "./step";
import { wait } from "./wait";

export async function sort(numbers: Array<number>, onChange) {
  const cb = (args, waitMs = 500) => wait(waitMs).then(() => onChange(args));

  let hasSwapped: boolean;
  let counter = 0;
  let loc: string | null = null;

  await cb({ loc: step(1), numbers, counter });

  do {
    hasSwapped = false;
    await cb({ loc: step(2), numbers, counter, hasSwapped });

    for (let i = 0; i < numbers.length; i++) {
      await cb({ loc: step(3), numbers, counter, i, hasSwapped });

      const current = numbers[i];
      await cb({ loc: step(4), numbers, counter, i, current, hasSwapped });

      const next = numbers[i + 1];
      await cb({
        loc: step(5),
        numbers,
        counter,
        i,
        current,
        next,
        hasSwapped,
      });

      if (next && current > next) {
        await cb({
          loc: step(6),
          numbers,
          counter,
          i,
          current,
          next,
          hasSwapped,
          shouldSwap: true,
        });

        await cb({
          loc: step(7),
          numbers,
          counter,
          i,
          current,
          next,
          hasSwapped,
          shouldSwap: true,
        });

        await cb({
          loc: step(8),
          numbers,
          counter,
          i,
          current,
          next,
          hasSwapped,
        });

        numbers[i] = next;
        numbers[i + 1] = current;
        hasSwapped = true;
        await cb({
          loc: step(9),
          numbers,
          counter,
          i,
          current,
          next,
          hasSwapped,
        });
      }
      counter++;
    }
  } while (hasSwapped);

  await cb({ loc: step(10), numbers, counter, hasSwapped });
  return numbers;
}
