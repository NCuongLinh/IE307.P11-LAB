import React, { useState } from 'react';
import { ScrollView, Button, View } from 'react-native';
import Post from './Post';


const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'Yan Jizka',
      pfp: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Portrait_of_Niccol%C3%B2_Machiavelli_by_Santi_di_Tito.jpg/373px-Portrait_of_Niccol%C3%B2_Machiavelli_by_Santi_di_Tito.jpg',
      content: 'Beautiful city Warszawa - Poland ❤️',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Aleja_Niepdleglosci_Warsaw_2022_aerial_%28cropped%29.jpg',
      likes: 123,
      comments: 456,
      shares: 789,
      isLike: false,

    },
    {
      id: 2,
      username: 'Elon Musk',
      pfp: 'https://futureoflife.org/wp-content/uploads/2020/08/elon_musk_royal_society.jpg',
      content: 'I finally found my long lost brother',
      image: 'https://s1.cdn.autoevolution.com/images/news/gallery/musk-s-chinese-doppelganger-yilong-ma-has-been-banned-from-local-social-media_3.jpg',
      likes: 1945,
      comments: 8,
      shares: 19,
      isLike: false,

    },
    {
      id: 3,
      username: 'Kat',  
      pfp: 'https://static.wikia.nocookie.net/rfti/images/0/00/El_Gato.jpg/revision/latest?cb=20221116091937',
      content: 'This is why assembly is the best language in the history of mankind and the Earth itself:',
      image: 'https://images3.memedroid.com/images/UPLOADED656/64ec0ef14ad0a.jpeg',
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

  