import Parse from 'parse/react-native';
import { ParseUser as User } from "@/services/Interfaces";

export const getMessagesByOwner = async (user: User) => {
    const query = new Parse.Query('Message');
    query.equalTo('owner', user);
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

