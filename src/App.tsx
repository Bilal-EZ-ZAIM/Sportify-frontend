import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { EventList } from './components/EventList';
import { ParticipantList } from './components/ParticipantList';
import { RegistrationList } from './components/RegistrationList';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { TeamMembers } from './components/TeamMembers';
import { Pricing } from './components/Pricing';
import { EventDetails } from './components/EventDetails';

const mockEvent = {
  _id: '1',
  name: 'City Marathon 2024',
  description: 'Join us for the biggest marathon event of the year!',
  organisateur: {
    name: 'Sports Organization',
    email: 'contact@sportsorg.com',
  },
  price: 50,
  participants: 500,
  location: 'Central Park',
  date: '2024-03-15T09:00:00.000Z',
  event_image: {
    url: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1470&auto=format&fit=crop',
  },
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/team" element={<TeamMembers />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/events/:id" element={<EventDetails event={mockEvent} />} />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/events"
          element={
            <Layout>
              <EventList />
            </Layout>
          }
        />
        <Route
          path="/participants"
          element={
            <Layout>
              <ParticipantList />
            </Layout>
          }
        />
        <Route
          path="/registrations"
          element={
            <Layout>
              <RegistrationList />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;