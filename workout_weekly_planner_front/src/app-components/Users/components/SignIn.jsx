import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
// import CheckAndSaveWeekData from "../../MyWeek/components/CheckAndSaveWeekData";
import { signIn } from "../../../services/Users/AuthUser";
import { checkAndSaveWeekData } from "../../../services/MyWeek/checkAndSaveWeekData";
import getWeekNumber from "../../../services/MyWeek/weekNumber";

import {
  Avatar,
  Button,
  Alert,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../../Page/Copyright";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [weekNumber, setWeekNumber] = React.useState("");

  React.useEffect(() => {
    const currentDate = new Date();
    const currentWeekNumber = getWeekNumber(currentDate);
    setWeekNumber(currentWeekNumber);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await signIn(email, password);
      if (data.message === "Sign in successful.") {
        localStorage.setItem("accessToken", data.token);
        localStorage.setItem("userName", data.userName);
        localStorage.setItem("userEmail", data.email);
        if (weekNumber > 0) {
          setSuccess("Sign in successful!");
          setTimeout(() => {
            // navigate("/homepage");
          }, 1500);
          await checkAndSaveWeekData(data.email, data.userName, weekNumber);
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://media.self.com/photos/6398b36c72eb56f726777d06/4:3/w_2560%2Cc_limit/weekly-workout-schedule.jpeg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
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
      </Grid>
    </Grid>
  );
}
