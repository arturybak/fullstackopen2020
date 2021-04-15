/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// had to add those because of uuid
import patientData from '../../data/patients';
import { v4 as uuid } from 'uuid';
import { Patient, NewPatient, PublicPatient, Entry } from '../types';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id == id);
};

const getNonSensitivePatients = (): PublicPatient[] => {
  return patients.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient = {
    id: id,
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientID: string, entry: Entry): Entry => {
  const patient: Patient | undefined = getPatientById(patientID);
  if (!patient) {
    throw new Error(`Couldn't find a patient with that ID`);
  }

  patient.entries.push(entry);

  return entry;
};


export default {
  getPatients,
  getPatientById,
  addPatient,
  getNonSensitivePatients,
  addEntry
};
