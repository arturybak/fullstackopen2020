/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import axios from "axios";
import { Button, Icon } from "semantic-ui-react";
import { useParams } from 'react-router-dom';


import { Patient, Entry, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setDiagnosisList, addEntry } from "../state";
import EntryDetails from "./EntryDetails";
import { AddEntryModal } from '../AddPatientModal';
import { EntryFormValues } from '../AddPatientModal/AddPatientForm';


const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = React.useState<Patient | undefined>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };


  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const getPatient = async () => {
      try {
        const { data: patientDetailsFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(patientDetailsFromApi);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    if (patients[id] && patients[id].ssn) {
      setPatient(patients[id]);
    } else {
      fetchDiagnosisList();
      getPatient();
    }
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  const displayGenderIcon = () => {
    const fetchedGender = patient.gender;
    switch (fetchedGender) {
      case "male":
        return <Icon name="mars" />;
      case "female":
        return <Icon name="venus" />;
      case "other":
        return <Icon name="genderless" />;
      default:
        return <Icon name="genderless" />;
    }
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${values.id}/entries`,
        values
      );
      dispatch(addEntry(values.id, newEntry));
      patient && patient.entries.push(newEntry);
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <div className="App">
      <section>
        <h2>{patient.name} {displayGenderIcon()}</h2>
        <div>
          <b>SSN:</b> {patient.ssn}
        </div>
        <div>
          <b>Occupation:</b> {patient.occupation}
        </div>
      </section>
      <br />
      <section>
        {patient?.entries && patient.entries?.length > 0 && <h3>Entries</h3>}
        {patient?.entries?.map((entry: Entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
          patientID={patient.id}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </section>
    </div>
  );
};

export default PatientPage;
