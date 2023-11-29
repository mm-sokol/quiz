import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { testDataSource } from 'test/utils/test-data-source';
import { testUsers, testUsersRecords } from './utils/user.stub';


const gql = '/graphql';


describe('Graphql UserResolver (e2e)', () => {
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
  });

  afterAll(async () => {
    await testDataSource.dropDatabase();
    await app.close();
  }); 

  describe(gql, () => {
    describe('users', () => {
        it.each(testUsers.map((e,i)=>[e, testUsersRecords[i]]))(
          'should create test user', (input, result) => {
            return request(app.getHttpServer())
                .post(gql)
                .send({ query: `
                mutation {
                  createUser(createUserInput:${
                    JSON.stringify(input)
                  }) {id, username, firstname, lastname, role}
                }
                `})
                .expect(200)
                .expect((res) => {
                    expect(res.body.data.createUser).toEqual(result);
                })
        });

        it('should return one user details', () => {
            return request(app.getHttpServer())
                .post(gql)
                .send({ query: '{user(id: 1) {username, firstname}}' })
                .expect(200)
                .expect((res) => {
                    expect(res.body.data.user).toEqual({
                        username: testUsersRecords[0].username,
                        firstname: testUsersRecords[0].firstname
                    })
                })
        });

        it('should update user', () => {
          return request(app.getHttpServer())
          .post(gql)
          .send({ query: `
          mutation {
            updateUser(id: 2, updateUserInput: {
              lastname: "Radio"
            }) {
              lastname
            }
          }
          `})
          .expect(200)
          .expect((res) => {
              expect(res.body.data.updateUser).toEqual({lastname: "Radio"});
          })
        })

        it('should get all users', () => {
          return request(app.getHttpServer())
          .post(gql)
          .send({ query: `
          {
            users {
              id
            }
          }
          `})
          .expect(200)
          .expect((res) => {
              expect(res.body.data.users).toEqual({lastname: "Radio"});
          })
        })

        it('should raise not unique username error', async () => {
            const response = await request(app.getHttpServer())
                .post(gql)
                .send({ query: `
                mutation {
                  createUser(createUserInput:${
                    JSON.stringify(testUsers[0])
                  }) {id, username, firstname, lastname, role}
                }
                `})

            expect(response.body.errors).toBeDefined();
            expect(response.body.errors).not.toHaveLength(0);
            expect(response.body.errors[0].message).toMatch(new RegExp('\w*Username is already taken'));
        });
    });


  });
});
