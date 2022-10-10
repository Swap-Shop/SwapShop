import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
// import SearchBar from 'react-native-dynamic-search-bar';

const SearchPage = ({navigation}) => {
  const [filterdData, setfilterdData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState('');
  const list = [];
  const [data, setData] = useState({
    // variable declarations
    id: '',
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    // another get request to get the data from the database
    await firestore()
      .collection('Products')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          list.push({
            id: doc.id,
            userName: doc.data().firstname + ' ' + doc.data().surname,
            post_name: doc.data().Product_Name,
            post_desc: doc.data().Product_Description,
          });
        });
        setfilterdData(list);
        setMasterData(list);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getId = doc_id => {
    data.id = doc_id;
    navigation.navigate('ViewPostPage', {
      paramKey: data.id,
    });
  };

  const ItemView = ({item}) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 25,
          marginTop: 15,
          borderWidth: 0,
          borderColor: '#A9A9A9',
          borderRadius: 10,
          width: 350,
          height: 60,
          backgroundColor: '#F2F3F4',
        
        
          opacity: 2,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
          // textAlignVertical: 'center',
        }}>
        <Text
          style={{
            color: '#212121',
            fontSize: 15,
            fontStyle: 'normal',
            fontWeight: '900',
          }}

          onPress={() => getId(item.id)}>
          {'Product name: '} {item.post_name}
          {'\n'}
          {/* {'Post owner: '} {item.userName}
          {'\n'}
          {'Post description: '} {item.post_desc} */}
        </Text>
      </View>
    );
  };
  const ItemSeparatorView = () => {
    // used to separate the information in the search list
    return (
      <View style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}} />
    );
  };
  const searchFilter = text => {
    // used to filter the search list.
    if (text) {
      const newData = masterData.filter(item => {
        const itemData = item.post_name
          ? item.post_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterdData(newData);
      setSearch(text);
    } else {
      setfilterdData(masterData);
      setSearch(masterData);
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: '#DFDFDE'}}>
      <Text
        style={{
          fontSize: 15,
          color: '#000',
          fontStyle: 'italic',
          fontWeight: 'bold',
          marginLeft: 15,
        }}>
        Couldn't find what you were looking for? No problem try search for an
        item here...
      </Text>
      <View style={style.inputProductName}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor={'#808080'}
          textAlignVertical="center"
          testID='search'
          value={search}
          onChangeText={text => searchFilter(text)}
        />
      </View>
      {/* <SearchBar
        fontColor="#c6c6c6"
        iconColor="#c6c6c6"
        shadowColor="#282828"
        cancelIconColor="red"
        backgroundColor="#7f8084"
        placeholder="Search here"
        value={search}
        onChangeText={text => searchFilter(text)}
        onClearPress={() => searchFilter('')}
        onPress={() => alert('onPress')}
        style={{backgroundColor: '#7f8084'}}
      /> */}
      <FlatList
        data={filterdData}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputProductName: {
    marginLeft: 15,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: '#A9A9A9',
    width: 380,
    backgroundColor: '#FFFFFF',
    margin: 10,
    color: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },
  inputProductName2: {
    marginLeft: 15,
    borderWidth: 2,
    borderColor: '#A9A9A9',
    borderRadius: 10,
    width: 380,
    height: 100,
    backgroundColor: '#FFFFFF',
    margin: 3,
    color: '#000',
    textAlignVertical: 'center',
    alignSelf: 'center',
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginLeft: 20,
  },
  searchIcon: {
    marginLeft: 265,
    top: 20,
  },
});
export default SearchPage;
