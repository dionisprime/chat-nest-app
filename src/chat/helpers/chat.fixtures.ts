import { faker } from '@faker-js/faker';

export const defaultNameOfChat = 'strikers';

export function defaultChat(title = defaultNameOfChat) {
  return {
    title,
    members: [faker.database.mongodbObjectId()],
  };
}

export function chatTest() {
  return {
    title: faker.word.noun().toString(),
    members: [faker.database.mongodbObjectId().toString()],
  };
}

export function updateChat() {
  const id = '65639ea784481de1430ea3e2';
  const title = defaultNameOfChat;
  const members = [faker.database.mongodbObjectId()];
  return {
    id,
    title,
    members,
  };
}

export function removeChat() {
  const id = '65639ea784481de1430ea3e2';
  const title = 'Strada One Love';
  const members = [faker.database.mongodbObjectId()];
  return {
    id,
    title,
    members,
  };
}

export const chatId = '65639ea784481de1430ea3e2';
