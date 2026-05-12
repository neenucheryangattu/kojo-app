# Kojo App

A React Native mobile application built with Expo for discovering content, managing messages, and user profiles.

## Features

- **Authentication**: Secure login and onboarding flow
- **Home Screen**: Main dashboard with user information
- **Discovery**: Browse and discover content
- **Messages**: Real-time messaging functionality
- **User Profile**: Manage user profile and settings
- **Responsive UI**: Custom components including buttons, inputs, and gauges

## Project Structure

```
src/
├── api/                 # API calls and mock data
│   ├── authApi.ts
│   ├── dashboardApi.ts
│   ├── messagesApi.ts
│   ├── profileApi.ts
│   └── mockData.ts
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Gauge.tsx
│   └── Input.tsx
├── context/             # React context for state management
│   └── AuthContext.tsx
├── navigation/          # Navigation configuration
│   ├── MainNavigator.tsx
│   └── TabNavigator.tsx
├── screens/             # Screen components
│   ├── DiscoverScreen.tsx
│   ├── HomeScreen.tsx
│   ├── LoginScreen.tsx
│   ├── MessagesScreen.tsx
│   ├── OnboardingScreen.tsx
│   └── ProfileScreen.tsx
└── theme/               # Theme and styling
    └── theme.ts
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kojo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

## Running the App

### On iOS Simulator
```bash
npm run ios
```

### On Android Emulator
```bash
npm run android
```

### On Physical Device
Use the Expo Go app to scan the QR code displayed in the terminal after running `npm start`.

## Configuration

- **TypeScript**: Configured with `tsconfig.json`
- **Theme**: Centralized theme configuration in `src/theme/theme.ts`
- **App Configuration**: Managed in `app.json`

## Technologies Used

- **React Native** with Expo
- **TypeScript** for type safety
- **React Context API** for state management
- **React Navigation** for screen navigation

## Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Scripts
- `npm start` - Start the development server
- `npm run build` - Build the app
- `npm run test` - Run tests (if configured)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions, please create an issue in the repository or contact the development team.
