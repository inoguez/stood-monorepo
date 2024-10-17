

# Stood Real-Time Chat

This is a real-time chat application featuring a modern user interface that allows users to communicate seamlessly. It supports user authentication, private messaging, and friend list management.

![Stood Chat UI](https://cdn.dribbble.com/userupload/16912210/file/original-5fc05397c7245fa872f9a588b34fd4f3.png?resize=1728x1117)

## Features

- **Real-time Messaging**: Updates chat messages instantly using Pusher for real-time capabilities.
- **User Authentication**: Secure login system to identify users.
- **Friend List**: Manage friends and private conversations.
- **Modern UI**: Sleek, dark-themed user interface.
- **Responsive Design**: Fully responsive layout that works on all devices.

## Tech Stack

- **Frontend**:
  - HTML5
  - CSS3
  - TypeScript
  - Pusher for real-time communication
- **Backend**:
  - Node.js (version 18+) with Express for server-side logic
  - Turso for database management (real-time database)

## Getting Started

### Prerequisites

- Node.js (version 18+)
- npm or yarn
- Turso account and Pusher account

### Installation

1. Clone the repository:
   ,,
   git clone https://github.com/your-username/stood-chat.git
   cd stood-chat
   ,,

2. Install dependencies:
   ,,
   npm install
   ,,

3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following keys:
     ,,
     PORT=3000
     TURSO_DB_URL=<your-turso-database-url>
     PUSHER_APP_ID=<your-pusher-app-id>
     PUSHER_KEY=<your-pusher-key>
     PUSHER_SECRET=<your-pusher-secret>
     PUSHER_CLUSTER=<your-pusher-cluster>
     JWT_SECRET=<your-secret-key>
     ,,

4. Run the app:
   ,,
   npm start
   ,,

5. Open your browser and navigate to:
   ,,
   http://localhost:3000
   ,,

### Usage

- Sign in or register a new account.
- Add friends to start a private conversation.
- Start chatting with real-time updates.

## Contributing

Feel free to fork this project, make improvements, and submit a pull request! Contributions are welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
