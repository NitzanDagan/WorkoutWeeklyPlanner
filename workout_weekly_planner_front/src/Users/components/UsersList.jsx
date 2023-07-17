import React, { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3006/api/users/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      {users.map((user) => (
        <div key={user._id}>
          <h3>Name: {user.name}</h3>
          <p>Email: {user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
