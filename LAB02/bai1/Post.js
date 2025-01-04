import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons/faThumbsUp'
import { faComment } from '@fortawesome/free-regular-svg-icons/faComment'
import { faShareSquare } from '@fortawesome/free-regular-svg-icons/faShareSquare'


const Post = ({ pfp, username, content, image, likes, comments, shares, handleLike, isLike, handleComment, handleShare }) => {
  return (
    <View style={styles.post}>
      <View style={styles.userInfo}>
        <Image style={styles.pfp} source={{ uri: pfp }} />
        <Text style={styles.username}>{username}</Text>
      </View>
      <Text style={styles.content}>
        {content}
      </Text>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.postInfo}>
        <Text style={styles.postInteractionInfo}>{likes} Likes</Text>
        <Text style={styles.postInteractionInfo}>{comments} Comments</Text>
        <Text style={styles.postInteractionInfo}>{shares} Shares</Text>
      </View>
      <View style={styles.hr} />
      <View style={styles.interaction}>
        <TouchableOpacity onPress={(handleLike)}>
          <Text style={[styles.buttonText, isLike ? styles.liked : null]}>
            <FontAwesomeIcon icon={faThumbsUp} size={18} style={isLike ? styles.liked : null} /> Like
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={(handleComment)} >
          <Text style={styles.buttonText}> <FontAwesomeIcon icon={faComment} size={18} /> Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={(handleShare)} >
          <Text style={styles.buttonText}> <FontAwesomeIcon icon={faShareSquare} size={18} /> Share</Text>
        </TouchableOpacity>
      </View>

    </View>

  );
};


const styles = StyleSheet.create({
  post: {
    backgroundColor: 'white',
    marginHorizontal: 12,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pfp: {
    width: 50,
    height: 50,
    alignContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderRadius: 60 / 2,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    marginVertical: 12,
    fontWeight: '500',
    fontSize: 17,
  },
  image: {
    minHeight: 200,
    maxHeight: 500,
    minWidth: 300,
    maxWidth: 600, 
    resizeMode: 'contain',
    backgroundColor: 'black',
    borderRadius: 10,
  },
  postInfo: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postInteractionInfo: {
    paddingHorizontal: 35,
    color: '#A9A9A9',
    fontSize: 13,
    fontWeight: '500',

  },
  hr: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  interaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 10,
    fontSize: 18,

  },
  liked: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default Post;

