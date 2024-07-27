type GameSchema = {
  id: number;
  name: string;
  questions: {
    id: number;
    question: string;
    answer: string;
  }[];
};

export default GameSchema;
