export const documentTransformer = doc => ({ id: doc.id, ...doc.data() });
export const collectionTransformer = (snapshot, docTransformer = documentTransformer) =>
  snapshot.docs.map(docTransformer);
