import { delay, mockUser } from './mockData';

export const getProfile = async () => {
  await delay(800);
  return {
    ...mockUser,
    security: {
      faceId: true,
      fingerprint: false,
    }
  };
};
