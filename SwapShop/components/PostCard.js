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
 import moment from 'moment';


const PostCard = ({item, onDelete, onPress}) => {
   const user = auth().currentUser;

    return(
      <Card key={item.id}>
         <View style = {{width: 400}}>
         <UserInfo>
                  <UserImg source = {item.userImg}/>
                  <UserInfoText>
                  <UserName> {item.userName} </UserName>
                  <PostTime> {moment(item.postTime.toDate()).fromNow()}</PostTime>
                  </UserInfoText>
               </UserInfo>
               <PostText>
                  {item.post}
               </PostText>
               <PostImg source = {{uri: item.postImg}}/>
               <InteractionWrapper>
                  <Interaction>
                     <Icon name = "chatbox-outline" size={20} color={"#000000"}/>
                     <InteractionText> Message </InteractionText>
                  </Interaction>
                  {user.uid == item.userID ? (
                  <Interaction onPress={() => onDelete(item.id)}>
                  <Icon name="trash-outline" size={20} color={"#000000"} />
                  </Interaction>
                  ) : null}
               </InteractionWrapper>
         </View>
      </Card>
    );

};

export default PostCard;