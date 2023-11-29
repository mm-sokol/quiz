import { CreateQuestionInput } from 'src/questions/dto/create-question.input';
import { QuestionType } from 'src/questions/entities/question.entity';

export const testQuestions: CreateQuestionInput[] = [
  {
    contents: 'Which verbs are irregular?',
    type: QuestionType.MULTIPLE_CHOICE,
    answers: [
      {
        contents: 'Vedere - to see',
        correctStatus: 1,
      },
      {
        contents: 'Dire - to say',
        correctStatus: 1,
      },
      {
        contents: 'Chamare - to call',
        correctStatus: 0,
      },
      {
        contents: 'Essere - to be',
        correctStatus: 1,
      },
    ],
  },
  {
    contents:
      'Sort conjugated forms of andare (to go) to match pronoun sequence: io, tu, lui/lei, noi',
    type: QuestionType.SORT_SQUENCE,
    answers: [
      {
        contents: 'vado',
        correctStatus: 1,
      },
      {
        contents: 'va',
        correctStatus: 3,
      },
      {
        contents: 'vai',
        correctStatus: 2,
      },
      {
        contents: 'andiamo',
        correctStatus: 4,
      },
    ],
  },
  {
    contents:
      'Choose the correct word to replace [x] in sentence: I bambini [x] a casa dopo la scuola.',
    type: QuestionType.SINGLE_CHOICE,
    answers: [
      {
        contents: 'venino',
        correctStatus: 0,
      },
      {
        contents: 'venano',
        correctStatus: 0,
      },
      {
        contents: 'vengono',
        correctStatus: 1,
      },
      {
        contents: 'veniscono',
        correctStatus: 0,
      },
    ],
  },
  {
    contents: 'Write a conjugated singular form of conscere (to know)',
    type: QuestionType.TEXT_ANSWER,
    answers: [
      {
        contents: 'conosco',
        correctStatus: 1,
      },
      {
        contents: 'conosci',
        correctStatus: 1,
      },
      {
        contents: 'conosce',
        correctStatus: 1,
      },
    ],
  },
];
