import { delay, mockDashboard } from './mockData';

export const getDashboardData = async () => {
  await delay(800);
  return mockDashboard;
};
