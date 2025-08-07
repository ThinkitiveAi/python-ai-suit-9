# Health First - Healthcare Management System

A modern, comprehensive healthcare management application built with React, TypeScript, and Mantine UI. This system provides separate interfaces for healthcare providers and patients, enabling efficient healthcare delivery and patient engagement.

## 🏥 Features

### Provider Dashboard
- **Patient Management**: Complete patient database with search, filtering, and pagination
- **Appointment Scheduling**: Advanced calendar system with month/week/day views
- **Availability Management**: Set up recurring schedules, individual slots, and batch operations
- **Real-time Notifications**: Stay updated with appointment changes and patient communications
- **Quick Actions**: Streamlined workflows for common healthcare tasks

### Patient Portal
- **Secure Login**: Bank-level security for patient health information
- **Personal Dashboard**: Access to medical records and health information
- **Appointment Management**: View and manage upcoming appointments
- **Health Records**: Secure access to medical history and test results

### Authentication System
- **Dual Login System**: Separate portals for providers and patients
- **Secure Token Management**: JWT-based authentication with localStorage
- **Role-based Access**: Different interfaces and permissions for each user type
- **Session Management**: Automatic redirects and logout functionality

## 📊 Dashboard Preview

![Healthcare Dashboard](https://raw.githubusercontent.com/ThinkitiveAi/python-ai-suit-9/refs/heads/dev/health-first-client/project-management-app/image.png)

*The provider dashboard showing key metrics, patient management, and appointment scheduling features.*

## 🛠️ Technology Stack

- **Frontend**: React 19.1.0 with TypeScript
- **UI Framework**: Mantine v7.17.0
- **Routing**: TanStack Router v2.16.0
- **Icons**: Tabler Icons React v3.3.0
- **Build Tool**: Vite v7.0.4
- **Development**: ESLint, TypeScript

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Yarn package manager (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd health-first-client/project-management-app
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔐 Demo Credentials

### Provider Login
- **Email**: `demo@healthcare.com`
- **Password**: `password123`
- **Access**: Provider dashboard with patient management and scheduling

### Patient Login
- **Email**: `patient@healthcare.com`
- **Password**: `patient123`
- **Access**: Patient portal with health information

## 📱 Application Structure

```
src/
├── routes/
│   ├── index.tsx              # Root redirect logic
│   ├── login.tsx              # Provider login interface
│   ├── patient-login.tsx      # Patient login interface
│   ├── dashboard.tsx          # Provider dashboard
│   ├── patient-dashboard.tsx  # Patient dashboard
│   ├── register.tsx           # Provider registration
│   ├── patient-register.tsx   # Patient registration
│   └── provider-availability.tsx # Availability management
├── assets/                    # Static assets
└── main.tsx                   # Application entry point
```

## 🎨 UI/UX Features

### Modern Design
- **Clean Interface**: Professional healthcare-focused design
- **Responsive Layout**: Works seamlessly on desktop and mobile
- **Accessibility**: WCAG compliant components
- **Color-coded Status**: Visual indicators for appointment states

### User Experience
- **Intuitive Navigation**: Easy-to-use interface for healthcare professionals
- **Quick Actions**: Streamlined workflows for common tasks
- **Real-time Updates**: Live notifications and status changes
- **Search & Filter**: Advanced patient and appointment search

## 🔧 Development

### Available Scripts
- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn lint` - Run ESLint
- `yarn preview` - Preview production build
- `yarn router:generate` - Generate router types

### Code Quality
- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code quality and consistency
- **Prettier**: Consistent code formatting
- **Component Architecture**: Reusable, maintainable components

## 🏗️ Architecture

### State Management
- **Local Storage**: Authentication tokens and user data
- **React State**: Component-level state management
- **Form Management**: Mantine Form for complex form handling

### Routing
- **File-based Routing**: TanStack Router with automatic route generation
- **Protected Routes**: Authentication-based route protection
- **Nested Routes**: Organized route structure

### Security
- **Token-based Auth**: JWT-style authentication
- **Route Protection**: Automatic redirects for unauthenticated users
- **Data Validation**: Client-side form validation
- **Secure Storage**: Local storage for session management

## 📊 Key Features

### Provider Features
- **Patient Database**: Comprehensive patient management system
- **Appointment Scheduling**: Advanced calendar with multiple views
- **Availability Management**: Flexible scheduling system
- **Quick Stats**: Dashboard with key metrics
- **Bulk Operations**: Efficient management of multiple records

### Patient Features
- **Secure Access**: Protected health information
- **Health Dashboard**: Personal health overview
- **Appointment Tracking**: View and manage appointments
- **Medical Records**: Access to health history

## 🔮 Future Enhancements

- **Real-time Chat**: Provider-patient communication
- **Telemedicine Integration**: Video consultation capabilities
- **Mobile App**: Native mobile applications
- **API Integration**: Backend service integration
- **Advanced Analytics**: Healthcare analytics and reporting
- **Multi-language Support**: Internationalization
- **Offline Support**: PWA capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Health First** - Empowering healthcare providers and patients with modern, secure, and efficient healthcare management solutions.
