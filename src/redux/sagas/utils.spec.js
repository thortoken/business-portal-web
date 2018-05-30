import * as utils from './utils';

const createFakeDocument = () => ({
  id: 'some-id',
  data() {
    return {
      first: '1',
      second: '2',
      third: '3',
    };
  },
});

const createFakeCollection = length => {
  const collection = [];
  for (let i = 0; i < length; ++i) {
    collection.push(createFakeDocument());
  }
  return { docs: collection };
};

describe('redux: saga utils', () => {
  describe('documentTransformer', () => {
    it('should unpack document data', () => {
      const fakeDocument = createFakeDocument();

      const result = utils.documentTransformer(fakeDocument);

      expect(result).toMatchObject({
        id: 'some-id',
        first: '1',
        second: '2',
        third: '3',
      });
    });
  });

  describe('collectionTransformer', () => {
    it('should call documentTransformer on each document', () => {
      const fakeDocumentTransformer = jest.fn();
      const fakeCollection = createFakeCollection(4);

      utils.collectionTransformer(fakeCollection, fakeDocumentTransformer);

      expect(fakeDocumentTransformer).toHaveBeenCalledTimes(4);
    });

    it('should unpack each document', () => {
      const fakeCollection = createFakeCollection(4);

      const result = utils.collectionTransformer(fakeCollection);

      expect(result.length).toBe(4);
      result.forEach(doc => {
        expect(doc).toMatchObject({
          id: 'some-id',
          first: '1',
          second: '2',
          third: '3',
        });
      });
    });
  });
});
