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

const firestoreQueryMock = () => ({
  limit: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  startAfter: jest.fn().mockReturnThis(),
});

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

  describe('paginateQuery', () => {
    let fakeQuery;

    beforeEach(() => {
      fakeQuery = firestoreQueryMock();
    });

    it('should inject pagination conditions to the query', () => {
      const options = {
        limit: 10,
        page: 3,
        orderBy: 'name',
      };

      utils.paginateQuery(fakeQuery, options);

      expect(fakeQuery.limit).toHaveBeenCalledWith(10);
      expect(fakeQuery.orderBy).toHaveBeenCalledWith('name');
      expect(fakeQuery.startAfter).toHaveBeenCalledWith(10 * (3 - 1));
    });

    it('should allow passing the ordering direction', () => {
      const options = {
        limit: 10,
        page: 3,
        orderBy: ['name', 'desc'],
      };

      utils.paginateQuery(fakeQuery, options);

      expect(fakeQuery.limit).toHaveBeenCalledWith(10);
      expect(fakeQuery.orderBy).toHaveBeenCalledWith('name', 'desc');
      expect(fakeQuery.startAfter).toHaveBeenCalledWith(10 * (3 - 1));
    });

    it('should throw an exception on invalid options', () => {
      const options = {
        limit: 0,
        page: 3,
        orderBy: 'name',
      };

      expect(() => utils.paginateQuery(fakeQuery, options)).toThrowError(
        'Limit should be a positive integer.'
      );

      expect(fakeQuery.limit).not.toHaveBeenCalled();
      expect(fakeQuery.orderBy).not.toHaveBeenCalled();
      expect(fakeQuery.startAfter).not.toHaveBeenCalled();
    });
  });
});
