/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: Entry;
    patientID: string;
  };


export const addEntry = (patientID: string, newEntry: Entry): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: newEntry,
    patientID
  };
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  };
};

export const setDiagnosisList = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnoses,
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.patientID]: {
            ...state.patients[action.patientID],
            entries: [
              ...state.patients[action.patientID].entries,
              action.payload
            ]
          }
        }
      };

    default:
      return state;
  }
};
