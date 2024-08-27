import React, { useState, useEffect } from 'react';
import Head from 'next/head';

// Định nghĩa kiểu dữ liệu cho bài viết
type Post = {
  id: number;
  title: string;
  body: string;
};

export default function PaginationPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    // Fetch dữ liệu từ API
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      }
    };

    fetchPosts();
  }, []);

  // Tính toán số trang
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Lấy dữ liệu cho trang hiện tại
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Xử lý chuyển trang
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <Head>
        <title>Phân Trang với CSR</title>
      </Head>
      <h1>Phân Trang với CSR</h1>
      <ul>
        {currentPosts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}