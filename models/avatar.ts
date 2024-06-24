import Parse from 'parse/react-native';

export const getAvatars = async () => {
    const Avatars: Parse.ObjectConstructor = Parse.Object.extend('Avatars');
    const query: Parse.Query = new Parse.Query(Avatars);
    try {
        const results: Parse.Object[] = await query.find().catch((error: any) => { console.error(error); return [] as Parse.Object[] });
        return results;
    } catch (error: any) {
        console.error('Error while fetching Avatars', error);
    }
}