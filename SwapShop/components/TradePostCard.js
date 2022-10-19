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



const TradePostCard = ({item, onDeclined, onAccepted, onImage}) => {
   const user = auth().currentUser;

    return(
      <Card key={item.id}style={{     backgroundColor: '#D3D3D3',}}>
         <View style = {{width: 400}}>
         <UserInfo>
                  <UserImg source = {{uri:item.PostImg}}/> 
                  <UserInfoText>
                  <UserName> {'Product Name:'}{" "} {item.PostName} </UserName>
                  <PostText>
                  {'Product Description:'}{" "}{item.PostDescription}
               </PostText>
                  </UserInfoText>
        </UserInfo>
        
        {item.TradeOutcome == "pending" ? (
        <InteractionWrapper>
            <Interaction onPress={() => onImage(item.ProductID, item.CustomerID, item.OwnerID)}>
                  <Icon name="image-outline" size={20} color={"#000000"} />
        </Interaction>
        <Interaction onPress={() => onDeclined(item.id)}>
                  <Icon name="close-outline" size={20} color={"#000000"} />
        </Interaction>
        <Interaction onPress={() => onAccepted(item.id)}>
                  <Icon name="checkmark-outline" size={20} color={"#000000"} />
        </Interaction>
        </InteractionWrapper>
        ) : null}
        {item.TradeOutcome == "accepted" ? (
        <InteractionWrapper>
            <Interaction onPress={() => onImage(item.ProductID, item.CustomerID, item.OwnerID)}>
                  <Icon name="image-outline" size={20} color={"#000000"} />
        </Interaction>
            <UserName> {'Trade request:'}{" "} {item.TradeOutcome} </UserName>
        </InteractionWrapper>
        ) : null}
        {item.TradeOutcome == "declined" ? (
        <InteractionWrapper>
            <Interaction onPress={() => onImage(item.ProductID, item.CustomerID, item.OwnerID)}>
                  <Icon name="image-outline" size={20} color={"#000000"} />
        </Interaction>
            <UserName> {'Trade request:'}{" "} {item.TradeOutcome} </UserName>
        </InteractionWrapper>
        ) : null}
         </View>
      </Card>
    );

};

export default TradePostCard;