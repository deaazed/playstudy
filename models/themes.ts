import Parse from 'parse/react-native';
import { ParseUser as User } from "@/services/Interfaces";

export const getThemes = async () => {
    const Themes : Parse.ObjectConstructor = Parse.Object.extend('Themes');
    const query = new Parse.Query(Themes);
    return query.find();
};

export const getTheme = async (id: string) => {
    const Themes : Parse.ObjectConstructor = Parse.Object.extend('Themes');
    const query = new Parse.Query(Themes);
    const theme : Parse.Object | null = await query.get(id).catch((error: any) => { return null });
    return theme;
};