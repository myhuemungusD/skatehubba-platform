// apps/mobile/tests/profile.spec.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import ProfileScreen from '../app/profile/index';
import {
  useRouter,
  useLocalSearchParams,
} from 'expo-router';
import { useQuery } from '@tanstack/react-query';

jest.mock('@tanstack/react-query');
jest.mock('expo-router');
jest.mock('../app/hooks/useAuth', () => ({
  useAuth: () => ({ user: { uid: 'ownerUid' } }),
}));

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  return {
    ...Reanimated,
    default: Reanimated,
  };
});

const mockPush = jest.fn();

(useRouter as jest.Mock).mockReturnValue({ push: mockPush });
(useLocalSearchParams as jest.Mock).mockReturnValue({});

const mockProfile = {
  uid: 'ownerUid',
  handle: 'SlappedHam',
  level: 55,
  xp: 102863,
  maxXp: 200000,
  stats: {
    wins: 42,
    losses: 18,
    checkIns: 76,
    hubbaBucks: 1234,
    distanceSkated: 8002.7,
  },
  sponsors: ['Baker', 'Shake Junt'],
  badges: ['/badges/gold.png', '/badges/neon.png'],
  avatar: {
    outfit: '/avatar/outfit.png',
    deck: '/deck.png',
    shoes: '/shoes.png',
    hat: '/hat.png',
    buddy: '/buddy/toxel.png',
  },
  items: [],
};

(useQuery as jest.Mock).mockImplementation(() => ({
  data: mockProfile,
  isLoading: false,
  isError: false,
}));

test('renders profile with stats and buttons', () => {
  const { getByText } = render(<ProfileScreen />);

  expect(getByText('SlappedHam')).toBeTruthy();
  expect(getByText('LVL 55')).toBeTruthy();
  expect(getByText('WINS')).toBeTruthy();
  expect(getByText('42')).toBeTruthy();
  expect(getByText('CHALLENGE')).toBeTruthy();

  fireEvent.press(getByText('CLOSET'));
  expect(mockPush).toHaveBeenCalledWith('/closet');
});

test('public profile read-only hides TRADE ITEMS', () => {
  (useLocalSearchParams as jest.Mock).mockReturnValue({
    uid: 'otherUid',
  });

  const { queryByText } = render(<ProfileScreen />);
  expect(queryByText('TRADE ITEMS')).toBeNull();
});
