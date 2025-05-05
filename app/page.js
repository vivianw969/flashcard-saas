"use client";
import Image from "next/image";
import styles from "./page.module.css";
import {AppBar, Box, Button, Grid, Toolbar, Typography, Container, Paper} from "@mui/material";
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import React from "react";

export default function Home() {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    }}>
      <AppBar position="static" sx={{ 
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}>
        <Toolbar>
          <Typography variant="h6" sx={{ 
            flexGrow: 1,
            fontWeight: 'bold',
            color: 'primary.main',
          }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button 
              color="primary" 
              href="/sign-in"
              sx={{ 
                mr: 2,
                fontWeight: 'bold',
              }}
            >
              Login
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              href="/sign-up"
              sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                }
              }}
            >
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{ 
          textAlign: 'center', 
          my: 8,
          py: 6,
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 4,
          boxShadow: 3,
        }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ 
            fontWeight: 'bold',
            color: 'primary.main',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            mb: 3,
          }}>
            Welcome to Flashcard SaaS
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom sx={{ 
            color: 'text.secondary',
            mb: 4,
          }}>
            The easiest way to create flashcards from your text.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              href="/generate"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                boxShadow: 2,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                '&:hover': {
                  boxShadow: 4,
                  background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                }
              }}
            >
              Get Started
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                }
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>

        <Box sx={{ my: 8 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ 
            mb: 6,
            fontWeight: 'bold',
            color: 'primary.main',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          }}>
            Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ 
                p: 4,
                height: '100%',
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 2,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                }
              }}>
                <Typography variant="h6" gutterBottom sx={{ 
                  fontWeight: 'bold',
                  color: 'primary.main',
                }}>
                  Easy Text Input
                </Typography>
                <Typography color="text.secondary">
                  Just paste your text and we will do the rest. Creating flashcards has never been easier.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ 
                p: 4,
                height: '100%',
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 2,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                }
              }}>
                <Typography variant="h6" gutterBottom sx={{ 
                  fontWeight: 'bold',
                  color: 'primary.main',
                }}>
                  Smart Flashcards
                </Typography>
                <Typography color="text.secondary">
                  Our AI will parse your text and create a set of concise flashcards, perfect for studying.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ 
                p: 4,
                height: '100%',
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 2,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                }
              }}>
                <Typography variant="h6" gutterBottom sx={{ 
                  fontWeight: 'bold',
                  color: 'primary.main',
                }}>
                  Accessible Anywhere
                </Typography>
                <Typography color="text.secondary">
                  Access your flashcards from any device, any time. Study on the go with ease.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ my: 8 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ 
            mb: 6,
            fontWeight: 'bold',
            color: 'primary.main',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          }}>
            Pricing
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6} lg={4}>
              <Paper elevation={3} sx={{ 
                p: 4,
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 2,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                }
              }}>
                <Typography variant="h5" gutterBottom sx={{ 
                  mb: 2,
                  fontWeight: 'bold',
                  color: 'primary.main',
                }}>
                  Basic
                </Typography>
                <Typography variant="h4" gutterBottom sx={{ 
                  mb: 2,
                  fontWeight: 'bold',
                  color: 'primary.main',
                }}>
                  $1/Month
                </Typography>
                <Box sx={{ my: 3 }}>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    ✓ Generate up to 1000 Flashcards per month
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    ✓ Access to basic flashcard features
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    ✓ Single sign-on
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    ✓ 24/7 support
                  </Typography>
                </Box>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  sx={{
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    boxShadow: 2,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    '&:hover': {
                      boxShadow: 4,
                      background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                    }
                  }}
                >
                  Get Started
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
