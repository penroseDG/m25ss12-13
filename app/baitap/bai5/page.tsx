import React, { useState, useEffect } from 'react';
import Head from 'next/head';

// Định nghĩa kiểu dữ liệu cho bài viết (nếu cần)
type Post = {
  id: number;
  title: string;
  body: string;
};

// Hàm để fetch dữ liệu bài viết với xử lý lỗi
async function fetchPostsWithError(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/nonexistent-url');
  if (!res.ok) {
    throw new Error('Failed to fetch posts. The URL does not exist.');
  }
  return res.json();
}

// Component để hiển thị trang xử lý lỗi
export default function ErrorHandlingPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPostsWithError();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>Xử lý Lỗi với SSR</title>
      </Head>
      <h1>Xử lý Lỗi với SSR</h1>
      {error ? (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body.slice(0, 100)}...</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}