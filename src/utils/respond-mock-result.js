const RESPONSE_DELAY = 0;
export function respondMockResult(result, delay = RESPONSE_DELAY) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(result);
    }, delay);
  });
}
