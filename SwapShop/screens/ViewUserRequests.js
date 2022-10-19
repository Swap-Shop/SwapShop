import React, {useEffect, useState} from "react";
import { ImageBackground, 
    SafeAreaView, 
    Text, 
    View,  
    Image,
    TouchableOpacity,
    Alert,
    FlatList,
} 
    from 'react-native';
import {
      Container,
    } from '../styles/HomePageStyle';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import PostCard from '../components/ViewRequestPostCard';

const ViewUserRequestPage = ({navigation}) => 
{
  const [posts, setPosts] = useState(null);
  const [data, setData] = useState({
      // variable declarations
      refreshing: false,
      //TradeOutcome: " ",
    });
    const user = auth().currentUser;
    const  list = [];

    const fetchPosts = async() =>{ // this is a get request made to the database to retrieve the data. 
      await firestore()
      .collection('Trade')
      .where('CustomerID', '==', user.uid)
      .get()
      .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        list.push({
          id: doc.id,
          ProductDescription: doc.data().ProductDescription,
          ProductName: doc.data().ProductName,
          ProductImg: doc.data().ProductImg,
          Outcome: doc.data().Outcome,
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

    return(
      <Container style={{   backgroundColor: '#F2F3F4',}}>
              <SafeAreaView style={{height: 50}}>
                  <Image
                  style={{
                      width: 150,
                      marginLeft:100,
                      height: 60,
                      bottom: 20,
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
              refreshing = {data.refreshing}
              onRefresh = {handleRefresh}
              renderItem={({item}) => <PostCard 
              item={item}
              />}
              keyExtractor={item => item.id}
              />
      </Container>
      )
}
export default ViewUserRequestPage;