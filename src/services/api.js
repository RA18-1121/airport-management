
// API service for connecting to the Express backend

const API_BASE_URL = 'http://localhost:3001/api';

export const apiService = {
  // Airports
  getAirports: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/airports`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching airports:", error);
      // Fall back to mock data if the API fails
      return [
        { airport_name: 'John F. Kennedy International Airport', city: 'New York', state: 'NY' },
        { airport_name: 'Los Angeles International Airport', city: 'Los Angeles', state: 'CA' },
        { airport_name: "O'Hare International Airport", city: 'Chicago', state: 'IL' },
        { airport_name: 'Hartsfield-Jackson Atlanta International Airport', city: 'Atlanta', state: 'GA' },
        { airport_name: 'Dallas/Fort Worth International Airport', city: 'Dallas', state: 'TX' },
        { airport_name: 'Denver International Airport', city: 'Denver', state: 'CO' }
      ];
    }
  },

  // Airlines
  getAirlines: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/airlines`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching airlines:", error);
      // Fall back to mock data if the API fails
      return [
        { airline_id: 'AA', airline_name: 'American Airlines', airport_name: 'Dallas/Fort Worth International Airport' },
        { airline_id: 'DL', airline_name: 'Delta Air Lines', airport_name: 'Hartsfield-Jackson Atlanta International Airport' },
        { airline_id: 'UA', airline_name: 'United Airlines', airport_name: "O'Hare International Airport" },
        { airline_id: 'SW', airline_name: 'Southwest Airlines', airport_name: 'Dallas Love Field' },
        { airline_id: 'JB', airline_name: 'JetBlue Airways', airport_name: 'John F. Kennedy International Airport' },
        { airline_id: 'AS', airline_name: 'Alaska Airlines', airport_name: 'Seattle-Tacoma International Airport' }
      ];
    }
  },

  // Flights
  getFlights: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/flights`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching flights:", error);
      // Fall back to mock data if the API fails
      return [
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
        },
        { 
          flight_number: 'FL101', 
          source: 'San Francisco', 
          destination: 'Boston',
          status: 'Scheduled',
          d_time: '7:15 AM',
          a_time: '3:45 PM',
          connected: 'Yes',
          duration: '5h 30m',
          airline_id: 'SW',
          airline_name: 'Southwest Airlines'
        },
        { 
          flight_number: 'FL202', 
          source: 'Atlanta', 
          destination: 'Denver',
          status: 'On Time',
          d_time: '9:30 AM',
          a_time: '11:00 AM',
          connected: 'No',
          duration: '2h 30m',
          airline_id: 'JB',
          airline_name: 'JetBlue Airways'
        }
      ];
    }
  },

  // Employees
  getEmployees: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching employees:", error);
      // Fall back to mock data if the API fails
      return [
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
        },
        { 
          e_id: 'E003', 
          name: 'Michael Rodriguez', 
          address: '789 Ocean Dr, Miami, FL',
          title: 'Ground Crew',
          destination: 'Domestic',
          salary: '$48,000',
          age: 27,
          dob: '1997-03-30',
          airport_name: 'Miami International Airport'
        },
        { 
          e_id: 'E004', 
          name: 'Emily Chen', 
          address: '321 Tech Way, San Francisco, CA',
          title: 'Air Traffic Controller',
          destination: 'International',
          salary: '$92,000',
          age: 35,
          dob: '1989-08-12',
          airport_name: 'San Francisco International Airport'
        },
        { 
          e_id: 'E005', 
          name: 'David Williams', 
          address: '567 Southern Blvd, Atlanta, GA',
          title: 'Baggage Handler',
          destination: 'Domestic',
          salary: '$42,000',
          age: 29,
          dob: '1995-02-28',
          airport_name: 'Hartsfield-Jackson Atlanta International Airport'
        }
      ];
    }
  },

  // Passengers
  getPassengers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/passengers`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching passengers:", error);
      // Fall back to mock data if the API fails
      return [
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
        },
        { 
          passport_number: 'P345678', 
          name: 'Thomas Wilson', 
          address: '123 Maple Dr, Chicago, IL',
          sex: 'Male',
          dob: '1978-11-30',
          age: 46,
          flight_number: 'FL789',
          ticket_number: 'T78903'
        },
        { 
          passport_number: 'P456789', 
          name: 'Maria Garcia', 
          address: '567 Cedar Ln, Miami, FL',
          sex: 'Female',
          dob: '1995-03-18',
          age: 29,
          flight_number: 'FL101',
          ticket_number: 'T78904'
        },
        { 
          passport_number: 'P567890', 
          name: 'Daniel Kim', 
          address: '890 Birch Rd, Los Angeles, CA',
          sex: 'Male',
          dob: '1988-09-05',
          age: 36,
          flight_number: 'FL202',
          ticket_number: 'T78905'
        }
      ];
    }
  }
};
