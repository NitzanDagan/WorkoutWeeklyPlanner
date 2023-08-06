import React from "react";
import { styled } from "@mui/material/styles";
import { Grid, Paper, SvgIcon, Box, Typography } from "@mui/material";

import {
  EditCalendar,
  QuizOutlined,
  BarChartOutlined,
  SettingsOutlined,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#c6d2f6",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  maxWidth: "250px",
  height: "250px",
  display: "flex",
  justifyContent: "center",
  borderRadius: "50%",
  flexDirection: "column",
  alignItems: "center",
  margin: "auto",
}));

export default function HomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        padding: "20px",
        backgroundColor: "#ecf0fc",
      }}
    >
      <Grid
        container
        spacing={6}
        columnSpacing={{ xs: 4, sm: 4, md: 4 }}
        justifyContent="center"
        alignItems="center"
        maxWidth="50vw"
      >
        <Grid item xs={12} md={6} lg={6}>
          <Item
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link
              to="/weekcontainer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                My Week
              </Typography>
              <SvgIcon
                component={EditCalendar}
                sx={{ color: "#7a96ea", fontSize: 100 }}
              />
            </Link>
          </Item>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Item>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Quiz
            </Typography>
            <SvgIcon
              component={QuizOutlined}
              sx={{ color: "#7a96ea", fontSize: 100 }}
            />
          </Item>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Item>
            <Link
              to="/summarydialog"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                Summary
              </Typography>
              <SvgIcon
                component={BarChartOutlined}
                sx={{ color: "#7a96ea", fontSize: 100 }}
              />
            </Link>
          </Item>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Item>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Settings
            </Typography>
            <SvgIcon
              component={SettingsOutlined}
              sx={{ color: "#7a96ea", fontSize: 100 }}
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
