# Trip Planner

A full-stack web application that helps users plan personalized trips based on their destination, budget, travel duration, and interests.

## Features

- **User Authentication:** Register and log in securely.
- **Explore Countries:** Browse different countries and discover activities.
- **Country Activities:** View activities and experiences available in each country.
- **Trip Planning:** Customize your trip based on destination, duration, number of travelers, and budget.
- **AI-Powered Itinerary:** Generate a personalized day-by-day travel itinerary based on your interests and trip details.

## Technologies Used

### Frontend
- React
- React Router
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Google Gemini API

## Project Structure

```text
Trip-planner/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── frontend/
    └── App/
        ├── src/
        ├── public/
        └── package.json
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SalamShakhatreh/Trip-planner.git
cd Trip-planner
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend/App
npm install
npm run dev
```

### 4. Environment Variables

Configure the required environment variables in a `.env` file inside the backend directory before running the application.

Do not upload your `.env` file or expose API keys and secrets.

## Project Status

**In Development**

## Future Improvements

- Complete deployment and cloud configuration.
- Further improvements to trip planning and user experience.
