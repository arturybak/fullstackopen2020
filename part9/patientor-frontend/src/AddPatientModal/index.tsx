import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { AddPatientForm, PatientFormValues, AddEntryForm, EntryFormValues } from './AddPatientForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => void;
  error?: string;
}

interface EntryProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  patientID: string;
}


const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  patientID,
}: EntryProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm
        patientID={patientID}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal.Content>
  </Modal>
);


export default AddPatientModal;
