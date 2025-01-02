import { faker } from "@faker-js/faker";
import { PostType } from "./types";

export function createRandomPost(): PostType {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}
