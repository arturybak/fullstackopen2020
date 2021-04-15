import React from 'react';
import { CoursePart } from '../types';

const Part = ({ part }: { part: CoursePart }) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    switch (part.type) {
        case "normal":
            return (
                <div>
                    <p><strong>{part.name} {part.exerciseCount} </strong> 
                    <br></br>
                    <i>{part.description} </i></p>
                </div>
            );
        case "groupProject":
            return (
                <div>
                    <p><strong>{part.name} {part.exerciseCount} </strong> 
                    <br></br>
                    project exercises {part.groupProjectCount} </p>
                </div>
            );
        case "submission":
            return (
                <div>
                    <p><strong>{part.name} {part.exerciseCount} </strong> 
                    <br></br>
                    <i>{part.description} </i>
                    <br></br>
                    submit to {part.exerciseSubmissionLink} </p>
                </div>
            );
        case "special":
            return (
                <div>
                    <p><strong>{part.name} {part.exerciseCount} </strong> 
                    <br></br>
                    <i>{part.description} </i>
                    <br></br>
                    required skills:
                    {part.requirements.map(requirement => <span key={requirement}> {requirement} </span>)}
                    </p>
                </div>
            );
        default:
            return assertNever(part);
    }

};

export default Part;