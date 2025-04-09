const express = require('express');
 const cors = require('cors');
 const path = require('path');

 const app = express();
 const PORT = process.env.PORT || 3001;

 // Enable CORS for the client
 app.use(cors());
 app.use(express.json()); // Middleware to parse JSON bodies

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

 // --- GET Routes (Existing) ---
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

 // --- POST Routes (New) ---

 // Add Airport
 app.post('/api/airports', (req, res) => {
   const newAirport = req.body;
   if (!newAirport || !newAirport.airport_name || !newAirport.city || !newAirport.state) {
     return res.status(400).json({ message: 'Missing required airport fields' });
   }
   // Optional: Check for duplicates
   const exists = airports.some(a => a.airport_name === newAirport.airport_name);
   if (exists) {
     return res.status(409).json({ message: 'Airport already exists' });
   }
   airports.push(newAirport);
   console.log('Added airport:', newAirport);
   res.status(201).json(newAirport);
 });

 // Add Airline
 app.post('/api/airlines', (req, res) => {
   const newAirline = req.body;
   if (!newAirline || !newAirline.airline_id || !newAirline.airline_name || !newAirline.airport_name) {
     return res.status(400).json({ message: 'Missing required airline fields' });
   }
   const exists = airlines.some(a => a.airline_id === newAirline.airline_id);
   if (exists) {
     return res.status(409).json({ message: 'Airline ID already exists' });
   }
   airlines.push(newAirline);
   console.log('Added airline:', newAirline);
   res.status(201).json(newAirline);
 });

 // Add Flight
 app.post('/api/flights', (req, res) => {
   const newFlight = req.body;
   // Add more robust validation as needed
   if (!newFlight || !newFlight.flight_number || !newFlight.source || !newFlight.destination) {
     return res.status(400).json({ message: 'Missing required flight fields' });
   }
   const exists = flights.some(f => f.flight_number === newFlight.flight_number);
   if (exists) {
     return res.status(409).json({ message: 'Flight number already exists' });
   }
   // Add default or calculated fields if necessary
   newFlight.status = newFlight.status || 'Scheduled';
   flights.push(newFlight);
   console.log('Added flight:', newFlight);
   res.status(201).json(newFlight);
 });

 // Add Employee
 app.post('/api/employees', (req, res) => {
   const newEmployee = req.body;
   if (!newEmployee || !newEmployee.e_id || !newEmployee.name || !newEmployee.title) {
     return res.status(400).json({ message: 'Missing required employee fields' });
   }
   const exists = employees.some(e => e.e_id === newEmployee.e_id);
   if (exists) {
     return res.status(409).json({ message: 'Employee ID already exists' });
   }
   // Calculate age if dob is provided
   if (newEmployee.dob) {
       try {
           newEmployee.age = new Date().getFullYear() - new Date(newEmployee.dob).getFullYear();
       } catch (e) {
           console.error("Error calculating age:", e);
           // Decide how to handle invalid DOB - maybe set age to null or return an error
       }
   } else {
        newEmployee.age = null; // Or handle as appropriate
   }
   employees.push(newEmployee);
   console.log('Added employee:', newEmployee);
   res.status(201).json(newEmployee);
 });

 // Add Passenger
 app.post('/api/passengers', (req, res) => {
   const newPassenger = req.body;
   if (!newPassenger || !newPassenger.passport_number || !newPassenger.name || !newPassenger.dob) {
     return res.status(400).json({ message: 'Missing required passenger fields' });
   }
   const exists = passengers.some(p => p.passport_number === newPassenger.passport_number);
   if (exists) {
     return res.status(409).json({ message: 'Passport number already exists' });
   }
    // Calculate age if dob is provided
   if (newPassenger.dob) {
       try {
           newPassenger.age = new Date().getFullYear() - new Date(newPassenger.dob).getFullYear();
       } catch (e) {
           console.error("Error calculating age:", e);
       }
   } else {
        newPassenger.age = null;
   }
   passengers.push(newPassenger);
   console.log('Added passenger:', newPassenger);
   res.status(201).json(newPassenger);
 });


 // Start the server
 app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
 });