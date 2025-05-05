# Flashcard SaaS

A modern web application that helps you create flashcards from any text using AI. Perfect for students, teachers, and anyone who wants to learn efficiently.

## Features

- **AI-Powered Flashcard Generation**: Simply paste your text and let AI create flashcards for you
- **Interactive Flashcards**: Click to flip between front and back of each card
- **Clean Interface**: Modern and intuitive design for a great user experience
- **Responsive Layout**: Works perfectly on all devices
- **User Authentication**: Secure login and signup using Clerk

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env.local` file
   - Add your API keys for:
     - OpenAI
     - Firebase
     - Clerk

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

1. **Generate Flashcards**:
   - Go to the Generate page
   - Paste your text in the input box
   - Click "Generate Flashcards"
   - View your generated flashcards
   - Click any card to flip it
   - Click "Generate New Set" to create a new set of flashcards

2. **View Flashcards**:
   - Click on any flashcard to flip it
   - View both front and back of each card
   - Cards are displayed in a 3x3 grid

## Technologies Used

- **Frontend**:
  - Next.js
  - Material-UI
  - React
  - Clerk (Authentication)

- **Backend**:
  - Firebase (Database)
  - OpenAI API
  - Next.js API Routes

## Project Structure

```
flashcard-saas/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.js
│   │   ├── generate/
│   │   │   └── page.js
│   │   ├── flashcard/
│   │   │   └── page.js
│   │   ├── flashcards/
│   │   │   └── page.js
│   │   └── page.js
│   ├── firebase.js
│   └── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
