import Parse from 'parse/react-native';
import { ParseUser as User } from "@/services/Interfaces";
import exp from 'constants';

export const getPlayerAwardsByGame = async (game: Parse.Object, theme: string) => {
    const Awards : Parse.ObjectConstructor = Parse.Object.extend('Awards');
    const query = new Parse.Query(Awards);
    query.equalTo('user', Parse.User.current());
    query.equalTo('game', game);
    query.equalTo('theme', theme);
    return query.find();
};

export const getAwardsByTheme = async (theme: Parse.Object) => {
    const Awards : Parse.ObjectConstructor = Parse.Object.extend('Awards');
    const query = new Parse.Query(Awards);
    query.equalTo('theme', theme);
    query.equalTo('player', Parse.User.current());
    return query.find();
};

export const getPlayerAwards = async () => {
    const Awards : Parse.ObjectConstructor = Parse.Object.extend('Awards');
    const query = new Parse.Query(Awards);
    query.equalTo('player', Parse.User.current());
    return query.find();
};

export const setAward = async (theme: Parse.Object, game: Parse.Object, player: Parse.User, question: Parse.Object) => {
    const Awards : Parse.ObjectConstructor = Parse.Object.extend('Awards');
    const newAward = new Awards();
    newAward.set('theme', theme);
    newAward.set('player', player);
    newAward.set('game', game);
    newAward.set('question', question);
    return newAward.save();
}