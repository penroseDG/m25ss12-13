import React, { useState, useEffect } from 'react';
import Head from 'next/head';

// Định nghĩa kiểu dữ liệu cho bài viết
type Post = {
  id: number;
  title: string;
  body: string;
};

export default function SearchPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  // Fetch dữ liệu từ API khi trang được tải
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  // Lọc danh sách bài viết dựa trên từ khóa tìm kiếm
  useEffect(() => {
    const results = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchTerm, posts]);

  return (
    <div>
      <Head>
        <title>Tìm Kiếm Bài viết (CSR)</title>
      </Head>
      <h1>Tìm Kiếm Bài viết (CSR)</h1>
      <input
        type="text"
        placeholder="Nhập từ khóa tìm kiếm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
      />
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}