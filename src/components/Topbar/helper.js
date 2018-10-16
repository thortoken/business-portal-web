export const getSelectedKeyFromPath = path => {
  if (!path) {
    return '';
  }

  const matches = path.match(/^(\/[^/]*)/);
  return matches ? matches[0] : '';
};
