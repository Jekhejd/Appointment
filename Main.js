// Press Shift twice to open the Search Everywhere dialog and type `show whitespaces`,
// then press Enter. You can now see whitespace characters in your code.
const express = require('express');
        const bodyParser = require('body-parser');
        const cors = require('cors');

        const app = express();

        app.use(bodyParser.json());
        app.use(cors());

        const doctors = [
        {
        id: 1,
        name: 'Dr. Manjunath',
        specialty: 'Cardiologist',
        maxPatientsPerEvening: 13,
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        },
        {
        id: 2,
        name: 'Dr. Pearlthoughts',
        specialty: 'Dermatologist',
        maxPatientsPerEvening: 12,
        availability: ['Monday', 'Wednesday', 'Friday'],
        },
        ];

        const appointments = [];

        app.get('/api/doctors', (req, res) => {
        res.json(doctors);
        });

        app.get('/api/doctors/:doctorId', (req, res) => {
        const doctorId = parseInt(req.params.doctorId);
        const doctor = doctors.find((doc) => doc.id === doctorId);
        if (doctor) {
        res.json(doctor);
        } else {
        res.status(404).json({ error: 'Doctor not found' });
        }
        });

        app.get('/api/appointments', (req, res) => {
        res.json(appointments);
        });

        app.post('/api/appointments', (req, res) => {
        const { doctorId, appointmentTime } = req.body;

        const doctor = doctors.find((doc) => doc.id === doctorId);
        if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
        }

        if (
        !doctor.availability.includes(appointmentTime) ||
        appointments.filter((apt) => apt.doctorId === doctorId).length >=
        doctor.maxPatientsPerEvening
        ) {
        return res.status(400).json({ error: 'Appointment not available' });
        }

        appointments.push({
        doctorId,
        doctorName: doctor.name,
        appointmentTime,
        });

        res.status(201).json({ message: 'Appointment booked successfully' });
        });

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        });
