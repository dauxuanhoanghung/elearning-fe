import { Container, Grid, Typography } from "@mui/material";
import React from "react";

import logo from "@/assets/logo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <Container>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">HElearn Business</Typography>
            <Typography href="https://www.udemy.com/udemy-business/?locale=en_US&mx_pg=home-page&path=%2F&ref=footer">
              Business
            </Typography>
            <Typography href="https://www.udemy.com/teaching/?ref=teach_footer">
              Teach here
            </Typography>
            <Typography href="https://www.udemy.com/mobile/">
              Get the app
            </Typography>
            <Typography href="https://about.udemy.com/?locale=en-us">
              About us
            </Typography>
            <Typography href="https://about.udemy.com/company?locale=en-us#offices">
              Contact us
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Careers</Typography>
            <Typography href="https://about.udemy.com/careers?locale=en-us">
              Careers
            </Typography>
            <Typography href="https://blog.udemy.com/?ref=footer">
              Blog
            </Typography>
            <Typography href="https://www.udemy.com/support/">
              Help and Support
            </Typography>
            <Typography href="https://www.udemy.com/affiliate/">
              Affiliate
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Legal</Typography>
            <Typography href="https://www.udemy.com/terms/">Terms</Typography>
            <Typography href="https://www.udemy.com/terms/privacy/">
              Privacy policy
            </Typography>
            <Typography href="https://www.udemy.com/sitemap/">
              Sitemap
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <img src={logo} alt="logo" className="footer__image" />
      <Typography variant="body2">
        © {new Date().getFullYear()} Dau Xuan Hoang Hung
      </Typography>
    </>
  );
};

export default Footer;
