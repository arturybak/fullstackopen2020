interface exerciseReport {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (hours: number[], target: number): exerciseReport => {
    const periodLength = hours.length;
    const trainingDays = hours.filter(h => h > 0).length;
    const average = hours.reduce((a, b) => a + b, 0) / periodLength;
    let success = true;
    let rating = 0;
    let ratingDescription = '';

    if (average > target) {
        rating = 3;
        ratingDescription = 'condragulations. you are the winner of this week\'s challenge';
    } else if (average == target) {
        rating = 2;
        ratingDescription = 'you are safe';
    } else {
        success = false;
        rating = 1;
        ratingDescription = 'im sorry my dear, but you are up for elimination';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

interface ExerciseInputValues {
    exerciseHours: number[];
    target: number;
}

const parseExerciseArguments = (args: Array<string>): ExerciseInputValues => {
    if (args.length < 4) throw new Error("Not enough arguments");

    const exerciseValues = args.slice(2);

    if (!exerciseValues.some((arg) => isNaN(Number(arg)))) {
        const validValues = exerciseValues.map(val => Number(val));
        const target = validValues.shift() as number;
        const exerciseHours = validValues;
        return {
            exerciseHours,
            target,
        };
    } else {
        throw new Error("Incorrent parameters passed");
    }
};


try {
    //console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
    const { exerciseHours, target } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(exerciseHours, target));  
} catch (e) {
    console.log('Something went wrong: ', e);
}

