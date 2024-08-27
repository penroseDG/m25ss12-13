import React from 'react';
import Head from 'next/head';

// Định nghĩa kiểu dữ liệu cho bài viết
type Post = {
  id: number;
  title: string;
  body: string;
};

type Params = {
  params: {
    id: string;
  };
};

// Hàm này dùng để tạo các đường dẫn tĩnh với các params cụ thể
export async function generateStaticParams() {
  const ids = [1, 2, 3]; // Xác định các params tĩnh
  return ids.map((id) => ({
    id: id.toString(),
  }));
}

// Hàm lấy dữ liệu từ API dựa trên id
export default async function PostDetail({ params }: Params) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  
  const post: Post = await res.json();

  return (
    <div>
      <Head>
        <title>Chi tiết Bài viết với Static Params</title>
      </Head>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}