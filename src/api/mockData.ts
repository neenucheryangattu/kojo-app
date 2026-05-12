export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockUser = {
  id: '1',
  firstName: 'Sarah',
  lastName: 'Joe',
  phone: '(988) 000-8888',
  email: 'SarahJoe@example.com',
  dob: '01/10/1990',
};

export const mockDashboard = {
  creditScore: 704,
  status: 'Good',
  updatedAt: '09 Oct 2024',
  pointsChange: '+6pts',
  history: [
    { month: 'Jan', score: 650 },
    { month: 'Feb', score: 680 },
    { month: 'Mar', score: 660 },
    { month: 'Apr', score: 690 },
    { month: 'May', score: 710 },
    { month: 'Jun', score: 695 },
    { month: 'Jul', score: 730 },
    { month: 'Aug', score: 704 },
  ],
};

export const mockMessages = [
  {
    id: '1',
    sender: 'Premium Credit Solutions',
    snippet: 'Payment confirmed. Your receipt will arrive in your email shortly.',
    time: '2hr ago',
    unread: true,
  },
  {
    id: '2',
    sender: 'Standard Payment Services',
    snippet: 'We got your request. It\'s under review and you\'ll be notified once approved.',
    time: '2day ago',
    unread: true,
  },
  {
    id: '3',
    sender: 'Basic Financial Support',
    snippet: 'Payment reversed successfully. A confirmation email and SMS are on the way.',
    time: '2day ago',
    unread: false,
  },
  {
    id: '4',
    sender: 'Nova Finance Group',
    snippet: 'Your payment went through! We\'ve sent a confirmation to your registered email.',
    time: '3day ago',
    unread: false,
  },
];
