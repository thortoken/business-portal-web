export const upperCaseFirst = string =>
  `${string.charAt(0).toUpperCase()}${string.substr(1).toLowerCase()}`;

export const toTitleCase = string => string.replace(/\w\S*/g, upperCaseFirst);
