let timer: NodeJS.Timeout;

export default function debounce(fn: any, delay: number = 1000) {
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
