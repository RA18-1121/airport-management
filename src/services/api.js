
const API_BASE_URL = '/api';

// Sample data for fallback when API is not available
const mockAirports = [
  { airport_name: 'John F. Kennedy International Airport', city: 'New York', state: 'NY' },
  { airport_name: 'Los Angeles International Airport', city: 'Los Angeles', state: 'CA' },
  { airport_name: "O'Hare International Airport", city: 'Chicago', state: 'IL' },
  { airport_name: 'Hartsfield-Jackson Atlanta International Airport', city: 'Atlanta', state: 'GA' },
  { airport_name: 'Dallas/Fort Worth International Airport', city: 'Dallas', state: 'TX' },
  { airport_name: 'Denver International Airport', city: 'Denver', state: 'CO' }
];

const mockAirlines = [
  { airline_id: 'AA', airline_name: 'American Airlines', airport_name: 'Dallas/Fort Worth International Airport' },
  { airline_id: 'DL', airline_name: 'Delta Air Lines', airport_name: 'Hartsfield-Jackson Atlanta International Airport' },
  { airline_id: 'UA', airline_name: 'United Airlines', airport_name: "O'Hare International Airport" },
  { airline_id: 'SW', airline_name: 'Southwest Airlines', airport_name: 'Dallas Love Field' },
  { airline_id: 'JB', airline_name: 'JetBlue Airways', airport_name: 'John F. Kennedy International Airport' }
];

const mockFlights = [
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
  }
];

const mockEmployees = [
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
  }
];

const mockPassengers = [
  { 
    passport_number: 'P123456', 
    name: 'Robert Brown', 
    address: '789 Pine St, Boston, MA',
    sex: 'Male',
    dob: '1985-07-22',
    age: 39,
    flight_number: 'FL123',
    ticket_number: 'T78901'
  }
];

// Helper function to handle API requests with fallback to mock data
const fetchWithFallback = async (endpoint, mockData) => {
  try {
    console.log(`Fetching from: ${API_BASE_URL}${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      console.warn(`API returned status ${response.status} for ${endpoint}, using mock data`);
      return mockData;
    }
    
    return await response.json();
  } catch (error) {
    console.warn(`Error fetching from ${endpoint}, using mock data:`, error);
    return mockData;
  }
};

// API service functions
export const getAirports = async () => {
  return await fetchWithFallback('/airports', mockAirports);
};

export const getAirlines = async () => {
  return await fetchWithFallback('/airlines', mockAirlines);
};

export const getFlights = async () => {
  return await fetchWithFallback('/flights', mockFlights);
};

export const getEmployees = async () => {
  return await fetchWithFallback('/employees', mockEmployees);
};

export const getPassengers = async () => {
  return await fetchWithFallback('/passengers', mockPassengers);
};

// Add functions to handle data creation, update, and deletion
export const addAirport = async (airport) => {
  // In a real app, this would send a POST request to the server
  console.log('Adding airport:', airport);
  return { success: true, data: airport };
};

export const deleteAirport = async (airportName) => {
  // In a real app, this would send a DELETE request to the server
  console.log('Deleting airport:', airportName);
  return { success: true };
};

export const addAirline = async (airline) => {
  console.log('Adding airline:', airline);
  return { success: true, data: airline };
};

export const deleteAirline = async (airlineId) => {
  console.log('Deleting airline:', airlineId);
  return { success: true };
};

export const addFlight = async (flight) => {
  console.log('Adding flight:', flight);
  return { success: true, data: flight };
};

export const deleteFlight = async (flightNumber) => {
  console.log('Deleting flight:', flightNumber);
  return { success: true };
};

export const addEmployee = async (employee) => {
  console.log('Adding employee:', employee);
  return { success: true, data: employee };
};

export const deleteEmployee = async (employeeId) => {
  console.log('Deleting employee:', employeeId);
  return { success: true };
};

export const addPassenger = async (passenger) => {
  console.log('Adding passenger:', passenger);
  return { success: true, data: passenger };
};

export const deletePassenger = async (passportNumber) => {
  console.log('Deleting passenger:', passportNumber);
  return { success: true };
};
