import express from 'express';
const app = express();
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  const weight = _req.query.weight;
  const height = _req.query.height;
  const bmi = calculateBmi(Number(height), Number(weight));

  if (Number(weight) > 0 && Number(height) > 0) {
    res.send({ weight, height, bmi });
  }

  res.send({ error: "malformatted parameters" });
});

app.post('/exercises', (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target }: any = _req.body;

  if (!daily_exercises || !target) {
    return res.send({ error: "parameters missing" });

  } else if ((daily_exercises as []).some((arg: number) => isNaN(Number(arg)))) {
    return res.send({ error: "malformatted parameters" });

  } else {
    return res.json(calculateExercises(daily_exercises, Number(target)));

  }

});



const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
