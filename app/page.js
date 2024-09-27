
"use client";
import Image from "next/image";
import styles from "./page.module.css";
import {AppBar, Box, Button, Grid, Toolbar, Typography, Container} from "@mui/material";
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import React from "react";
export default function Home() {
  return (
      <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

  <Box sx={{textAlign: 'center', my: 4}}>
    <Typography variant="h2" component="h1" gutterBottom>
      Welcome to Flashcard SaaS
    </Typography>
    <Typography variant="h5" component="h2" gutterBottom>
      The easiest way to create flashcards from your text.
    </Typography>
    <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}} href="/generate">
      Get Started
    </Button>
    <Button variant="outlined" color="primary" sx={{mt: 2}}>
      Learn More
    </Button>
  </Box>

        <Box sx={{ my: 6 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 2 }}>
            Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Easy Text Input
              </Typography>
              <Typography>
                Just paste your text and we will do the rest. Creating flashcards has never been easier.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Smart Flashcards
              </Typography>
              <Typography>
                Our AI will parse your text and create a set of concise flashcards, perfect for studying.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Accessible Anywhere
              </Typography>
              <Typography>
                Access your flashcards from any device, any time. Study on the go with ease.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ my: 6 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 2 }}>
            Pricing
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6} lg={4}>
              <Box
                  sx={{
                    p: 3,
                    border: "1px solid",
                    borderColor: (theme) => theme.palette.divider,
                    borderRadius: 2,
                    backgroundColor: (theme) => theme.palette.background.paper,
                    color: (theme) => theme.palette.text.primary,
                    boxShadow: 1,
                    textAlign: "center",
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: (theme) => `0 4px 20px ${theme.palette.grey[500]}`,
                    },
                  }}
              >
                <Typography variant="h5" gutterBottom sx={{ mb: 1 }}>
                  Basic
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
                  $1/Month
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ mb: 1 }}>
                  Basic version
                </Typography>
                <Typography variant="body1" paragraph>
                  Generate up to 1000 Flashcards per month
                </Typography>
                <Typography variant="body1" paragraph>
                  Access to basic flashcard features and limited storage
                </Typography>
                <Typography variant="body1" paragraph>
                  Single sign-on
                </Typography>
                <Typography variant="body1" paragraph>
                  24/7 support
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
);

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    })
    const checkoutSessionJson = await checkoutSession.json()

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.warn(error.message)
    }
  }

}
