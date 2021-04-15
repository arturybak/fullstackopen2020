/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { Segment, Icon, SemanticCOLORS, Grid } from "semantic-ui-react";
import { useStateValue } from "../state";


import { Entry, HealthCheckEntry, HealthCheckRating } from "../types";

const EntryDetails = ({ entry }: { entry: Entry }) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };
    const [{ diagnoses }] = useStateValue();

    const getDiagnosisDescription = (code: string): string => {
        return diagnoses[code].name;

    };


    const DiagnoseCodes = ({ entry }: { entry: Entry }) => {

        return (
            <ul>
                {entry.diagnoseCodes?.map((code) => (
                    <li key={code}>
                        <b>{code}</b>    {getDiagnosisDescription(code)}
                    </li>
                ))}
            </ul>
        );
    };

    const HealthCheckIcon = ({ entry }: { entry: HealthCheckEntry }) => {
        const heartColor = (rating: HealthCheckRating): SemanticCOLORS => {
            switch (rating) {
                case HealthCheckRating.CriticalRisk:
                    return 'red';
                case HealthCheckRating.HighRisk:
                    return 'orange';
                case HealthCheckRating.LowRisk:
                    return 'yellow';

                default:
                    return 'green';
            }
        };

        return (
            <>
                <Icon
                    name="heart"
                    size="large"
                    color={heartColor(entry.healthCheckRating)}
                />
            </>
        );

    };


    switch (entry.type) {
        case "Hospital":
            return (
                <Segment>
                    <Grid>
                        <Grid.Column floated="left" width={10}>
                            <h3>{entry.date}</h3>
                        </Grid.Column>
                        <Grid.Column floated="right" width={1}>
                            <h3><Icon name="hospital" size="large" /></h3>
                        </Grid.Column>
                    </Grid>

                    <p>{entry.description}</p>
                    <DiagnoseCodes entry={entry} />
                </Segment>
            );
        case "OccupationalHealthcare":
            return (
                <Segment>
                    <Grid>
                        <Grid.Column floated="left" width={2}>
                            <h3>{entry.date}  {entry.employerName}</h3>
                        </Grid.Column>
                        <Grid.Column floated="right" width={1}>
                            <h3><Icon name="stethoscope" size="large" /></h3>
                        </Grid.Column>
                    </Grid>


                    <p>{entry.description}</p>

                    <DiagnoseCodes entry={entry} />

                    {entry.sickLeave && (
                        <div>
                            <b>{entry.sickLeave.startDate}
                                <Icon name="arrow right" />
                                {entry.sickLeave.endDate}</b>
                        </div>
                    )}
                </Segment>
            );
        case "HealthCheck":
            return (
                <Segment>
                    <Grid>
                        <Grid.Column floated="left" width={10}>
                            <h3>{entry.date}</h3>
                        </Grid.Column>
                        <Grid.Column floated="right" width={1}>
                            <h3><Icon name="user md" size="large" /></h3>
                        </Grid.Column>
                    </Grid>

                    <p>{entry.description}</p>

                    <HealthCheckIcon entry={entry} />

                    <DiagnoseCodes entry={entry} />

                </Segment>
            );
        default:
            return assertNever(entry);
    }

};

export default EntryDetails;
