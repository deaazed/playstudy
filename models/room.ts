import Parse from 'parse/react-native';
import { ParseUser as User } from "@/services/Interfaces";


export const getRooms = async (user: Parse.User) => {
  const Room: Parse.ObjectConstructor = Parse.Object.extend('Room');
  const query = new Parse.Query(Room);
  query.equalTo('members', user);
  return query.find();
};

export const createRoom = async (name: string, users: User[], group : boolean, call? : boolean) => {
    const room = new Parse.Object('Room');
    room.set('name', name);
    room.set('members', users);
    room.set('group', group);
    room.set('initiator', users[0]);
    if(call) room.set('call', call);
    return room.save();
};

export const getRoom = async (id: string) => {
  const Room: Parse.ObjectConstructor = Parse.Object.extend('Room');
  const query = new Parse.Query(Room);
  const room : Parse.Object | null = await query.get(id).catch((error: any) => { return null });
  return room;
};

export const deleteRoom = async (id: string) => {
  const Room: Parse.ObjectConstructor = Parse.Object.extend('Room');
  const query = new Parse.Query(Room);
  const room = await query.get(id). catch((error: any) => { return null })
  return room?.destroy() ?? null;
};