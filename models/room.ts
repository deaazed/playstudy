import Parse from 'parse/react-native';
import { ParseUser as User } from "@/services/Interfaces";


export const getRooms = async (user: User) => {
  const query = new Parse.Query('Room');
  query.equalTo('users', user);
  return query.find();
};

export const createRoom = async (name: string, users: User[], group : boolean) => {
    const room = new Parse.Object('Room');
    room.set('name', name);
    room.set('members', users);
    room.set('group', group);
    return room.save();
};

export const getRoom = async (id: string) => {
  const query = new Parse.Query('Room');
  return query.get(id);
};

export const deleteRoom = async (id: string) => {
  const query = new Parse.Query('Room');
  const room = await query.get(id);
  return room.destroy();
};