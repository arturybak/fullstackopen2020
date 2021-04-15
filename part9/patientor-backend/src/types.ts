export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnoseCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export enum EntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital"
}


export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge?: { date: string; criteria: string };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;
export type NewEntry = Omit<Entry, 'id'>;
export type NewBaseEntry = Omit<BaseEntry, 'id'>;