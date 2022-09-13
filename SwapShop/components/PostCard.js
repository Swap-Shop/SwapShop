import React from "react";
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


const PostCard = ({item}) => {
    return(
        <Card>
               <UserInfo>
                  <UserImg source = {item.userImg}/>
                  <UserInfoText>
                  <UserName> {item.userName} </UserName>
                  <PostTime> {item.postTime}</PostTime>
                  </UserInfoText>
               </UserInfo>
               <PostText>
                  {item.post}
               </PostText>
               <PostImg source = {item.postImg}/>
               <InteractionWrapper>
                  <Interaction>
                     <Icon name = "chatbox-outline" size={20} color={"#000000"}/>
                     <InteractionText> Message </InteractionText>
                  </Interaction>
               </InteractionWrapper>
            </Card>
    );

};

export default PostCard;