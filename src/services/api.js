// src/services/api.js
import { toast } from "sonner"; // Import toast for error feedback

const API_BASE_URL = '/api';

// Sample data for fallback (keep for now or remove if backend is reliable)
// ... (mock data definitions remain the same) ...

// Helper function to handle API requests with fallback to mock data
const fetchWithFallback = async (endpoint, mockData) => {
  try {
    console.log(`Workspaceing from: ${API_BASE_URL}${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      if (response.status === 404) { // Specifically use mock for 404
          console.warn(`API endpoint ${endpoint} not found (404), using mock data`);
          return mockData;
      }
      // For other errors, still throw but provide context
      throw new Error(`API returned status ${response.status} for ${endpoint}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    // Consider if fallback is always desired on error, or only for specific errors like network issues
    console.warn(`Using mock data for ${endpoint} due to fetch error.`);
    return mockData;
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


// --- GET Functions (no changes needed) ---
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
  return { success: true };
};
export const deleteAirline = async (airlineId) => {
  console.log('Deleting airline:', airlineId); // Placeholder
  return { success: true };
};
export const deleteFlight = async (flightNumber) => {
  console.log('Deleting flight:', flightNumber); // Placeholder
  return { success: true };
};
export const deleteEmployee = async (employeeId) => {
  console.log('Deleting employee:', employeeId); // Placeholder
  return { success: true };
};
export const deletePassenger = async (passportNumber) => {
  console.log('Deleting passenger:', passportNumber); // Placeholder
  return { success: true };
};


// Export apiService object if needed elsewhere, or keep individual exports
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