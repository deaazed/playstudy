import Parse from 'parse/react-native';
import { router } from 'expo-router';

export const listenCallRooms = async (user: Parse.User) => {
    const Room: Parse.ObjectConstructor = Parse.Object.extend('Room');
    const query = new Parse.Query(Room);
    query.equalTo('call', true);
    query.equalTo('members', user);
    const subscription = await query.subscribe();

    subscription.on('create', (object: Parse.Object) => {
        const isInitiator = object.get('initiator').id === user.id;
        if(!isInitiator) {
            router.push({ pathname: "/user/visio/incoming", params: { caller: object.get('initiator').id, isGroup: object.get('group'), room : object.id } });
        }
    });

    subscription.on('delete', (object: Parse.Object) => {
        console.log('Room deleted', object);
    });

    console.log('Subscription created', subscription);
    return subscription;
};

export const unsubscribeRoom = async ( subscription : Parse.LiveQuerySubscription ) => {
    subscription.unsubscribe();
};