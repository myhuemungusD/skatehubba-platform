// Setup file for Jest tests
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    back: jest.fn(),
    push: jest.fn(),
  })),
  Stack: {
    Screen: () => null,
  },
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(() =>
    Promise.resolve({
      exists: () => true,
      data: () => ({
        uid: "test-user-123",
        username: "TestSkater",
        avatarUrl: "https://example.com/avatar.png",
        level: 42,
        xp: 8500,
        stats: {
          wins: 25,
          losses: 10,
          checkIns: 150,
          hubbaBucks: 2500,
          distanceKm: 42.5,
        },
        sponsors: ["Thrasher", "Independent"],
        badges: ["Kickflip Master", "100 Games"],
      }),
    })
  ),
}));
