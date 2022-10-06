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



const WishlistPostCard = ({item, onDelete, onPress}) => {
   const user = auth().currentUser;

    return(
      <Card key={item.id}style={{     backgroundColor: '#D3D3D3',}}>
         <View style = {{width: 400}}>
         <UserInfo>
                  <UserImg source = {{uri:item.postImg}}/> 
                  <UserInfoText>
                  <UserName>{'Product Owner:'}{" "} {item.postOwner} </UserName>
                  <UserName> {'Product Name:'}{" "} {item.postuserName} </UserName>
                  <PostText>
                  {'Product Description:'}{" "}{item.postDescription}
               </PostText>
                  </UserInfoText>
        </UserInfo>
        <InteractionWrapper>
        <Interaction onPress={() => onDelete(item.id)}>
                  <Icon name="trash-outline" size={20} color={"#000000"} />
                  </Interaction>
        </InteractionWrapper>
         </View>
      </Card>
    );

};

export default WishlistPostCard;