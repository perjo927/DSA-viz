import { wait } from "./wait";

export async function sort(numbers: Array<number>, onChange) {
  const cb = (args, waitMs = 500) => wait(waitMs).then(() => onChange(args));

  let hasSwapped: boolean;
  let counter = 0;
  let loc: string | null = null;

  loc = "let hasSwapped";
  await cb({ loc, numbers, counter });

  do {
    hasSwapped = false;
    loc = "hasSwapped = false;";
    await cb({ loc, numbers, counter, hasSwapped });

    for (let i = 0; i < numbers.length; i++) {
      loc = "for (let i = 0; i < numbers.length; i++) {";
      await cb({ loc, numbers, counter, i, hasSwapped });

      const current = numbers[i];
      loc = "const current = numbers[i];";
      await cb({ loc, numbers, counter, i, current, hasSwapped });

      const next = numbers[i + 1];
      loc = "const next = numbers[i + 1];";
      await cb({ loc, numbers, counter, i, current, next, hasSwapped });

      loc = "if (current > next) {";
      await cb({ loc, numbers, counter, i, current, next, hasSwapped });
      if (next && current > next) {
        loc = "numbers[i] = next;";
        await cb({ loc, numbers, counter, i, current, next, hasSwapped });
        numbers[i] = next;

        numbers[i + 1] = current;
        loc = "numbers[i + 1] = current;";
        await cb({ loc, numbers, counter, i, current, next, hasSwapped });

        hasSwapped = true;
        loc = "hasSwapped = true;";
        await cb({ loc, numbers, counter, i, current, next, hasSwapped });
      }
      counter++;
    }
  } while (hasSwapped);

  loc = "return numbers;";
  await cb({ loc, numbers, counter, hasSwapped });
  return numbers;
}
