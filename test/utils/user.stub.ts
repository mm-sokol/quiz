import { CreateUserInput } from "src/users/dto/create-user.input";
import { User, UserRole } from "src/users/entities/user.entity";

export const testUsers: CreateUserInput[] = [
{
    firstname: "Allan",
    lastname: "Poe",
    username: "bird",
    role: UserRole.STUDENT
},
{
    firstname: "Helen",
    lastname: "Marin",
    username: "aligator",
    role: UserRole.STUDENT
},
{
    firstname: "Anne",
    lastname: "Boleyn",
    username: "parrot",
    role: UserRole.TEACHER
},
{
    firstname: "Samwise",
    lastname: "Gamgee",
    username: "rabbit",
    role: UserRole.STUDENT
}
]

export const testUsersRecords: User[] = [
    {
        id:1,
        firstname: "Allan",
        lastname: "Poe",
        username: "bird",
        role: UserRole.STUDENT
    },
    {
        id:2,
        firstname: "Helen",
        lastname: "Marin",
        username: "aligator",
        role: UserRole.STUDENT
    },
    {
        id:3,
        firstname: "Anne",
        lastname: "Boleyn",
        username: "parrot",
        role: UserRole.TEACHER
    },
    {
        id:4,
        firstname: "Samwise",
        lastname: "Gamgee",
        username: "rabbit",
        role: UserRole.STUDENT
    }
]