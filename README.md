# 🎄 Secret Santa - Firebase Edition

A beautiful, modern Secret Santa gift exchange web application built with React, Vite, and Firebase Firestore. Create groups, invite participants, generate matches, and reveal Secret Santa assignments with festive animations!

![Secret Santa](https://img.shields.io/badge/Christmas-🎅-red?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-12.7.0-FFCA28?style=for-the-badge&logo=firebase)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite)

## ✨ Features

- 🎁 **Create Secret Santa Groups** - Start a new gift exchange with a custom name and admin passcode
- 👥 **Invite Participants** - Share a join link for participants to register with their name, secret code, and wishlist
- 🎲 **Generate Matches** - Automatically assign each person a Secret Santa recipient
- 🎉 **Reveal Assignments** - Participants use their secret code to see who they got (with confetti!)
- ❄️ **Beautiful UI** - Christmas-themed design with glassmorphism effects and snow animations
- 🔄 **Real-time Updates** - Firebase Firestore for instant synchronization across all users
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## 🚀 Live Demo

[Add your deployed link here]

## 📸 Screenshots

### Home Page
Create a new Secret Santa group with a festive, modern interface.

### Admin Dashboard
Manage participants, generate matches, and share invite links.

### Reveal Page
Participants reveal their Secret Santa assignments with confetti!

## 🛠️ Tech Stack

- **Frontend**: React 19.2.0 + Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18 with custom Christmas theme
- **Database**: Firebase Firestore 12.7.0
- **Routing**: React Router DOM 7.11.0
- **Animations**: Canvas Confetti
- **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ and npm installed
- A Firebase project with Firestore enabled
- Git installed on your machine

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/mrsingh2324/Secret_Santa.git
cd Secret_Santa
```

### 2. Install Dependencies

```bash
cd client
npm install
```

### 3. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable **Firestore Database**:
   - Click "Firestore Database" in the sidebar
   - Click "Create Database"
   - Choose "Start in test mode" (for development)
   - Select your preferred location
   - Click "Enable"

4. Get your Firebase config:
   - Go to Project Settings (⚙️ icon)
   - Scroll to "Your apps" section
   - Click the web app icon `</>`
   - Copy the Firebase configuration

5. Update `client/src/firebaseConfig.js` with your Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

### 4. Set Up Firestore Security Rules

In the Firebase Console, go to **Firestore Database → Rules** and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // For development only!
    }
  }
}
```

⚠️ **WARNING**: These rules allow anyone to read/write your database. For production, implement proper authentication and security rules.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🎮 How to Use

### For the Admin (Host):

1. **Create a Group**
   - Enter a group name (e.g., "Office Christmas Party")
   - Set an admin passcode (keep it secret!)
   - Click "Create Group"

2. **Share the Invite Link**
   - Copy the "Join Link" from the admin dashboard
   - Send it to all participants

3. **Generate Matches**
   - Once everyone has joined, enter your admin passcode
   - Click "Generate Matches"
   - Share the "Reveal Link" with participants

### For Participants:

1. **Join the Group**
   - Click the invite link
   - Enter your name
   - Create a secret code (you'll need this later!)
   - Add your wishlist items (optional)
   - Click "Join Exchange"

2. **Reveal Your Match**
   - After matches are generated, visit the reveal link
   - Select your name from the list
   - Enter your secret code
   - See who you got! 🎉

## 📁 Project Structure

```
Secret_Santa/
├── client/                   # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── ParticipantForm.jsx
│   │   │   └── SnowLayout.jsx
│   │   ├── context/         # React Context for state management
│   │   │   └── SantaContext.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── JoinPage.jsx
│   │   │   └── RevealPage.jsx
│   │   ├── firebaseConfig.js # Firebase configuration
│   │   ├── App.jsx          # Main app component
│   │   ├── index.css        # Global styles with Tailwind
│   │   └── main.jsx         # Entry point
│   ├── public/              # Static assets
│   ├── package.json         # Dependencies and scripts
│   └── vite.config.js       # Vite configuration
├── ISSUES_AND_FIXES.md      # Development notes and fixes
└── README.md                # This file
```

## 🎨 Design Features

- **Christmas Color Palette**:
  - Santa Red: `#D42426`
  - Santa Green: `#165B33`
  - Gold: `#F8B229`
  - Snow White: `#F0F4F8`

- **Typography**:
  - Headings: "Mountains of Christmas" (festive font)
  - Body: "Inter" (modern, readable)

- **Effects**:
  - Glassmorphism panels
  - Smooth animations
  - Confetti on reveal
  - Responsive hover states

## 🐛 Troubleshooting

### "Firebase operation timed out"
- Ensure Firestore is enabled in your Firebase Console
- Check your internet connection
- Verify your Firebase config is correct

### "Missing or insufficient permissions"
- Update your Firestore security rules (see step 4 in setup)
- Make sure you clicked "Publish" after updating rules

### Prompt disappears immediately
- This has been fixed in the latest version
- Make sure you're running the latest code

## 📝 Development Notes

See [ISSUES_AND_FIXES.md](./ISSUES_AND_FIXES.md) for detailed documentation of:
- Issues encountered during development
- Solutions implemented
- Firebase setup instructions
- Security considerations

## 🚀 Deployment

### Deploy to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init

# Build the app
cd client
npm run build

# Deploy
firebase deploy
```

### Deploy to Vercel

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Set build command: `cd client && npm run build`
4. Set output directory: `client/dist`
5. Deploy!

## 🔐 Security Recommendations for Production

1. **Enable Firebase Authentication**
2. **Update Firestore Rules**:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /groups/{groupId} {
         allow read: if true;
         allow create: if request.auth != null;
         allow update, delete: if request.auth.uid == resource.data.adminUid;
       }
     }
   }
   ```
3. **Add rate limiting**
4. **Validate input on the backend**
5. **Use environment variables for Firebase config**

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Satyam Singh**
- GitHub: [@mrsingh2324](https://github.com/mrsingh2324)

## 🎁 Acknowledgments

- Built with ❤️ for the holiday season
- Firebase for real-time database
- Tailwind CSS for styling
- Canvas Confetti for festive animations

---

**Happy Holidays! 🎄🎅🎁**

Made with festive cheer in 2024
