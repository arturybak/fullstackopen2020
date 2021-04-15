import express from 'express';
import patientService from '../services/patientService';
import {toNewPatient, toNewEntry } from '../utils';
//import { NewPatient, Entry } from '../types';


const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (_req, res) => {
  res.send(patientService.getPatientById(_req.params.id));
});


router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedEntry = patientService.addPatient(newPatient);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  const { id } = req.params;
  try {
    const newEntry = toNewEntry(req.body);

    const addedEntry = patientService.addEntry(id, newEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});


export default router;
