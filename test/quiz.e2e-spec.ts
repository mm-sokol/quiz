import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { testDataSource } from 'test/utils/test-data-source';
import { testUsers } from './utils/user.stub';
import { testQuiz } from './utils/quiz.stub';
import { testQuestions } from './utils/question.stub';

const gql = '/graphql';

describe('Graphql QuizResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await testDataSource.initialize();
    await testDataSource.dropDatabase();
  });

  afterAll(async () => {
    await testDataSource.dropDatabase();
    await app.close();
  });

  describe(gql, () => {
    describe('quizes', () => {
      it('should create test quiz', async () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: `
                mutation {
                    createQuiz(
                        createQuizInput:{${JSON.stringify(testQuiz)}},
                        createQuestionArray:${JSON.stringify(testQuestions)}
                } { id, title, questions { id }} 
            `,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.createQuiz.questions.length).toEqual(
              testQuestions.length,
            );
            expect(res.body.data.createQuiz.id).toEqual(1);
            expect(res.body.data.createQuiz.id).toEqual(testQuiz.title);
          });
      });

      it('should retrieve list of quizes', async () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: `
                {
                    quizes
                } { id, title, questions {
                        id, contents, type, answers { id }
                    }
                } 
            `,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.quizes).toHaveLength(1);
            for (let question of res.body.data.quizes[0].questions) {
              expect(question.answers).toBeDefined();
              expect(question.answers).not.toHaveLength(0);
            }
          });
      });

      it('should return an error', async () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: `
                {
                    quiz(id: 5)
                } { id, title } 
            `,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body).toHaveProperty('errors');
            expect(res.body.errors).not.toHaveLength(0);
          });
      });
    });
  });
});
