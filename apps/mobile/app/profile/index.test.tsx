import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProfileScreen from './index';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { UserProfileSchema } from '@skatehubba/types';

// === MOCKS ===
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  useLocalSearchParams: jest.fn(() => ({})),
}));

jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({ user: { uid: 'user123' } })),
}));

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: mockPush });

// === VALIDATED MOCK PROFILE ===
const validProfile = UserProfileSchema.parse({
  uid: 'user123',
  handle: 'SlappedHam',
  stance: 'regular',
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
});

describe('ProfileScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useQuery as jest.Mock).mockReturnValue({ data: validProfile });
  });

  test('renders owner profile with stats and navigation buttons', async () => {
    const { getByText } = render(<ProfileScreen />);

    // Core identity
    expect(getByText('SlappedHam')).toBeTruthy();
    expect(getByText('REGULAR')).toBeTruthy();
    expect(getByText('LVL 55')).toBeTruthy();

    // Stats
    expect(getByText('42')).toBeTruthy(); // wins
    expect(getByText('18')).toBeTruthy(); // losses
    expect(getByText('76')).toBeTruthy(); // check-ins
    expect(getByText('1,234')).toBeTruthy(); // hubbaBucks
    expect(getByText('8,002.7 km')).toBeTruthy();

    // Buttons exist and navigate
    const closetBtn = getByText('CLOSET');
    fireEvent.press(closetBtn);
    expect(mockPush).toHaveBeenCalledWith('/closet');

    const challengeBtn = getByText('CHALLENGE');
    fireEvent.press(challengeBtn);
    expect(mockPush).toHaveBeenCalledWith('/friends');
  });

  test('public profile hides owner-only actions', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ uid: 'otherSkater123' });
    (useAuth as jest.Mock).mockReturnValue({ user: { uid: 'viewer456' } });

    const { getByText, queryByText } = render(<ProfileScreen />);

    expect(getByText('SlappedHam')).toBeTruthy(); // Still shows handle
    expect(getByText('LVL 55')).toBeTruthy();

    // Owner-only buttons should NOT appear
    expect(queryByText('CLOSET')).toBeNull();
    expect(queryByText('CHALLENGE')).toBeNull();
    expect(queryByText('CHECK-INS')).toBeNull();
  });

  test('shows loading state when no profile', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: undefined });

    const { getByText } = render(<ProfileScreen />);
    expect(getByText('Loading skater...')).toBeTruthy();
  });
});
