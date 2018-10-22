export const getSelectedKeyFromPath = path => {
  if (!path) {
    return '';
  }

  const matches = path.match(/^(\/[^/]*)/);
  return matches ? matches[0] : '';
};

export const getSelectedKeyFromSecondPath = path => {
  if (!path) {
    return '';
  }
  const selected = path.split('/');
  return selected.length === 3 ? selected[2] : '';
};
