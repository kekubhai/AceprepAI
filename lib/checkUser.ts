'use server'
import { currentUser } from '@clerk/nextjs/server'
import prisma from "../app/db/prisma";

let cachedUser: any = null;

export const checkUser = async () => {
    if (cachedUser) return cachedUser; // Return cached user if already found

    const user = await currentUser();
    if (!user) return null;

    // Check if the user is already in the database by clerkId
    const loggedUser = await prisma.user.findUnique({
        where: {
            clerkId: user.id,
        }
    });

    if (loggedUser) {
        cachedUser = loggedUser;
        return loggedUser;
    }

    // Otherwise, create a new user entry
    const newUser = await prisma.user.create({
        data: {
            clerkId: user.id,
            email: user.emailAddresses[0]?.emailAddress || '',
            name: user.fullName || '',
            image: user.imageUrl || '',
        }
    });
    cachedUser = newUser;
    return newUser;
}