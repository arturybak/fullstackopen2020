interface MultiplyValues {
    value1: number;
    value2: number;
  }
  
  const parseArguments = (args: Array<string>): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };

type Result = string;


export const calculateBmi = (height: number, weight: number): Result => {
    const bmi = weight / (height/100) ** 2;

    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 25) {
        return 'Normal (healthy weight)';
    } else if (bmi < 30) {
        return 'Overweight';
    } else if (bmi < 40) {
        return 'Obese';
    } else {
        return 'Morbidly obese';
    }
};

try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateBmi(value1, value2));
} catch (e) {
    console.log('Something went wrong: ', e);
}
