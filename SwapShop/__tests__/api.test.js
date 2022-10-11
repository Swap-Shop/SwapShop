const api = require('../api');

test('adds 1 + 2 to equal 3', () => {
  expect(api(1, 2)).toBe(3);
});
describe.each([
  {
    library: '@google-cloud/firestore',
    mockFunction: 'mockGoogleCloudFirestore',
  },
  {
    library: '@react-native-firebase/firestore',
    mockFunction: 'mockReactNativeFirestore',
  },
])('mocking %i with %i', ({library, mockFunction}) => {
  const FirestoreMock = require('firestore-jest-mock');

  const flushPromises = () => new Promise(setImmediate);
  const {Timestamp} = require('../mocks/timestamp');
  const {
    mockGet,
    mockSelect,
    mockAdd,
    mockSet,
    mockUpdate,
    mockWhere,
    mockCollectionGroup,
    mockBatch,
    mockBatchCommit,
    mockBatchDelete,
    mockBatchUpdate,
    mockBatchSet,
    mockSettings,
    mockOnSnapShot,
    mockListCollections,
    mockTimestampNow,
  } = require('../mocks/firestore');

  describe('api testing', () => {
    FirestoreMock[mockFunction]({
      database: {
      
        Products: [
          {
            Post_Time: '24 sep 2022',
            Product_Description:
              'A blue water bottle that is used to store water. The size of the bottle is 800ml, the cap is a bit damaged but does a good job at the end of the day.',
            Product_Name: 'Bottle',
            Product_URL:
              'https://firebasestorage.googleapis.com/v0/b/swapshop-6bd9b.appspot.com/o/74fcfffa-0c6e-4a80-8912-1f010f4f8eea.jpg?alt=media&token=b2029524-d21f-4c24-b97d-f973fb04b6f8',
            firstname: 'swap',
            surname: 'shop',
            userId: 'k7tFbwBZE4T19eooPmaSrG2IANJ3',
          },
        ],
        User: [
          {
            email: 'swapshop@gmail.com',
            firstname: 'swap',
            surname: 'shop',
          },
        ],
        Wishlist: [
          {
            Product_Description: 'A place to study',
            Product_Img:
              'https://firebasestorage.googleapis.com/v0/b/swapshop-6bd9b.appspot.com/o/792b32c0-f70a-4d71-a673-c32206a9c3b0.jpg?alt=media&token=b2b995ea-b622-4c0b-87b1-ec865699bd81',
            Product_Name: 'Study room',
            Product_Owner: 'swap shop',
            userId: 'k7tFbwBZE4T19eooPmaSrG2IANJ3',
          },
        ],
    
      },
    });

    beforeEach(() => {
      this.Firestore = require(library).Firestore;
    });

    afterEach(() => mockTimestampNow.mockClear());

    // test('We can start an application', async () => {
    //   const firestore = new this.Firestore();
    //   firestore.settings({ ignoreUndefinedProperties: true });
    //   expect(mockSettings).toHaveBeenCalledWith({ ignoreUndefinedProperties: true });
    // });

    describe('Examples from documentation', () => {
      test('collection all all the user wishlist information from the database', () => {
        const firestore = new this.Firestore();

        return firestore
          .collectionGroup('Wishlist')
          .where('userId')
          .get()
          .then(querySnapshot => {
            expect(querySnapshot.forEach).toBeTruthy();
            expect(querySnapshot.docs.length).toBe(1);
            expect(querySnapshot.size).toBe(querySnapshot.docs.length);

            querySnapshot.forEach(doc => {
              expect(doc.exists).toBe(true);
              expect(doc.data()).toBeTruthy();
            });
          });
      });
      test('add a product data to the database', () => {
        const firestore = new this.Firestore();

        return firestore
          .collection('users')
          .add({
            Post_Time: '28 sep 2022',
            Product_Description:
              'A double sized bed',
            Product_Name: 'Bed',
            Product_URL:
              'https://firebasestorage.googleapis.com/v0/b/swapshop-6bd9b.appspot.com/o/74fcfffa-0c6e-4a80-8912-1f010f4f8eea.jpg',
            firstname: 'swapped',
            surname: 'shops',
            userId: 'abc15',
          })
          .then(function (docRef) {
            // expect(mockAdd).toHaveBeenCalled();
            expect(docRef).toHaveProperty('id');
          });
      });
    

     


     
      });
  
  });
});
