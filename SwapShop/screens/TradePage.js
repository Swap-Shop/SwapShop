import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import {Container} from '../styles/HomePageStyle';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import PostCard from '../components/TradePostCard';

const TradePage = ({navigation}) => {
  const [posts, setPosts] = useState(null);
  const [data, setData] = useState({
    // variable declarations
    refreshing: false,
    //TradeOutcome: " ",
  });
  const user = auth().currentUser;
  const list = [];

  const fetchPosts = async () => {
    // this is a get request made to the database to retrieve the data.
    await firestore()
      .collection('Trade')
      .where('OwnerID', '==', user.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          list.push({
            id: doc.id,
            OwnerID: doc.data().OwnerID,
            CustomerID: doc.data().CustomerID,
            ProductID: doc.data().ProductID,
            PostDescription: doc.data().ProductDescription,
            PostName: doc.data().ProductName,
            PostImg: doc.data().ProductImg,
            TradeOutcome: doc.data().Outcome,
          });
        });
        data.refreshing = false;
      });
    setPosts(list);
  }; // adding itms to wishlist

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleRefresh = () => {
    // this is used to handle the refresh of the screen.
    data.refreshing = true;
    fetchPosts(); //fetch posts to firebase 
  };

  const Reject = postID => {
    // this code is used to delete data from the database.
    firestore()
      .collection('Trade')
      .doc(postID)
      .update({
        Outcome: 'declined',
      })
      .then(() => {
        Alert.alert('Request declined');
        fetchPosts();
      })
      .catch(e => console.log(e));
  }; // deleting items from the wishlist

  const Accept = postID => {
    // this code is used to delete data from the database.
    firestore()
      .collection('Trade')
      .doc(postID)
      .update({
        Outcome: 'accepted',
      })
      .then(() => {
        Alert.alert('Request accepted');
        fetchPosts();
      })
      .catch(e => console.log(e));
  }; // deleting items from the wishlist

  const handleReject = postID => {
    // this is an interactive alert box that is used to confirm whether a user is sure about deleting a post
    Alert.alert(
      'Reject the request',
      'Are you sure?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => Reject(postID),
        },
      ],
      {cancelable: false},
    );
  };

  const handleAccept = postID => {
    // this is an interactive alert box that is used to confirm whether a user is sure about deleting a post
    Alert.alert(
      'Accept the request',
      'Are you sure?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => Accept(postID),
        },
      ],
      {cancelable: false},
    );
  };

  const ViewItem = (ProductID, CustomerID, OwnerID) => {
    // this code is used to delete data from the database.
    navigation.navigate('ViewItemTobeTradedPage', {
      ProductID: ProductID,
      OwnerID: OwnerID,
      CustomerID: CustomerID,
    });
  };
   //style sheet for elemnts on page
  return (
    <Container style={{backgroundColor: '#F2F3F4'}}>
      <SafeAreaView style={{height: 50}}>
        <Image
          style={{
            width: 150,
            height: 60,
            bottom: 20,
            fontWeight: 'bold',
          }}
          source={require('../assets/Image/image.png')}
        />
        <TouchableOpacity
          testID="post"
          style={{marginLeft: 200, bottom: 60, fontWeight: 'bold'}}
          onPress={() => navigation.navigate('ViewUserRequests')}>
          <Text
            style={{color: 'black', fontWeight: 'bold', fontStyle: 'italic'}}>
            {' '}
            View your trade requests{' '}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <FlatList
        data={posts}
        testID="display"
        refreshing={data.refreshing}
        onRefresh={handleRefresh}
        renderItem={({item}) => (
          <PostCard
            item={item}
            onDeclined={handleReject}
            onAccepted={handleAccept}
            onImage={ViewItem}
          />
        )}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};
export default TradePage;
