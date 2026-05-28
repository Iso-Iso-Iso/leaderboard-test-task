import { faker } from '@faker-js/faker';

export function seeder() {
  return {
    userName: faker.internet.username(),
    value: faker.number.int({ min: 1, max: 10000 }),
  };
}
