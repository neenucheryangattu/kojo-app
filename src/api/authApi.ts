import { delay, mockUser } from './mockData';

export const login = async (phone: string, email?: string, firstName?: string, lastName?: string) => {
  await delay(1000);
  if (!phone) {
    throw new Error('Phone number is required');
  }
  return {
    token: 'fake-jwt-token-12345',
    user: {
      ...mockUser,
      firstName: firstName || mockUser.firstName,
      lastName: lastName || mockUser.lastName,
      email: email || mockUser.email,
      phone: phone || mockUser.phone,
    },
  };
};
