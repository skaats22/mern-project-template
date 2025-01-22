import { useState, useEffect } from 'react';
import * as postService from '../../services/postService';
import './PostListPage.css';
import PostItem from '../../components/PostItem/PostItem';

export default function PostListPage() {

  // If state going to be array, then initialize to []
  const [posts, setPosts] = useState([
    {
      content: 'Hello there from Kate',
      createdAt: '2025-01-22T08:35:22',
      _id: '90asdha9',
      user: {
        name: 'Kate',
        email: 'kate@email.com',
        _id: 'a45fb15',
      },
    },
    {
      content: 'Hello there from Justin',
      createdAt: '2025-01-21T06:35:22',
      _id: '90asdhsdfsda9',
      user: {
        name: 'Justin',
        email: 'justin@email.com',
        _id: 'a45fb16',
      },
    },
  ]);

  useEffect(() => {
    async function fetchPosts() {
      const posts = await postService.index();
      setPosts(posts);
    }
    fetchPosts();
  // Empty dependency array means run this only once after rendering
  }, []);

  const postItems = posts.map((p) => <PostItem key={p._id} post={p} />);

  return (
    <>
      <h1>Post List</h1>
      <section className="post-item-container">{postItems}</section>
    </>
  );
}


