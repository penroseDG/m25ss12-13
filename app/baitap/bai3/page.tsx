import React, { useEffect, useState } from 'react';
import Head from 'next/head';

// Định nghĩa kiểu dữ liệu cho người dùng
type User = {
  id: number;
  username: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch dữ liệu từ API khi trang được render
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Head>
        <title>Danh sách Người dùng (CSR)</title>
      </Head>
      <h1>Danh sách Người dùng (CSR)</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}