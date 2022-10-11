import React, {useEffect, useState} from "react";
import { ImageBackground, 
    SafeAreaView, 
    Text, 
    View, 
    Image, 
    Alert,
    FlatList,
} from 'react-native';
import {
    Container,
  } from '../styles/HomePageStyle';
//import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
//import storage from '@react-native-firebase/storage';
import PostCard from '../components/WishlistPostCard';

const WishlistPage = () => 
{
    const [posts, setPosts] = useState(null);
    const [data, setData] = useState({
        // variable declarations
        refreshing: false
      });
      const user = auth().currentUser;
      const  list = [];

      const fetchPosts = async() =>{ // this is a get request made to the database to retrieve the data. 
        await firestore()
        .collection('Wishlist')
        .where('userID', '==', user.uid)
        .get()
        .then(querySnapshot => {
        querySnapshot.forEach(doc => {
        list.push({
          id: doc.id,
          postDescription: doc.data().Product_Description,
          postuserName: doc.data().Product_Name,
          postOwner: doc.data().Product_Owner,
          postImg: doc.data().Product_Img,
        });
      });
      data.refreshing = false;
    });
    setPosts(list);
    } // adding itms to wishlist

    useEffect(() => {
        fetchPosts();
      }, [])

    const handleRefresh = () => { // this is used to handle the refresh of the screen. 
        data.refreshing = true;
        fetchPosts();
    };

    const deleteFirestoreData = (postID) => { // this code is used to delete data from the database. 
        firestore()
          .collection('Wishlist')
          .doc(postID)
          .delete()
          .then(() => {
            Alert.alert(
              'Product removed from wishlist!',
            );
            fetchPosts();
          })
          .catch((e) => console.log(e));
      }; // deleting items from the wishlist

      const handleDelete = (postID) => { // this is an interactive alert box that is used to confirm whether a user is sure about deleting a post
        Alert.alert(
          'Delete from wishlist',
          'Are you sure?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed!'),
              style: 'cancel',
            },
            {
              text: 'Confirm',
              onPress: () => deleteFirestoreData(postID),
            },
          ],
          {cancelable: false},
        );
      };
      

    return(
    <Container style={{   backgroundColor: '#F2F3F4',}}>
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
            </SafeAreaView>
            <FlatList
            data={posts}
            refreshing = {data.refreshing}
            onRefresh = {handleRefresh}
            renderItem={({item}) => <PostCard 
            item={item}
            onDelete={handleDelete}
            />}
            keyExtractor={item => item.id}
            />
    </Container>
    )
}
export default WishlistPage;