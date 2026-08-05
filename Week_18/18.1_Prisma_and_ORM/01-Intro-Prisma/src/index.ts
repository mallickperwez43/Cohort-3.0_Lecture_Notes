import { prismaClient } from "./prisma.js"

const createNewUser = async (username: string, email: string, password: string) => {
    const createdUser = await prismaClient.user.create({
        data: {
            username: username,
            email: email,
            password: password
        }
    });

    return createdUser;
};

const createNewTodo = async (title: string, description: string, done: boolean, userId: number) => {
    const createdTodo = await prismaClient.todo.create({
        data: {
            title: title,
            description: description,
            done: done,
            user: {
                connect: {
                    id: userId
                }
            }
        }
    });

    return createdTodo;
}

async function main() {
    try {
        console.log("Creating users....");

        const user1 = await createNewUser("alex", "alex@gmail.com", "12345678");
        console.log("User 1 Created:", user1);

        const user2 = await createNewUser("mercer", "mercer@gmail.com", "12345678");
        console.log("User 2 Created:", user2);
    } catch (error) {
        console.error("Database operation failed:", error);
    } finally {
        await prismaClient.$disconnect();
    }
}


// main();

async function todoFunc() {
    try {
        console.log("Creating Todos....");

        const todo1 = await createNewTodo("Go to Gym thrice", "Gymming gives fitness", false, 1);
        console.log("Todo 1 Created:", todo1);

        const todo2 = await createNewTodo("Go to Work Always", "Bring money and happiness", true, 2);
        console.log("Todo 2 Created:", todo2);
    } catch (error) {
        console.error("Database operation failed:", error);
    } finally {
        await prismaClient.$disconnect();
    }
}

todoFunc();