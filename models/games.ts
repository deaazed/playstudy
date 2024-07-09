import Parse from 'parse/react-native';
import { ParseUser as User } from "@/services/Interfaces";

export const getGames = async () => {
    const Games : Parse.ObjectConstructor = Parse.Object.extend('Games');
    const query = new Parse.Query(Games);
    return query.find();
};