module.exports = (strings, ...values) => {
  // returns a string on a single line
  let output = '';
  // interweave the strings with the substitution vars first
  for (let i = 0; i < values.length; i += 1) {
    output += strings[i] + values[i];
  }
  output += strings[values.length];
  // split on newlines
  const lines = output.split(/(?:\r\n|\n|\r)/);
  // rip out the leading whitespace
  return lines.map(line => line.replace(/^\s+/gm, '')).join(' ').trim();
};
