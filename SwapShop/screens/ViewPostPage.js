import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Container2} from '../styles/HomePageStyle';
import firestore from '@react-native-firebase/firestore';
import PostCard from '../components/PostCard';
import Icon from 'react-native-vector-icons/Ionicons';

const ViewPostPage = ({route, navigation}) => {
  const [posts, setPosts] = useState(null);
  const [data, setData] = useState({
    // variable declarations
    id: '',
  });
  const list = [];

  console.log(data.id);

  const fetchPosts = async () => {
    // this is a get request made to the database to retrieve the data.
    await firestore()
      .collection('Products')
      .doc(route.params.paramKey)
      .get()
      .then(doc => {
        list.push({
          id: doc.id,
          userID: doc.data().userID,
          userName: doc.data().firstname + ' ' + doc.data().surname,
          userImg: require('../assets/Image/userProfilePicture3.jpg'),
          postTime: doc.data().Post_Time,
          postName: doc.data().Product_Name,
          post: doc.data().Product_Description,
          postImg: doc.data().Product_URL,
        });
      });
    setPosts(list);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container2 style={{backgroundColor: '#F2F3F4'}}>
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

          onPress={() => navigation.navigate('SearchPage')}>
          <Image
            style={{
              width: 20,
              height: 20,
              // bottom: 20,
              // marginLeft: 100,
              fontWeight: 'bold',
            }}
            source={require('../assets/Icon/back-32.png')}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <FlatList
        data={posts}
        renderItem={({item}) => <PostCard item={item} />}
        keyExtractor={item => item.id}
      />
    </Container2>
  );
};
export default ViewPostPage;
