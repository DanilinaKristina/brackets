module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const openBrackets = bracketsConfig.map((pair) => pair[0]);
  const closeBrackets = bracketsConfig.map((pair) => pair[1]);
  const bracketMap = new Map();
  bracketsConfig.forEach((pair) => {
    const [open, close] = pair;
    bracketMap.set(close, open);
  });
  str.split('').forEach((char) => {
    const isOpen = openBrackets.includes(char);
    const isClose = closeBrackets.includes(char);

    if (isOpen && isClose) {
      if (stack.length > 0 && stack[stack.length - 1] === char) {
        stack.pop();
      } else {
        stack.push(char);
      }
    } else if (isOpen) {
      stack.push(char);
    } else if (isClose) {
      if (stack.length === 0) {
        stack.push('invalid'); // чтобы не упасть, но сохранить false
        return;
      }
      const last = stack.pop();
      if (last !== bracketMap.get(char)) {
        stack.push('invalid');
      }
    }
  });

  return stack.length === 0;
};
