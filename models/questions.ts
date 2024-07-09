import Parse from 'parse/react-native';
import { ParseUser as User } from "@/services/Interfaces";

export const getQuestionsByLevel = async (level : number) => {
    const Questions : Parse.ObjectConstructor = Parse.Object.extend('Questions');
    const query = new Parse.Query(Questions);
    query.equalTo('level', level);
    return query.find();
}