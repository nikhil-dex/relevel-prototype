# ReLevel - Personalized Nutrient Tracker

A modern, responsive web application that transforms lab reports into personalized nutrition recommendations and daily meal tracking.

## 🎨 Design Features

- **Color Palette**: Deep Navy (#1E2A38), Warm Yellow (#F9B233), Soft Beige (#F5E9D7), White (#FFFFFF)
- **Style**: Minimal, clean startup design with flat design principles
- **Typography**: Bold, modern typography using Inter font family
- **UI Elements**: Soft card shadows, balanced use of colors, responsive design

## 🚀 Features

### Landing Page
- Hero section with compelling title and tagline
- Feature highlights with icons
- Call-to-action buttons for user engagement

### Lab Report Input
- File upload functionality (PDF, JPG, PNG, DOC, DOCX)
- Manual input fields for key nutrients:
  - Vitamin B12
  - Vitamin D
  - Iron
  - Calcium
  - Magnesium
- Real-time validation and status indicators

### Recommendations
- Card-based food suggestions
- Progress bars for each nutrient
- Detailed descriptions and daily intake goals
- Food recommendations with nutritional context

### Dashboard
- Current vs. target levels comparison
- Weekly progress tracking
- Daily intake tracker with date selection
- Suggested meals for the day
- Overview statistics and progress metrics

## 🛠️ Technology Stack

- **Frontend**: React 18 with modern hooks
- **Routing**: React Router DOM v6
- **Styling**: CSS with CSS custom properties (variables)
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and building
- **Font**: Inter font family for modern typography

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd relevel-nutrient-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

## 🎯 Key Components

### App.jsx
- Main application component with routing
- State management for lab data and recommendations
- Navigation component with active state indicators

### LandingPage.jsx
- Hero section with gradient background
- Feature cards with icons
- Call-to-action sections

### LabReportInput.jsx
- File upload with drag-and-drop styling
- Form inputs for nutrient values
- Real-time status indicators

### Recommendations.jsx
- Progress tracking cards
- Food suggestion tags
- Nutritional information display

### Dashboard.jsx
- Progress charts and visualizations
- Daily meal planning
- Intake tracking interface

## 🎨 Design System

### Color Variables
```css
--deep-navy: #1E2A38      /* Headers, text emphasis */
--warm-yellow: #F9B233    /* CTAs, progress indicators */
--soft-beige: #F5E9D7     /* Backgrounds, subtle elements */
--white: #FFFFFF          /* Cards, content areas */
```

### Typography
- **Primary Font**: Inter (300, 400, 500, 600, 700 weights)
- **Headers**: Bold weights (600-700) with navy color
- **Body Text**: Regular weight (400) with secondary color
- **Responsive**: Clamp functions for fluid typography

### Components
- **Cards**: White background with soft shadows
- **Buttons**: Primary (yellow) and secondary (navy) variants
- **Progress Bars**: Yellow fills with contextual colors
- **Navigation**: Sticky header with active state indicators

## 📱 Responsive Design

- Mobile-first approach
- Grid layouts that adapt to screen size
- Touch-friendly interface elements
- Responsive typography and spacing

## 🔄 State Management

- React hooks for local state
- Props drilling for component communication
- Centralized data flow from App component
- Real-time updates and recommendations generation

## 🚀 Future Enhancements

- User authentication and profiles
- Data persistence with backend integration
- Advanced analytics and reporting
- Meal planning and recipe suggestions
- Integration with wearable devices
- Social features and community support

## 📄 License

This project is created for demonstration purposes. Feel free to use and modify as needed.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**ReLevel**: From Lab Reports to Daily Meals - Your personalized nutrition journey starts here.
