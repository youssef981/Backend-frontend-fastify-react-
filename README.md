# Backend-frontend-fastify-react-
Restaurant Portal Slider  This repository contains a full-stack application with a backend built using TypeScript and Fastify.js, serving restaurant data from a PostgreSQL database. The frontend is developed with React and styled-components, featuring a slider component to display restaurant details.

# Restaurant Portal Slider

This repository contains a full-stack application that displays restaurant details in a slider component. The backend is built with TypeScript and Fastify.js, while the frontend is developed using React and styled-components.

## Backend Setup

### Prerequisites

- Node.js
- PostgreSQL

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/youssef981/Backend-frontend-fastify-react-.git
   cd restaurant-portal-slider/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the PostgreSQL database and add connection details in a `.env` file:
   ```plaintext
   DATABASE_URL=http://localhost:19200/api/hotels
   ```

4. Run the server:
   ```bash
   npm run start
   ```

The backend server should now be running on `http://localhost:3000`.

## Frontend Setup

### Prerequisites

- Node.js

### Steps

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The frontend should now be running on `http://localhost:3000`.

## Usage

Navigate to `http://localhost:3000` in your web browser to see the restaurant slider in action. The frontend will fetch restaurant details from the backend and display them in a slider component.


## License

This project is licensed under the MIT License.
