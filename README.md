# Veyra Vendor App

A React Native mobile application for vendors to register and manage their services on the Veyra platform.

## Features

- **Vendor Registration Flow**
  - Email-based account creation
  - Password setup with validation
  - Business information collection
  - Google Sign-In integration
  - Multi-language support

- **UI Components**
  - Reusable Button component with multiple variants
  - Input component with focus states and validation
  - Progress bar for multi-step flows
  - Language selector with modal popup
  - Password requirements validator

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Supabase
1. Create a Supabase project at https://supabase.com
2. Update `src/config/supabase.js` with your project URL and anon key:
   ```javascript
   const supabaseUrl = 'YOUR_SUPABASE_URL';
   const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
   ```

### 3. Add Fonts
1. Download Geist font from https://vercel.com/font
2. Add the following font files to `assets/fonts/`:
   - Geist-Regular.ttf
   - Geist-Medium.ttf
   - Geist-SemiBold.ttf
   - Geist-Bold.ttf

### 4. Run the App
```bash
npm start
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.js
│   ├── Input.js
│   ├── ProgressBar.js
│   ├── LanguageSelector.js
│   └── PasswordRequirements.js
├── screens/            # App screens
│   ├── CreateAccountScreen.js
│   ├── SetupPasswordScreen.js
│   └── AboutBusinessScreen.js
├── navigation/         # Navigation configuration
│   └── AppNavigator.js
└── config/            # App configuration
    └── supabase.js
```

## Design System

- **Primary Color**: #EF6C4D
- **Font**: Geist
- **Icons**: Remix Icons (via react-native-vector-icons)

## Authentication Flow

1. **Create Account**: Email validation and language selection
2. **Setup Password**: Password validation with requirements
3. **About Business**: Business information collection with progress tracking

## Next Steps

- Add remaining onboarding screens
- Implement dashboard
- Add service category selection
- Integrate payment setup
- Add profile management
