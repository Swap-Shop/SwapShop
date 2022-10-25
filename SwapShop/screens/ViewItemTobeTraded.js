import React, {useState, useEffect} from 'react';
import {SafeAreaView, Image, FlatList, TouchableOpacity} from 'react-native';
import {Container} from '../styles/HomePageStyle';
import firestore from '@react-native-firebase/firestore';
import PostCard from '../components/ViewItemPostCard';

const ViewItemToBeTraded = ({route, navigation}) => {
  const [posts, setPosts] = useState(null);
  const list = [];

  const fetchPosts = async () => {
    await firestore()
      .collection('ItemToBeTraded')
      .where('CustomerID', '==', route.params.CustomerID)
      .where('OwnerID', '==', route.params.OwnerID)
      .where('TokenID', '==', route.params.ProductID)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          list.push({
            id: doc.id,
            ProductName: doc.data().ProductName,
            ProductDescription: doc.data().ProductDescription,
            ProductImg: doc.data().ProductURL,
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
    setPosts(list);
  };

  useEffect(() => {
    fetchPosts(); //fetch request for posts
  }, []);

  return (
    <Container style={{backgroundColor: '#F2F3F4'}}>
      <SafeAreaView style={{height: 100}}>
        <Image
          style={{
            width: 150,
            height: 60,
            bottom: 20,
            marginLeft: 110,
            fontWeight: 'bold',
          }}
          source={require('../assets/Image/image.png')}
        />
        <TouchableOpacity
          style={{marginRight: 330, bottom: 60, fontWeight: 'bold'}}
          testID="post"
          onPress={() => navigation.navigate('Navigate')}>
          <Image
            style={{
              width: 20,
              height: 20,
              fontWeight: 'bold',
            }}
            source={require('../assets/Icon/back-32.png')}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <FlatList
        data={posts}
        testID="postitem"
        renderItem={({item}) => <PostCard item={item} />}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};
export default ViewItemToBeTraded;
