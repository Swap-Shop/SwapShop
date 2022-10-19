import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import PostCard from '../components/PostCard';
import {
  Container,
  AddPageWrapper,
  AddPageButton,
} from '../styles/HomePageStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const Home = ({navigation}) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    // variable declarations
    refreshing: false
  });
  const  list = [];

  const handleRefresh = () => { // this is used to handle the refresh of the screen. 
    data.refreshing = true;
    fetchPosts();
  };

  const handleDelete = (postID) => { // this is an interactive alert box that is used to confirm whether a user is sure about deleting a post
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postID),
        },
      ],
      {cancelable: false},
    );
  };

  const handleWishlist = (userID, name, product_name, product_description, product_img) => { // this is an interactive alert box that is used to confirm whether a user is sure about deleting a post
    firestore()
      .collection('Wishlist')
      .add({
        userID: userID,
        Product_Owner: name,
        Product_Name: product_name,
        Product_Description: product_description,
        Product_Img: product_img
      })
      .then(() => {
        console.log('Added to wishlist');
        Alert.alert('Added to wishlist');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleTrade = (docID, Customer_userID, Owner_userID,Owner_Name, product_name, product_description, product_img) => {
    firestore()
    .collection('Trade')
    .where('ProductID', '==', docID)
    .where('CustomerID', '==', Customer_userID)
    .get()
    .then(querySnapshot => {
      if(querySnapshot.size == 0)
      {
        navigation.navigate('ItemTobeTradedPage', {
          ProductID: docID,
          OwnerID: Owner_userID,
          CustomerID: Customer_userID,
          OwnerName: Owner_Name,
          ProductName: product_name,
          ProductDescription: product_description,
          ProductImg: product_img,
          Outcome: "pending"
          });
      }
      else
      {
        Alert.alert('Oops! ¯_(ツ)_/¯......', 
        'Item has already been requested for trade',
        )
      }
    })
    .catch(error => {
      console.log(error);
    })
 };

  const deletePost = (postID) => { // this is used to delete it from firebase storage. 
    firestore()
    .collection('Products')
    .doc(postID)
    .get()
    .then((doc) => {
      const postImg = doc.data().Product_URL;

      if(postImg.length == 0){
        deleteFirestoreData(postID);
      }

      let imageRef = storage().refFromURL(postImg);

      imageRef
      .delete()
      .then(() => {
        console.log('Image deleted');
        deleteFirestoreData(postID);
      })
      .catch((e) => {
        console.log(e);
      });
    })
  }

  const deleteFirestoreData = (postID) => { // this code is used to delete data from the database. 
    firestore()
      .collection('Products')
      .doc(postID)
      .delete()
      .then(() => {
        Alert.alert(
          'Post deleted!',
          'Your post has been deleted successfully!',
        );
        fetchPosts();
      })
      .catch((e) => console.log(e));
  };

  const fetchPosts = async() =>{ // this is a get request made to the database to retrieve the data. 
    await firestore()
    .collection('Products')
    .orderBy('Post_Time','desc')
    .get()
    .then(querySnapshot => {
    querySnapshot.forEach(doc => {
    list.push({
      id: doc.id,
      userID: doc.data().userID,
      userName: doc.data().firstname + " " + doc.data().surname,
      userImg: require('../assets/Image/userProfilePicture3.jpg'),
      postTime: doc.data().Post_Time,
      postName: doc.data().Product_Name,
      post: doc.data().Product_Description,
      postImg: doc.data().Product_URL,
    });
  });
  data.refreshing = false;
});
setPosts(list);
}

  useEffect(() => {
    fetchPosts();
  }, [])

  return (
    <Container style={{   backgroundColor: '#F2F3F4',}}>
      <SafeAreaView style={{height: 50}}>
        <Image
          style={{
            width: 150,
            height: 60,
            bottom: 20,
            marginLeft: 100,
            fontWeight: 'bold',
          }}
          source={require('../assets/Image/image.png')}
        />
        <TouchableOpacity
          style={{marginLeft: 310, bottom: 60, fontWeight: 'bold'}}
          onPress={() => navigation.navigate('AddPage')}>
         <Image
          style={{
            width: 30,
            height: 30,
            // bottom: 20,
            // marginLeft: 100,
            fontWeight: 'bold',
          }}
          source={require('../assets/Icon/add-64.png')}
        />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginRight: 310, bottom: 90, fontWeight: 'bold'}}
          onPress={() => navigation.navigate('SearchPage')}>
             <Image
          style={{
            width: 30,
            height: 30,
            // bottom: 20,
            // marginLeft: 100,
            fontWeight: 'bold',
          }}
          source={require('../assets/Icon/search-in.png')}
        />
        </TouchableOpacity>
      </SafeAreaView>
      <FlatList
        data={posts}
        refreshing = {data.refreshing}
        onRefresh = {handleRefresh}
        renderItem={({item}) => <PostCard 
        item={item}
        onDelete={handleDelete}
        onPress = {handleWishlist}
        onTrade = {handleTrade}
        />}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};
export default Home;
