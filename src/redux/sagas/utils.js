export const documentTransformer = doc => ({ id: doc.id, ...doc.data() });
export const collectionTransformer = (snapshot, docTransformer = documentTransformer) =>
  snapshot.docs.map(docTransformer);

export const paginateQuery = (firebaseQuery, { page = 1, limit, orderBy }) => {
  if (limit < 1) {
    throw new Error('Limit should be a positive integer.');
  }
  if (!Array.isArray(orderBy)) {
    orderBy = [orderBy];
  }

  return firebaseQuery
    .limit(limit)
    .orderBy(...orderBy)
    .startAfter(limit * (page - 1));
};
