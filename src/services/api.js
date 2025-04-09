// src/services/api.js
import { toast } from "sonner"; // Import toast for error feedback

const API_BASE_URL = '/api'; // Assumes Vite proxy is configured

// ADD THESE MOCK DATA DEFINITIONS: --------->
const mockAirports = [
  { airport_name: 'Mock JFK', city: 'New York', state: 'NY' },
  { airport_name: 'Mock LAX', city: 'Los Angeles', state: 'CA' },
  { airport_name: 'Mock ORD', city: 'Chicago', state: 'IL' },
];

const mockAirlines = [
  { airline_id: 'MK', airline_name: 'MockAir', airport_name: 'Mock JFK' },
  { airline_id: 'FC', airline_name: 'FakeConnect', airport_name: 'Mock LAX' },
  { airline_id: 'TE', airline_name: 'Test Jet', airport_name: 'Mock ORD' },
];

const mockFlights = [
  { flight_number: 'MK101', source: 'Mock JFK', destination: 'Mock LAX', status: 'On Time', d_time: '09:00 AM', a_time: '12:00 PM', connected: 'No', duration: '5h', airline_id: 'MK', airline_name: 'MockAir' },
  { flight_number: 'FC202', source: 'Mock LAX', destination: 'Mock ORD', status: 'Delayed', d_time: '01:00 PM', a_time: '06:30 PM', connected: 'No', duration: '4h 30m', airline_id: 'FC', airline_name: 'FakeConnect' },
  { flight_number: 'TE303', source: 'Mock ORD', destination: 'Mock JFK', status: 'Scheduled', d_time: '03:00 PM', a_time: '06:00 PM', connected: 'No', duration: '2h', airline_id: 'TE', airline_name: 'Test Jet' },
];

const mockEmployees = [
  { e_id: 'M001', name: 'Mock Employee 1', address: '1 Test St', title: 'Tester', destination: 'Domestic', salary: '$50,000', age: 30, dob: '1994-01-01', airport_name: 'Mock JFK' },
  { e_id: 'M002', name: 'Mock Employee 2', address: '2 Debug Dr', title: 'Developer', destination: 'International', salary: '$80,000', age: 35, dob: '1989-01-01', airport_name: 'Mock LAX' },
];

const mockPassengers = [
  { passport_number: 'MPASS1', name: 'Mock Passenger 1', address: '3 Sample Ave', sex: 'Male', dob: '1990-01-01', age: 34, flight_number: 'MK101', ticket_number: 'MTKT1' },
  { passport_number: 'MPASS2', name: 'Mock Passenger 2', address: '4 Demo Pl', sex: 'Female', dob: '1995-01-01', age: 29, flight_number: 'FC202', ticket_number: 'MTKT2' },
];
// <--------- END OF MOCK DATA DEFINITIONS


// Helper function to handle API requests with fallback to mock data
const fetchWithFallback = async (endpoint, mockData) => {
  try {
    console.log(`Workspaceing from: ${API_BASE_URL}${endpoint}`); // Log the attempt
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      // Log specific status for debugging
      console.warn(`API request to ${endpoint} failed with status ${response.status}, using mock data`);
      // Check if mockData is actually defined before returning
      if (typeof mockData === 'undefined') {
         console.error(`Mock data variable for ${endpoint} is not defined!`);
         // Return empty array to prevent ReferenceError, though data will be missing
         return [];
      }
      return mockData; // Return mock data on failure (like 404, 500, etc.)
    }
    // If response is OK, parse and return JSON
    const data = await response.json();
    console.log(`Successfully fetched data from ${endpoint}`);
    return data;

  } catch (error) { // Catches network errors or errors during fetch/proxy setup
    console.error(`Network or fetch error for ${endpoint}:`, error);
    console.warn(`Using mock data for ${endpoint} due to error.`);
     // Check if mockData is actually defined before returning
     if (typeof mockData === 'undefined') {
         console.error(`Mock data variable for ${endpoint} is not defined!`);
         return []; // Return empty array
      }
    return mockData; // Return mock data on network error
  }
};

// Helper function for POST requests
const postData = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      // Try to get error message from response body
      let errorBody = null;
      try {
          errorBody = await response.json();
      } catch (e) { /* Ignore if body isn't JSON */ }

      const errorMessage = errorBody?.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }
    const responseData = await response.json();
    console.log(`Successfully posted to ${endpoint}:`, responseData);
    return { success: true, data: responseData };
  } catch (error) {
    console.error(`Error posting to ${endpoint}:`, error);
    toast.error(`Failed to add: ${error.message || 'Server error'}`);
    return { success: false, error };
  }
};


// --- GET Functions (use the mock variables defined above) ---
export const getAirports = async () => await fetchWithFallback('/airports', mockAirports);
export const getAirlines = async () => await fetchWithFallback('/airlines', mockAirlines);
export const getFlights = async () => await fetchWithFallback('/flights', mockFlights);
export const getEmployees = async () => await fetchWithFallback('/employees', mockEmployees);
export const getPassengers = async () => await fetchWithFallback('/passengers', mockPassengers);

// --- POST Functions (Updated) ---
export const addAirport = async (airport) => await postData('/airports', airport);
export const addAirline = async (airline) => await postData('/airlines', airline);
export const addFlight = async (flight) => await postData('/flights', flight);
export const addEmployee = async (employee) => await postData('/employees', employee);
export const addPassenger = async (passenger) => await postData('/passengers', passenger);


// --- DELETE Functions (Example - Implement if needed) ---
export const deleteAirport = async (airportName) => {
  // In a real app, this would send a DELETE request like:
  // await fetch(`${API_BASE_URL}/airports/${encodeURIComponent(airportName)}`, { method: 'DELETE' });
  console.log('Deleting airport:', airportName); // Placeholder
  // Simulating immediate success for UI update, assuming backend call works
  // In a real scenario, you'd await the actual API call and handle errors
  toast.success(`Airport ${airportName} deletion simulated`);
  return { success: true };
};
export const deleteAirline = async (airlineId) => {
  console.log('Deleting airline:', airlineId); // Placeholder
  toast.success(`Airline ${airlineId} deletion simulated`);
  return { success: true };
};
export const deleteFlight = async (flightNumber) => {
  console.log('Deleting flight:', flightNumber); // Placeholder
  toast.success(`Flight ${flightNumber} deletion simulated`);
  return { success: true };
};
export const deleteEmployee = async (employeeId) => {
  console.log('Deleting employee:', employeeId); // Placeholder
  toast.success(`Employee ${employeeId} deletion simulated`);
  return { success: true };
};
export const deletePassenger = async (passportNumber) => {
  console.log('Deleting passenger:', passportNumber); // Placeholder
  toast.success(`Passenger ${passportNumber} deletion simulated`);
  return { success: true };
};


// Export apiService object containing all functions
export const apiService = {
    getAirports,
    getAirlines,
    getFlights,
    getEmployees,
    getPassengers,
    addAirport,
    addAirline,
    addFlight,
    addEmployee,
    addPassenger,
    deleteAirport,
    deleteAirline,
    deleteFlight,
    deleteEmployee,
    deletePassenger,
};