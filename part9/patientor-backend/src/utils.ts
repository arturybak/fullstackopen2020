import { NewPatient, Gender, Entry, BaseEntry, HealthCheckRating, EntryType } from './types';
import { v4 as uuid } from 'uuid';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (string: unknown): string => {
    if (!string || !isString(string)) {
        throw new Error('Incorrect or missing string');
    }

    return string;
};

const parseCodes = (string: unknown): string[] => {
    if (!string) {
        return [];
    } else if (!Array.isArray(string)) {
        throw new Error('Incorrect or missing codes');
    }

    string.forEach(code => {
        if (!isString(code)) {
            throw new Error(`Incorrect code: ${code}}`);
        }
    });
    return string as string[];
};


const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

type Fields = { name: unknown, occupation: unknown, gender: unknown, ssn: unknown, dateOfBirth: unknown };
export const toNewPatient = ({ name, occupation, gender, ssn, dateOfBirth }: Fields): NewPatient => {
    const newEntry: NewPatient = {
        name: parseString(name),
        dateOfBirth: parseDate(dateOfBirth),
        gender: parseGender(gender),
        occupation: parseString(occupation),
        ssn: parseString(ssn),
        entries: []
    };

    return newEntry;
};

const isEntryType = (param: any): param is EntryType => {
    return Object.values(EntryType).includes(param);
};

// const parseEntryType = (string: unknown): EntryType => {
//     if (!string || !isEntryType(string)) {
//         throw new Error('Incorrect or missing entry type');
//     }

//     return string;
// };

const isRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseRating = (rating: any): HealthCheckRating => {
    if (!rating) {
        throw new Error(`Missing rating`);
    }
    const ratingNumber: number = parseInt(rating);
    if (isNaN(ratingNumber) || !isRating(ratingNumber)) {
        throw new Error(`Incorrect rating`);
    }
    return ratingNumber;
};



type FieldsEntry = { description: unknown, date: unknown, specialist: unknown, diagnoseCodes: unknown, type: unknown, healthCheckRating: unknown, dischargeDate:unknown, dischargeCriteria: unknown, sickLeaveStartDate: unknown, sickLeaveEndDate: unknown, employerName: unknown };
export const toNewEntry = ({ description, date, specialist, diagnoseCodes, type, healthCheckRating, dischargeCriteria, dischargeDate, sickLeaveEndDate, sickLeaveStartDate, employerName }: FieldsEntry): Entry => {
    const newEntry: BaseEntry = {
        id: uuid(),
        description: parseString(description),
        date: parseDate(date),
        specialist: parseString(specialist),
        diagnoseCodes: parseCodes(diagnoseCodes)
    };

    if (!isEntryType(type)) {
        throw new Error('Incorrent Entry Type');
    }

    switch (type) {
        case 'HealthCheck':
            return {
                ...newEntry,
                type: 'HealthCheck',
                healthCheckRating: parseRating(healthCheckRating)
            };

        case 'Hospital':
            return {
                ...newEntry,
                type: 'Hospital',
                discharge: {
                    date: parseDate(dischargeDate),
                    criteria: parseString(dischargeCriteria)
                }
            };

        case 'OccupationalHealthcare':
            let sickLeave;
            if (sickLeaveStartDate && sickLeaveEndDate) {
                sickLeave = {
                    startDate: parseDate(sickLeaveStartDate),
                    endDate: parseDate(sickLeaveEndDate)
                };
            }
            return {
                ...newEntry,
                type: 'OccupationalHealthcare',
                employerName: parseString(employerName),
                sickLeave
            };

        default:
            throw new Error(`Incorrect entry type`);
    }

};