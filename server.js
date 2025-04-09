
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for the client
app.use(cors());
app.use(express.json());

// Sample database "tables" (in memory for demo)
const airports = [
  { airport_name: 'John F. Kennedy International Airport', city: 'New York', state: 'NY' },
  { airport_name: 'Los Angeles International Airport', city: 'Los Angeles', state: 'CA' },
  { airport_name: "O'Hare International Airport", city: 'Chicago', state: 'IL' },
  { airport_name: 'Hartsfield-Jackson Atlanta International Airport', city: 'Atlanta', state: 'GA' },
  { airport_name: 'Dallas/Fort Worth International Airport', city: 'Dallas', state: 'TX' },
  { airport_name: 'Denver International Airport', city: 'Denver', state: 'CO' }
];

const airlines = [
  { airline_id: 'AA', airline_name: 'American Airlines', airport_name: 'Dallas/Fort Worth International Airport' },
  { airline_id: 'DL', airline_name: 'Delta Air Lines', airport_name: 'Hartsfield-Jackson Atlanta International Airport' },
  { airline_id: 'UA', airline_name: 'United Airlines', airport_name: "O'Hare International Airport" },
  { airline_id: 'SW', airline_name: 'Southwest Airlines', airport_name: 'Dallas Love Field' },
  { airline_id: 'JB', airline_name: 'JetBlue Airways', airport_name: 'John F. Kennedy International Airport' },
  { airline_id: 'AS', airline_name: 'Alaska Airlines', airport_name: 'Seattle-Tacoma International Airport' }
];

const flights = [
  { 
    flight_number: 'FL123', 
    source: 'New York', 
    destination: 'Los Angeles',
    status: 'On Time',
    d_time: '10:00 AM',
    a_time: '1:00 PM',
    connected: 'No',
    duration: '3h',
    airline_id: 'AA',
    airline_name: 'American Airlines'
  },
  { 
    flight_number: 'FL456', 
    source: 'Chicago', 
    destination: 'Miami',
    status: 'Delayed',
    d_time: '12:30 PM',
    a_time: '4:15 PM',
    connected: 'No',
    duration: '3h 45m',
    airline_id: 'DL',
    airline_name: 'Delta Airlines'
  },
  { 
    flight_number: 'FL789', 
    source: 'Dallas', 
    destination: 'Seattle',
    status: 'Boarding',
    d_time: '2:45 PM',
    a_time: '5:30 PM',
    connected: 'Yes',
    duration: '4h 15m',
    airline_id: 'UA',
    airline_name: 'United Airlines'
  }
];

const employees = [
  { 
    e_id: 'E001', 
    name: 'John Smith', 
    address: '123 Main St, Chicago, IL',
    title: 'Flight Attendant',
    destination: 'International',
    salary: '$58,000',
    age: 32,
    dob: '1992-05-15',
    airport_name: "O'Hare International Airport"
  },
  { 
    e_id: 'E002', 
    name: 'Sarah Johnson', 
    address: '456 Park Ave, New York, NY',
    title: 'Pilot',
    destination: 'Domestic',
    salary: '$120,000',
    age: 41,
    dob: '1983-11-22',
    airport_name: 'John F. Kennedy International Airport'
  }
];

const passengers = [
  { 
    passport_number: 'P123456', 
    name: 'Robert Brown', 
    address: '789 Pine St, Boston, MA',
    sex: 'Male',
    dob: '1985-07-22',
    age: 39,
    flight_number: 'FL123',
    ticket_number: 'T78901'
  },
  { 
    passport_number: 'P234567', 
    name: 'Jennifer Lee', 
    address: '456 Oak Ave, Seattle, WA',
    sex: 'Female',
    dob: '1990-04-15',
    age: 34,
    flight_number: 'FL456',
    ticket_number: 'T78902'
  }
];

// API Routes
app.get('/api/airports', (req, res) => {
  res.json(airports);
});

app.get('/api/airlines', (req, res) => {
  res.json(airlines);
});

app.get('/api/flights', (req, res) => {
  res.json(flights);
});

app.get('/api/employees', (req, res) => {
  res.json(employees);
});

app.get('/api/passengers', (req, res) => {
  res.json(passengers);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
