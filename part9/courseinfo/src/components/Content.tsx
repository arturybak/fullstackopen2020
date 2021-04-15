
import React from 'react'
import Part from './Part'
import { CoursePart } from '../types';


const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
        <div>
            {courseParts.map((part) => (
                <Part key={part.name} part={part} />
            ))}
        </div>
    );
};

export default Content;
