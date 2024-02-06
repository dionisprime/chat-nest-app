import { faker } from '@faker-js/faker';

export const defaultName = 'Kirill';

export function defaultUser(name = defaultName) {
  return {
    name,
    lastName: faker.word.words(),
    phoneNumber: faker.number.int(),
  };
}

export function userTest() {
  return {
    name: faker.word.noun(),
    lastName: faker.word.words(),
    phoneNumber: faker.number.int(),
  };
}

export const UserId = '65639ea784481de1430ea3e4';

export function updateUser() {
  const id = '65639ea784481de1430ea3e4';
  const name = defaultName;
  const lastName = 'Klimavtsov';
  const phoneNumber = 980812009240;
  return {
    id,
    name,
    lastName,
    phoneNumber,
  };
}

export function removeUser() {
  const id = '65639ea784481de1430ea3e4';
  const name = 'Alexey';
  const lastName = 'Klimavtsov';
  const phoneNumber = 980812009240;
  return {
    id,
    name,
    lastName,
    phoneNumber,
  };
}
