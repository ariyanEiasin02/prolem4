import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from "firebase/database";
import { Link } from 'react-router-dom';
const TableUser = () => {
  const [userData, setUserData] = useState([]);
  const db = getDatabase();
  useEffect(() => {
    const userRef = ref(db, 'users/');
    onValue(userRef, (snapshot) => {
      let arr =[]
      snapshot.forEach((item)=>{
        arr.push(item.val());
      })
      setUserData(arr)
    });
  }, [])
  const handleBlock = (id) => {
    setUserData(userData.map(item => item.id === id ? { ...item, status: 'blocked' } : item));
  };
  const handleUnblock = (id) => {
    setUserData(userData.map(item => item.id === id ? { ...item, status: 'active' } : item));
  };
  const deleteUser = (id)=>{
    setUserData(userData.filter(user => user.id !== id));
  }
  
  return (
    <div className="container mx-auto mt-10 py-6 px-6">
      <h1 className="text-2xl mb-6 text-center">User Management</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Select</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className='px-6'>
        {userData.map(item => (
            <tr className='' key={item.id}>
              <td className="px-12 py-2"><input type="checkbox" /></td>
              <td className="px-4 py-2 ml-8">{item.username}</td>
              <td className="px-4 py-2">{item.email}</td>
              <td className="px-4 py-2">{item.status}</td>
              <td className="px-4 py-2">
                <button onClick={() => handleBlock(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">Block</button>
                <button onClick={() => handleUnblock(item.id)}  className="bg-green-500 text-white px-2 py-1 ml-2 rounded">Unblock</button>
                <button onClick={() => deleteUser(item.id)} className="bg-gray-500 text-white px-2 py-1 ml-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-8">
        <Link to="/">
        <button className="bg-red-500 text-white px-12 py-2 rounded">Log Out</button>
        </Link>
      </div>
    </div>
  )
}

export default TableUser