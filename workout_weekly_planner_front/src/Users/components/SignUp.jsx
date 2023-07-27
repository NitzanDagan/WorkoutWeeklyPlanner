import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Alert,
  TextField,
  Box,
  Grid,
  Typography,
  Container
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../../Page/Copyright";
import "../Users.css";

export default function SignUp() {
  const navigate = useNavigate();
  const nameRef = React.useRef("");
  const emailRef = React.useRef("");
  const passwordRef = React.useRef("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const response = await fetch(
        "http://localhost:3006/routes/users/register",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (response.ok) {
        setSuccess("Sign-up successful!");
        localStorage.setItem("user", JSON.stringify(newUser));
        localStorage.setItem("userName", newUser.name);
        setTimeout(() => {
          navigate("/homepage");
        }, 1500);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error(error);
      nameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      setError(error.message);
    }
  };

  return (
    <div className="background-image">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            padding: "30px",
            mt: "50%",
            borderRadius: "4px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="family-name"
                  inputRef={nameRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputRef={emailRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  inputRef={passwordRef}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            {error ? (
              <Alert sx={{ mt: 3, mb: 2 }} severity="error">
                {error}
              </Alert>
            ) : (
              success && (
                <Alert sx={{ mt: 3, mb: 2 }} severity="success">
                  {success}
                </Alert>
              )
            )}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </div>
  );
}
