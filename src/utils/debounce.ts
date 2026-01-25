export const debounce = (ms, fn) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => fn(...args), ms);
  };
};

export default debounce;
