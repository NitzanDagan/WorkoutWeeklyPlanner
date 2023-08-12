import { Card, CardContent, Typography, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getUsers } from "../../../services/Users/getUsers";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    getUsersData();
  }, []);

  return (
    <>
      <Typography
        component="h1"
        variant="h2"
        sx={{ textAlign: "center", paddingTop: 2 }}
      >
        Users List
      </Typography>
      <Grid
        className="scroll-container"
        container
        spacing={4}
        style={{ margin: 5, maxWidth: "95%" }}
        justifyContent="center"
      >
        {users.map((user) => (
          <Grid item xs={6} sm={2} md={2}>
            <Card key={user._id}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Name: {user.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Email: {user.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default UserList;
