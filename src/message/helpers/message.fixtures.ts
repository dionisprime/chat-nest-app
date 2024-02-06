import { faker } from '@faker-js/faker';

export const defaultText = 'Hola mi amor';

export function defaultMessage(text = defaultText) {
  return {
    text,
    creator: faker.database.mongodbObjectId(),
    chat: faker.database.mongodbObjectId(),
  };
}

export function messageTest() {
  return {
    text: faker.word.noun(),
    creator: '65622c88cc855ee6e780c183',
    chat: faker.database.mongodbObjectId(),
  };
}

export function updateMessage() {
  return {
    id: faker.database.mongodbObjectId(),
    text: defaultText,
    creator: faker.database.mongodbObjectId(),
    chat: faker.database.mongodbObjectId(),
  };
}

export function removeMessage() {
  const id = '65622c88cc855ee6e780c183';
  const message = defaultText;
  const creator = faker.database.mongodbObjectId();
  const chat = faker.database.mongodbObjectId();
  return {
    id,
    message,
    creator,
    chat,
  };
}

export const messageId = '65622c88cc855ee6e780c183';

export const messageIdTest = faker.database.mongodbObjectId();
