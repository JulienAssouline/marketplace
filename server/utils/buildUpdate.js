const buildUpdate = (input, selector, table) => {
  const validKeys = Object.keys(input).filter(
    key => input[key] != null && key != selector
  );
  const finalString = validKeys
    .map((key, i) => `${key} = $${i + 2}`)
    .join(", ");
  const queryValues = validKeys.map(key => input[key]);
  queryValues.unshift(input[selector]);
  return {
    text: `UPDATE ${table} SET ${finalString} WHERE ${selector} = $1`,
    values: queryValues
  };
};

module.exports = buildUpdate;
