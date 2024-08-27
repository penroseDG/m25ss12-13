import React, { useState, useEffect } from 'react';
import Head from 'next/head';

// Định nghĩa kiểu dữ liệu cho bài viết
type Post = {
  id: number;
  title: string;
  body: string;
};

// Hàm để fetch dữ liệu bài viết bằng SSR
async function fetchPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

// Component để hiển thị trang danh sách bài viết
export default function PostsPage() {
  // Lấy dữ liệu ban đầu bằng SSR
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getInitialPosts = async () => {
      const initialPosts = await fetchPosts();
      setPosts(initialPosts);
    };
    getInitialPosts();
  }, []);

  // Hàm làm mới dữ liệu bằng CSR
  const handleRefresh = async () => {
    try {
      const refreshedPosts = await fetchPosts();
      setPosts(refreshedPosts);
    } catch (error) {
      console.error('Error refreshing posts:', error);
    }
  };

  return (
    <div>
      <Head>
        <title>Danh sách Bài viết với Refresh</title>
      </Head>
      <h1>Danh sách Bài viết với Refresh</h1>
      <button onClick={handleRefresh}>Refresh</button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}