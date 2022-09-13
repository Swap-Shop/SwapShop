import React from "react";
import { ImageBackground, SafeAreaView, Text, View,  Image, FlatList } from 'react-native';
import PostCard from '../components/PostCard';
import {Container
} from '../styles/HomePageStyle';

const Posts = [
   {
     id: '1',
     userName: 'Jenny Doe',
     userImg: require('../assets/Image/userProfilePicture.jpg'),
     postTime: '4 mins ago',
     post:
       'Hey there, this is my test for a post of my social app in React Native.',
       postImg: require('../assets/Image/post-img-1.jpg'),
   },
   {
     id: '2',
     userName: 'John Doe',
     userImg: require('../assets/Image/userProfilePicture2.jpg'),
     postTime: '2 hours ago',
     post:
       'Hey there, this is my test for a post of my social app in React Native.',
       postImg: require('../assets/Image/post-img-4.jpg'),
   },
   {
     id: '3',
     userName: 'Ken William',
     userImg: require('../assets/Image/userProfilePicture.jpg'),
     postTime: '1 hours ago',
     post:
       'Hey there, this is my test for a post of my social app in React Native.',
       postImg: require('../assets/Image/post-img-1.jpg'),
   },
   {
     id: '4',
     userName: 'Selina Paul',
     userImg: require('../assets/Image/userProfilePicture.jpg'),
     postTime: '1 day ago',
     post:
       'Hey there, this is my test for a post of my social app in React Native.',
       postImg: require('../assets/Image/post-img-1.jpg'),
   },
   {
      id: '5',
      userName: 'Caribbean Joe',
      userImg: require('../assets/Image/userProfilePicture3.jpg'),
      postTime: '7 day ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
        postImg: require('../assets/Image/post-img-3.jpg'),
    },
 ];

const Home = () => 
{
   return(
         <Container>
            <FlatList
            data={Posts}
            renderItem = {({item}) => <PostCard item={item} />}
            keyExtractor = {item=>item.id}
            />
         </Container>
   );

}
export default Home;