import Parse from 'parse/react-native';
import { ParseUser as User } from "@/services/Interfaces";

export const getMessagesByRoom = async (room: Parse.Object) => {
    const Message : Parse.ObjectConstructor = Parse.Object.extend('Message');
    const query = new Parse.Query(Message);
    query.equalTo('room', room);
    return query.find();
};

export const sendMessage = async (text: string, user: User, room: Parse.Object) => {
  const message = new Parse.Object('Message');
  message.set('content', text);
  message.set('owner', user);
  message.set('room', room);
  return message.save();
};

export const deleteMessage = async (id: string) => {
  const query = new Parse.Query('Message');
  const message = await query.get(id);
  return message.destroy();
};

