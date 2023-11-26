import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

const users: User[] = [
    {
        id: 5,
        username: "mouse",
        firstname: "Mary",
        lastname: "Hartford"
    },
    {
        id: 6,
        username: "alpaca",
        firstname: "Zahary",
        lastname: "Alpine"   
    },
    {
        id: 7,
        username: "zebra",
        firstname: "Gregory",
        lastname: "Gracia"   
    }
];

const gql = '/graphql';


describe('Graphql UserResolver (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule
    ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  }); 

  describe(gql, () => {
    describe('users', () => {
        // it('should return array of users', () => {
        //     return request(app.getHttpServer())
        //         .post(gql)
        //         .send({ query: '{users {id, username, firstname, lastname}}' })
        //         .expect(200)
        //         .expect((res) => {
        //             expect(res.body.data.users).toEqual(users);
        //         })
        // });

        it('should return one user details', () => {
            return request(app.getHttpServer())
                .post(gql)
                .send({ query: '{user(id: 7) {username, firstname}}' })
                .expect(200)
                .expect((res) => {
                    expect(res.body.data.user).toEqual({
                        username: 'zebra',
                        firstname: 'Gregory'
                    })
                })
        });
    });


  });
});
