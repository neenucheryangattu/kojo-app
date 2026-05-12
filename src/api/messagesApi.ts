import { delay, mockMessages } from './mockData';

export const getMessages = async () => {
  await delay(800);
  return mockMessages;
};
