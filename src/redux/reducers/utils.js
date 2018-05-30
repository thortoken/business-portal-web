export const convertDateFields = (firebaseObject, fieldNames) =>
  fieldNames.reduce((acc, fieldName) => {
    if (!acc.hasOwnProperty(fieldName) || typeof acc[fieldName].toDate !== 'function') {
      return acc;
    }

    const formattedDate = acc[fieldName].toDate();
    return { ...acc, [fieldName]: formattedDate };
  }, firebaseObject);
