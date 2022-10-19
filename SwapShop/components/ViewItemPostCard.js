import React from "react";
import { View } from "react-native";
import {Card, 
    UserInfo, 
    UserImg, 
    UserName, 
    UserInfoText, 
    PostTime,
    PostText,
    PostImg,
    InteractionWrapper,
    Interaction,
    InteractionText,
 } from '../styles/HomePageStyle';
 import Icon from 'react-native-vector-icons/Ionicons';
 import auth from '@react-native-firebase/auth';



const ViewRequestPostCard = ({item}) => {
   const user = auth().currentUser;

    return(
      <Card key={item.id} style={{     backgroundColor: '#D3D3D3',}}>
         <View style = {{width: 400}}>
            <UserInfoText>
            <PostText>{item.ProductName} </PostText>
            <PostImg source={{uri:item.ProductImg}} />
            <PostText>{item.ProductDescription} </PostText>
            </UserInfoText>
         </View>
      </Card>
    );

};

export default ViewRequestPostCard;