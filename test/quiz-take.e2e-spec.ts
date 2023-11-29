import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { testDataSource } from 'test/utils/test-data-source';
import { testUsers } from './utils/user.stub';
import { testQuiz } from './utils/quiz.stub';
import { testQuestions } from './utils/question.stub';


const gql = '/graphql';


describe('Graphql QuizTakeResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await testDataSource.initialize();
    await testDataSource.dropDatabase();  

    await request(app.getHttpServer())
    .post(gql)
    .send({ query: `
        mutation {
            createUser(createUserInput:${
            JSON.stringify(testUsers[0])
            }) {id}
        }    
    `}).expect(200);

    await request(app.getHttpServer())
    .post(gql)
    .send({ query: `
        mutation {
            createQuiz(createQuizInput: ${JSON.stringify(testQuiz)},
            createQuestionArray: ${JSON.stringify(testQuestions)}
            ) {id}
        }
    `}).expect(200);

    });

    afterAll(async () => {
      await testDataSource.dropDatabase();
      await app.close();
    }); 

    describe('create quiz take', ()=>{

        it('should create quiz-take', async () => {
          const response = await request(app.getHttpServer())
          .post(gql)
          .send({ query: `
          mutation {
            createQuizTake(createQuizTakeInput: {
              quizId: 1,
              userId: 1,
              givenAnswers: []
            }) {id, score}
          }
          `});

          expect(response.body.createQuizTake).toBeDefined();
          expect(response.body.createQuizTake.score).toEqual(0);
        });
    });

    describe('answer multiple choice', ()=>{
        it('should score answer to multiple choice', async () => {
          const response = await request(app.getHttpServer())
          .post(gql)
          .send({ query: `
          mutation {
            createQuizTake(createQuizTakeInput: {
              quizId: 1,
              userId: 1,
              givenAnswers: [
                {
                  questionId: 1,
                  correctAnswers: [1, 2, 4]
                }
              ]
            }) {id, score}
          }
          `});

          expect(response.body.createQuizTake).toBeDefined();
          expect(response.body.createQuizTake.score).toEqual(1);
        });

        it('should not score anwser to multiple choice', async () => {
          const response = await request(app.getHttpServer())
          .post(gql)
          .send({ query: `
          mutation {
            createQuizTake(createQuizTakeInput: {
              quizId: 1,
              userId: 1,
              givenAnswers: [
                {
                  questionId: 1,
                  correctAnswers: [1, 4]
                }
              ]
            }) {id, score}
          }
          `});

          expect(response.body.createQuizTake).toBeDefined();
          expect(response.body.createQuizTake.score).toEqual(0);        
        });
      });

      describe('answer sort sequence question', ()=>{
        it('should score anwser to sort sequence', async () => {
          const response = await request(app.getHttpServer())
          .post(gql)
          .send({ query: `
          mutation {
            createQuizTake(createQuizTakeInput: {
              quizId: 1,
              userId: 1,
              givenAnswers: [
                {
                  questionId: 2,
                  sortedAnswers: [5, 7, 6, 8]
                }
              ]
            }) {id, score}
          }
          `});

          expect(response.body.createQuizTake).toBeDefined();
          expect(response.body.createQuizTake.score).toEqual(1);        
        });

        it('should not score anwser to sort sequence', async () => {
          const response = await request(app.getHttpServer())
          .post(gql)
          .send({ query: `
          mutation {
            createQuizTake(createQuizTakeInput: {
              quizId: 1,
              userId: 1,
              givenAnswers: [
                {
                  questionId: 2,
                  sortedAnswers: [5, 6, 8, 7]
                }
              ]
            }) {id, score}
          }
          `});

          expect(response.body.createQuizTake).toBeDefined();
          expect(response.body.createQuizTake.score).toEqual(0);        
        });

        it('should raise error (sort sequence)', async () => {
          const response = await request(app.getHttpServer())
          .post(gql)
          .send({ query: `
          mutation {
            createQuizTake(createQuizTakeInput: {
              quizId: 1,
              userId: 1,
              givenAnswers: [
                {
                  questionId: 2,
                  sortedAnswers: [5, 1, 6, 8]
                }
              ]
            }) {id, score}
          }
          `});

          expect(response.body.errors).toBeDefined();
        }); 

        it('should raise error (sort sequence)', async () => {
          const response = await request(app.getHttpServer())
          .post(gql)
          .send({ query: `
          mutation {
            createQuizTake(createQuizTakeInput: {
              quizId: 1,
              userId: 1,
              givenAnswers: [
                {
                  questionId: 2,
                  correctAnswerId: 5
                }
              ]
            }) {id, score}
          }
          `});

          expect(response.body.errors).toBeDefined();
        });  
      });

      describe('answer sort sequence question', ()=>{
        it('should score sigle choice answer', async () => {
          const response = await request(app.getHttpServer())
          .post(gql)
          .send({ query: `
          mutation {
            createQuizTake(createQuizTakeInput: {
              quizId: 1,
              userId: 1,
              givenAnswers: [
                {
                  questionId: 3,
                  correctAnswerId: 11
                }
              ]
            }) {id, userId, score}
          }
          `});

          expect(response.body.createQuizTake).toBeDefined();
          expect(response.body.createQuizTake.score).toEqual(1);  
          expect(response.body.createQuizTake.userId).toEqual(1);              
        });  

      });

      describe('answer single choice question', ()=>{

        it('should not score sigle choice answer', async () => {
          const response = await request(app.getHttpServer())
          .post(gql)
          .send({ query: `
          mutation {
            createQuizTake(createQuizTakeInput: {
              quizId: 1,
              userId: 1,
              givenAnswers: [
                {
                  questionId: 3,
                  correctAnswerId: 10
                }
              ]
            }) {id, userId, score}
          }
          `});

          expect(response.body.createQuizTake).toBeDefined();
          expect(response.body.createQuizTake.score).toEqual(0);  
          expect(response.body.createQuizTake.userId).toEqual(1);              
        });

        it('should raise error (sigle choice)', async () => {
          const response = await request(app.getHttpServer())
          .post(gql)
          .send({ query: `
          mutation {
            createQuizTake(createQuizTakeInput: {
              quizId: 1,
              userId: 1,
              givenAnswers: [
                {
                  questionId: 3
                }
              ]
            }) {id, userId, score}
          }
          `});

          expect(response.body.errors).toBeDefined();             
        });
      });


      describe('answer text input question', ()=>{
        
        it('should score text answer', async () => {
          const response = await request(app.getHttpServer())
          .post(gql)
          .send({ query: `
          mutation {
            createQuizTake(createQuizTakeInput: {
              quizId: 1,
              userId: 1,
              givenAnswers: [
                {
                  questionId: 4,
                  text: "conosci"
                }
              ]
            }) {id, userId, score}
          }
          `});

          expect(response.body.createQuizTake).toBeDefined();
          expect(response.body.createQuizTake.score).toEqual(1);  
          expect(response.body.createQuizTake.userId).toEqual(1);              
        }); 
        
        
        it('should not score text answer', async () => {
          const response = await request(app.getHttpServer())
          .post(gql)
          .send({ query: `
          mutation {
            createQuizTake(createQuizTakeInput: {
              quizId: 1,
              userId: 1,
              givenAnswers: [
                {
                  questionId: 4,
                  text: "none"
                }
              ]
            }) {id, userId, score}
          }
          `});

          expect(response.body.createQuizTake).toBeDefined();
          expect(response.body.createQuizTake.score).toEqual(0);  
          expect(response.body.createQuizTake.userId).toEqual(1);              
        });         
      
        it('should raise error (text answer)', async () => {
          const response = await request(app.getHttpServer())
          .post(gql)
          .send({ query: `
          mutation {
            createQuizTake(createQuizTakeInput: {
              quizId: 1,
              userId: 1,
              givenAnswers: [
                {
                  questionId: 4,
                  text: 1
                }
              ]
            }) {id, userId, score}
          }
          `});

          expect(response.body.errors).toBeDefined();            
        });    
        
        it('should raise error (text answer)', async () => {
          const response = await request(app.getHttpServer())
          .post(gql)
          .send({ query: `
          mutation {
            createQuizTake(createQuizTakeInput: {
              quizId: 1,
              userId: 1,
              givenAnswers: [
                {
                  questionId: 4,
                  sortedAnswers: [1, 2]
                }
              ]
            }) {id, userId, score}
          }
          `});

          expect(response.body.errors).toBeDefined();            
        });      
      });
});