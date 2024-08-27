import React from 'react';
import Head from 'next/head';

// Định nghĩa kiểu dữ liệu cho bài viết
type Post = {
  id: number;
  title: string;
  body: string;
};

// Tạo hàm để lấy dữ liệu từ API với SSR
async function fetchPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

// Component để hiển thị trang danh sách bài viết
export default async function PostsPage() {
  // Lấy dữ liệu bài viết
  const posts = await fetchPosts();

  return (
    <div>
      <Head>
        <title>Danh sách Bài viết</title>
      </Head>
      <h1>Danh sách Bài viết</h1>
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
