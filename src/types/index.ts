export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  maxParticipants: number;
  currentParticipants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Events {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  maxParticipants: number;
  currentParticipants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventId: string;
  registrationDate: string;
}

export interface EventDetail {
  _id: string;
  name: string;
  description: string;
  organisateur: {
    _id: string;
    name: string;
    email: string;
  };
  price: number;
  participants: number;
  location: string;
  date: string;
  event_image: {
    url: string;
    id: string | null;
  };
  createdAt: string;
  updatedAt: string;
}