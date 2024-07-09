import Parse from 'parse/react-native';
import { ParseUser as User } from "@/services/Interfaces";
import { listenCallRooms, unsubscribeRoom } from '@/services/LiveQueries';
import { getRooms } from './room';

export const getMe = async () => {
    try {
        let user: Parse.User | null = await Parse.User.currentAsync().catch((error: any) => { console.error(error); return null });
        return user;
    } catch (error: any) {
        console.error('Error while fetching current user', error);
    }
}

export const userSignup = async (data : User) => {
    const user: Parse.User = new Parse.User();
    user.set('username', data.username);
    user.set('email', data.email);
    user.set('age', data.age);
    user.set('password', data.password);
    user.set('avatar', data.avatar);

    try {
        let userResult: Parse.User = await user.signUp().catch((error: any) => { console.error(error); return {} as Parse.User });
        return userResult;
    } catch (error: any) {
        console.error('Error while signing up user', error);
    }
}

const getUserByEmailAddress = async (email: string) => {
    const Users: Parse.ObjectConstructor = Parse.Object.extend('User');
    const query: Parse.Query = new Parse.Query(Users);
    query.equalTo('email', email);
    try {
        const results: Parse.Object[] = await query.find().catch((error: any) => { console.error(error); return [] as Parse.Object[] });
        return results[0];
    } catch (error: any) {
        console.error('Error while fetching User by email', error);
    }
}

export const userLogin = async (data : User) => {
    try {
        const userResult: Parse.User|undefined = await Parse.User.logIn(data.email, data.password).catch((error: any) => undefined );
        if(userResult) {
            userResult?.set('disponibility', "A");
            await userResult.save().catch((error: any) => { console.error(error); return null });
        }
        listenCallRooms(userResult as Parse.User);
        return userResult;
    } catch (error: any) {
        console.error('Error while logging in user', error);
    }
}

export const userLogout = async () => {
    try {
        await Parse.User.logOut().catch((error: any) => { console.error(error); return null });
    } catch (error: any) {
        console.error('Error while logging out user', error);
    }
}

export const getUser = async (id: string) => {
    const Users: Parse.ObjectConstructor = Parse.Object.extend('User');
    const query: Parse.Query = new Parse.Query(Users);
    try {
        const user: Parse.Object = await query.get(id).catch((error: any) => { console.error(error); return {} as Parse.Object });
        return user;
    } catch (error: any) {
        console.error('Error while fetching User', error);
    }
}

export const getUsers = async () => {
    const Users: Parse.ObjectConstructor = Parse.Object.extend('User');
    const query: Parse.Query = new Parse.Query(Users);
    try {
        const results: Parse.Object[] = await query.find().catch((error: any) => { console.error(error); return [] as Parse.Object[] });
        return results;
    } catch (error: any) {
        console.error('Error while fetching Users', error);
    }
}

export const updateUser = async (data: User) => {
    try {
        const user: Parse.User | null = await Parse.User.currentAsync().catch((error: any) => { console.error(error); return {} as Parse.User });
        user?.set('username', data.username);
        user?.set('email', data.email);
        user?.set('age', data.age);
        user?.set('avatar', data.avatar);
        user?.set('disponibility', data.disponibility);
        await user?.save().catch((error: any) => { console.error(error); return null });

        const temp_sub = await listenCallRooms(user as Parse.User);
        unsubscribeRoom(temp_sub);
    }
    catch (error: any) {
        console.error('Error while updating user', error);
    }
}