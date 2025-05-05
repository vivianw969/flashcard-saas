'use client'

import { useState } from 'react'
import {
    Container,
    TextField,
    Button,
    Typography,
    Box, CardContent, Grid, Card, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@mui/material'
import { doc, collection, getDoc, writeBatch } from 'firebase/firestore'
import { useUser } from '@clerk/nextjs'
import db from '../../firebase'

export default function Generate() {
    const { user } = useUser()
    const [text, setText] = useState('')
    const [flashcards, setFlashcards] = useState([])
    const [setName, setSetName] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [flippedCards, setFlippedCards] = useState({})

    const handleCardClick = (index) => {
        setFlippedCards(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    const handleOpenDialog = () => setDialogOpen(true)
    const handleCloseDialog = () => setDialogOpen(false)
    const saveFlashcards = async () => {
        if (!setName.trim()) {
            alert('Please enter a name for your flashcard set.')
            return
        }

        try {
            const userDocRef = doc(collection(db, 'users'), user.id)
            const userDocSnap = await getDoc(userDocRef)

            const batch = writeBatch(db)

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data()
                const updatedSets = [...(userData.flashcardSets || []), { name: setName }]
                batch.update(userDocRef, { flashcardSets: updatedSets })
            } else {
                batch.set(userDocRef, { flashcardSets: [{ name: setName }] })
            }

            const setDocRef = doc(collection(userDocRef, setName))
            batch.set(setDocRef, { 
                flashcards: flashcards.map(card => ({
                    front: card.front,
                    back: card.back
                }))
            })

            await batch.commit()

            alert('Flashcards saved successfully!')
            handleCloseDialog()
            setSetName('')
        } catch (error) {
            console.error('Error saving flashcards:', error)
            alert('An error occurred while saving flashcards. Please try again.')
        }
    }
    const handleSubmit = async () => {
        if (!text.trim()) {
            alert('Please enter some text to generate flashcards.')
            return
        }

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                body: text,
            })

            if (!response.ok) {
                throw new Error('Failed to generate flashcards')
            }

            const data = await response.json()
            setFlashcards(data)
        } catch (error) {
            console.error('Error generating flashcards:', error)
            alert('An error occurred while generating flashcards. Please try again.')
        }
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                gap: 4,
                p: 4,
                maxWidth: '1200px',
                mx: 'auto',
            }}>
                <Typography variant="h4" component="h1" sx={{ 
                    fontWeight: 'bold',
                    color: 'primary.main',
                    textAlign: 'center',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                }}>
                    Generate Flashcards
                </Typography>

                <Box sx={{ 
                    width: '100%',
                    maxWidth: '800px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 2,
                    p: 3,
                    boxShadow: 3,
                }}>
                    <Typography variant="h6" gutterBottom sx={{ 
                        fontWeight: 'bold',
                        color: 'primary.main',
                        mb: 2,
                    }}>
                        Enter your text
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Paste your text here..."
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(0, 0, 0, 0.1)',
                                    transition: 'border-color 0.3s ease',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'primary.main',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'primary.main',
                                    borderWidth: 2,
                                },
                            },
                            '& .MuiInputBase-input': {
                                fontSize: '1rem',
                                lineHeight: 1.5,
                            },
                        }}
                    />
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        mt: 3,
                        gap: 2,
                    }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            disabled={!text.trim()}
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
                                },
                                '&.Mui-disabled': {
                                    background: 'rgba(0, 0, 0, 0.12)',
                                }
                            }}
                        >
                            Generate Flashcards
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => setText('')}
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
                            Clear
                        </Button>
                    </Box>
                </Box>

                {flashcards.length > 0 && (
                    <Box sx={{ 
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: 2,
                        p: 3,
                        boxShadow: 3,
                    }}>
                        <Typography variant="h6" gutterBottom sx={{ 
                            fontWeight: 'bold',
                            color: 'primary.main',
                            mb: 3,
                        }}>
                            Generated Flashcards
                        </Typography>
                        <Grid container spacing={2}>
                            {flashcards.slice(0, 9).map((card, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card 
                                        onClick={() => handleCardClick(index)}
                                        sx={{ 
                                            height: '200px',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            position: 'relative',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: 6,
                                            },
                                            background: flippedCards[index] 
                                                ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                                                : 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
                                            color: 'white',
                                        }}
                                    >
                                        <CardContent sx={{ 
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            p: 2,
                                            overflowY: 'auto',
                                            '&::-webkit-scrollbar': {
                                                width: '6px',
                                            },
                                            '&::-webkit-scrollbar-track': {
                                                background: 'transparent',
                                            },
                                            '&::-webkit-scrollbar-thumb': {
                                                background: 'rgba(255, 255, 255, 0.3)',
                                                borderRadius: '3px',
                                                '&:hover': {
                                                    background: 'rgba(255, 255, 255, 0.5)',
                                                },
                                            },
                                        }}>
                                            <Typography variant="body1" sx={{ 
                                                wordBreak: 'break-word',
                                                maxHeight: '100%',
                                                overflow: 'auto',
                                                fontSize: '0.9rem',
                                                lineHeight: 1.4,
                                            }}>
                                                {flippedCards[index] ? card.back : card.front}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            mt: 3,
                            gap: 2,
                        }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                disabled={flashcards.length === 0}
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
                                    },
                                    '&.Mui-disabled': {
                                        background: 'rgba(0, 0, 0, 0.12)',
                                    }
                                }}
                            >
                                Generate New Set
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
            <Dialog 
                open={dialogOpen} 
                onClose={handleCloseDialog}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        minWidth: '400px',
                        background: 'linear-gradient(45deg, #f5f7fa 0%, #c3cfe2 100%)',
                    }
                }}
            >
                <DialogTitle sx={{ 
                    fontWeight: 'bold',
                    color: 'primary.main',
                    textAlign: 'center',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                }}>
                    Save Flashcard Set
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        Please enter a name for your flashcard set.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Set Name"
                        type="text"
                        fullWidth
                        value={setName}
                        onChange={(e) => setSetName(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: 'primary.main',
                                },
                                backgroundColor: 'rgba(255,255,255,0.9)',
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button 
                        onClick={handleCloseDialog}
                        sx={{ 
                            color: 'text.secondary',
                            '&:hover': {
                                backgroundColor: 'action.hover',
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={saveFlashcards} 
                        color="primary"
                        variant="contained"
                        sx={{
                            boxShadow: 2,
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            '&:hover': {
                                boxShadow: 4,
                                background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                            }
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

