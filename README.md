# TalkCure - bridges the gap between people and counsellors.

A modern Next.js application for booking online psychotherapy sessions with qualified therapists.

## Features

- **Multi-step Booking Form**: Intuitive 5-step booking process
- **Therapist Profiles**: Detailed profiles with specializations, ratings, and availability
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: Clean, accessible interface with smooth animations

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React
- **UI Components**: Headless UI

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── book/              # Multi-step booking form
│   ├── therapists/        # Therapist directory
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── Navigation.tsx     # Main navigation
│   ├── Footer.tsx         # Site footer
│   ├── LoadingSpinner.tsx # Loading states
│   └── Notification.tsx   # Toast notifications
├── data/                  # Static data
│   └── therapists.ts      # Therapist and session data
├── lib/                   # Utility functions
│   └── utils.ts           # Class name utilities
└── types/                 # TypeScript type definitions
    └── index.ts           # Shared types
```

## Key Features

### Multi-Step Booking Process

1. **Choose Therapist**: Select from qualified mental health professionals
2. **Session Details**: Choose session type, date, and time
3. **Personal Information**: Provide contact and demographic information
4. **Preferences**: Share therapy goals and previous experience
5. **Confirmation**: Review and confirm booking details

### Therapist Directory

- Comprehensive therapist profiles
- Specializations and certifications
- Ratings and reviews
- Availability and location
- Language support

### Responsive Design

- Mobile-first approach
- Touch-friendly interface
- Accessible navigation
- Optimized for all screen sizes

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

- TypeScript for type safety
- ESLint for code quality
- Consistent code formatting
- Component-based architecture

## Deployment

The application is ready for deployment on platforms like:

- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team or create an issue in the repository.