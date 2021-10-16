// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function sleep(miliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, miliseconds);
  });
}
