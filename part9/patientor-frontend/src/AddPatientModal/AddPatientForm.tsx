/* eslint-disable @typescript-eslint/prefer-regexp-exec */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, OptionGuard, DiagnosisSelection } from "./FormField";
import { EntryType, Gender, EntryForm, HealthCheckRating, Patient } from "../types";
import { useStateValue } from "../state";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type EntryFormValues = EntryForm;

interface Props {
  onSubmit: (values: PatientFormValues) => void;
  onCancel: () => void;
}

interface EntryProps {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  patientID: string;
}


const genderOptions: OptionGuard[] = [
  { value: Gender.Male, label: "Male" },
  { value: Gender.Female, label: "Female" },
  { value: Gender.Other, label: "Other" }
];

const ratingOptions: OptionGuard[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'LowRisk' },
  { value: HealthCheckRating.HighRisk, label: 'HighRisk' },
  { value: HealthCheckRating.CriticalRisk, label: 'CriticalRisk' },
];

const typeOptions: OptionGuard[] = [
  { value: EntryType.HealthCheck, label: EntryType.HealthCheck },
  { value: EntryType.Hospital, label: EntryType.Hospital },
  { value: EntryType.OccupationalHealthcare, label: EntryType.OccupationalHealthcare },
];

const isDateValid = (date: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return date.match(regex)?.length == 10;
};

const showConditionalFields = (type: string) => {
  switch (type) {
    case 'HealthCheck':
      return (
        <SelectField
          label="Rating"
          name="healthCheckRating"
          options={ratingOptions}
        />
      );

    case 'Hospital':
      return (
        <>
          <Field
            label="Discharge Date"
            placeholder="YYYY-MM-DD"
            name="dischargeDate"
            component={TextField}
          />
          <Field
            label="Criteria"
            name="dischargeCriteria"
            component={TextField}
          />
        </>
      );

    case 'OccupationalHealthcare':
      return (
        <>
          <Field
            label="EmployerName"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Sick Leave Start Date"
            placeholder="YYYY-MM-DD"
            name="sickLeaveStartDate"
            component={TextField}
          />
          <Field
            label="Sick Leave End Date"
            placeholder="YYYY-MM-DD"
            name="sickLeaveEndDate"
            component={TextField}
          />
        </>
      );

    default:
      return null;
  }
};
export const AddEntryForm = ({ onSubmit, onCancel, patientID }: EntryProps) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        id: patientID,
        description: '',
        specialist: '',
        type: 'HealthCheck',
        date: '',
        diagnoseCodes: [],
        healthCheckRating: HealthCheckRating.LowRisk,
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!isDateValid(values.date)) {
          errors.date = 'Date format: YYYY-MM-DD';
        }

        if ('Hospital' == values.type) {
          if (values.dischargeDate && !isDateValid(values.dischargeDate)) {
            errors.dischargeDate = 'Date format: YYYY-MM-DD';
          }
        }
        if ('OccupationalHealthcare' == values.type) {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (
            values.sickLeaveStartDate &&
            !isDateValid(values.sickLeaveStartDate)
          ) {
            errors.sickLeaveStartDate = 'Date format: YYYY-MM-DD';
          }
          if (
            values.sickLeaveEndDate &&
            !isDateValid(values.sickLeaveEndDate)
          ) {
            errors.sickLeaveEndDate = 'Date format: YYYY-MM-DD';
          }
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field type="hidden" name="id" />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField label="Types" name="type" options={typeOptions} />
            {showConditionalFields(values.type)}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export const AddPatientForm = ({ onSubmit, onCancel }: Props) => {
  return (
    <Formik
      initialValues={{
        name: "",
        ssn: "",
        dateOfBirth: "",
        occupation: "",
        gender: Gender.Other
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.name) {
          errors.name = requiredError;
        }
        if (!values.ssn) {
          errors.ssn = requiredError;
        }
        if (!values.dateOfBirth) {
          errors.dateOfBirth = requiredError;
        }
        if (!values.occupation) {
          errors.occupation = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Name"
              placeholder="Name"
              name="name"
              component={TextField}
            />
            <Field
              label="Social Security Number"
              placeholder="SSN"
              name="ssn"
              component={TextField}
            />
            <Field
              label="Date Of Birth"
              placeholder="YYYY-MM-DD"
              name="dateOfBirth"
              component={TextField}
            />
            <Field
              label="Occupation"
              placeholder="Occupation"
              name="occupation"
              component={TextField}
            />
            <SelectField
              label="Gender"
              name="gender"
              options={genderOptions}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPatientForm;
