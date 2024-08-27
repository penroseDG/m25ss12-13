import React from 'react';
import Head from 'next/head';
import { notFound } from 'next/navigation';

// Định nghĩa kiểu dữ liệu cho bài viết
type Post = {
  id: number;
  title: string;
  body: string;
};

// Hàm để lấy dữ liệu chi tiết bài viết từ API
async function fetchPost(id: string): Promise<Post | null> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) {
    return null;
  }
  return res.json();
}

// Component để hiển thị chi tiết bài viết
export default async function PostDetailPage({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id);

  if (!post) {
    notFound(); // Nếu bài viết không tồn tại, trả về trang 404
  }

  return (
    <div>
      <Head>
        <title>Chi tiết Bài viết</title>
      </Head>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
