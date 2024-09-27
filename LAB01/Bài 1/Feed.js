import React, { useState } from 'react';
import { ScrollView, Button, View } from 'react-native';
import Post from './Post';
const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'Elon Musk',
      pfp: 'https://futureoflife.org/wp-content/uploads/2020/08/elon_musk_royal_society.jpg',
      content: 'I finally found my long lost brother',
      image: 'https://s1.cdn.autoevolution.com/images/news/gallery/musk-s-chinese-doppelganger-yilong-ma-has-been-banned-from-local-social-media_3.jpg',
      likes: 6969,
      comments: 666,
      shares: 999,
      isLike: false,

    },
    {
      id: 2,
      username: 'Elon Musk',
      pfp: 'https://futureoflife.org/wp-content/uploads/2020/08/elon_musk_royal_society.jpg',
      content: 'I also found my another brother',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy3jagRFQFcUgw4vG4OXTsl2FDP1sm0uWnDc7E-yZlb4v8fV7tCFcRMxp_1qJeLqGBgeU&usqp=CAU',
      likes: 1945,
      comments: 8,
      shares: 19,
      isLike: false,

    },
    {
      id: 3,
      username: 'Donald Rum',
      pfp: 'https://pbs.twimg.com/media/Dfdy6tYWAAASm69.jpg',
      content: 'America fuck yeah',
      image: 'https://img.etimg.com/thumb/width-1200,height-1200,imgsize-64206,resizemode-75,msid-113311534/news/new-updates/springfield-ohio-becomes-meme-central-as-donald-trumps-debunked-pet-eating-claim-fuels-simpsons-parodies.jpg',
      likes: 6969,
      comments: 666,
      shares: 999,
      isLike: false,

    },
  ]);

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          isLike: !post.isLike,
          likes: post.isLike ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };
  const handleComment = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  }
  const handleShare = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          shares: post.shares + 1,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  }

  return (
    <ScrollView>
      {posts.map((post) => (
        <View key={post.id}>
          <Post
            pfp={post.pfp}
            username={post.username}
            content={post.content}
            image={post.image}
            likes={post.likes}
            comments={post.comments}
            shares={post.shares}
            handleLike={() => handleLike(post.id)}
            isLike={post.isLike}
            handleComment={() => handleComment(post.id)}
            handleShare={() => handleShare(post.id)}

          />
        </View>
      ))}
    </ScrollView>
  );
};

export default Feed;
