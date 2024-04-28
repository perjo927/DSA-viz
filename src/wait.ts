export function wait(len) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, len);
  });
}
