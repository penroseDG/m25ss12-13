import React from 'react'
// hàm đi lấy dữ liệu bằng cách call API 

async function getUser() {
    const res: any = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    return data
}

export default async function page() {
    const users = await getUser();
    return (
        <div>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
            </ul>
            {users.map((item: any) => {
                return <li key={item.id}>{item.name}</li>
            })}
        </div>
    )
}