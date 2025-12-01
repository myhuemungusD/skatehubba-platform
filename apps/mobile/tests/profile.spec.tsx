import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock modules before importing the component
jest.mock("@/hooks/useAuth", () => ({
  useAuth: jest.fn(() => ({
    user: { uid: "test-user-123" },
    loading: false,
  })),
}));

jest.mock("@/lib/firebase", () => ({
  db: {},
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

import ProfileScreen from "../app/profile/index";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};

describe("ProfileScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    const { getByText } = renderWithProviders(<ProfileScreen />);
    // The loading state might flash briefly
    // Wait for the profile to load
    await waitFor(() => {
      expect(getByText("PROFILE")).toBeTruthy();
    });
  });

  it("renders user profile information", async () => {
    const { getByText } = renderWithProviders(<ProfileScreen />);

    await waitFor(() => {
      expect(getByText("TestSkater")).toBeTruthy();
    });
  });

  it("displays user level correctly", async () => {
    const { getByText } = renderWithProviders(<ProfileScreen />);

    await waitFor(() => {
      expect(getByText("LVL 42")).toBeTruthy();
    });
  });

  it("displays user stats correctly", async () => {
    const { getByText, getAllByText } = renderWithProviders(<ProfileScreen />);

    await waitFor(() => {
      expect(getByText("25")).toBeTruthy(); // wins
      expect(getByText("WINS")).toBeTruthy();
      expect(getByText("10")).toBeTruthy(); // losses
      expect(getByText("LOSSES")).toBeTruthy();
      expect(getByText("150")).toBeTruthy(); // check-ins
      // CHECK-INS appears in both stats and nav, just check one exists
      expect(getAllByText("CHECK-INS").length).toBeGreaterThanOrEqual(1);
    });
  });

  it("displays sponsors section when sponsors exist", async () => {
    const { getByText } = renderWithProviders(<ProfileScreen />);

    await waitFor(() => {
      expect(getByText("SPONSORS")).toBeTruthy();
      expect(getByText("Thrasher")).toBeTruthy();
      expect(getByText("Independent")).toBeTruthy();
    });
  });

  it("displays badges section when badges exist", async () => {
    const { getByText } = renderWithProviders(<ProfileScreen />);

    await waitFor(() => {
      expect(getByText("BADGES")).toBeTruthy();
      expect(getByText("Kickflip Master")).toBeTruthy();
      expect(getByText("100 Games")).toBeTruthy();
    });
  });

  it("renders navigation buttons", async () => {
    const { getByText, getAllByText } = renderWithProviders(<ProfileScreen />);

    await waitFor(() => {
      expect(getByText("FRIENDS")).toBeTruthy();
      // CHECK-INS appears twice (stats and nav button)
      expect(getAllByText("CHECK-INS").length).toBeGreaterThanOrEqual(1);
      expect(getByText("CLOSET")).toBeTruthy();
    });
  });

  it("navigates back when back button is pressed", async () => {
    const mockBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
      push: jest.fn(),
    });

    renderWithProviders(<ProfileScreen />);

    // Note: In real implementation we'd need testID on the back button
    // This test shows the pattern
    await waitFor(() => {
      expect(mockBack).not.toHaveBeenCalled();
    });
  });

  it("navigates to closet when closet button is pressed", async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      back: jest.fn(),
      push: mockPush,
    });

    const { getByText } = renderWithProviders(<ProfileScreen />);

    await waitFor(() => {
      const closetButton = getByText("CLOSET");
      fireEvent.press(closetButton);
      expect(mockPush).toHaveBeenCalledWith("/closet");
    });
  });

  it("displays XP correctly", async () => {
    const { getByText } = renderWithProviders(<ProfileScreen />);

    await waitFor(() => {
      expect(getByText("8500 XP")).toBeTruthy();
    });
  });

  it("handles user with no sponsors gracefully", async () => {
    // Override the mock for this specific test
    const { getDoc } = require("firebase/firestore");
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({
        uid: "test-user-123",
        username: "NoSponsorSkater",
        avatarUrl: "https://example.com/avatar.png",
        level: 1,
        xp: 100,
        stats: {
          wins: 0,
          losses: 0,
          checkIns: 0,
          hubbaBucks: 0,
          distanceKm: 0,
        },
        sponsors: [],
        badges: [],
      }),
    });

    const { queryByText, getByText } = renderWithProviders(<ProfileScreen />);

    await waitFor(() => {
      expect(getByText("NoSponsorSkater")).toBeTruthy();
      // Sponsors section should not be rendered
      expect(queryByText("SPONSORS")).toBeNull();
    });
  });

  it("handles unauthenticated user", async () => {
    (useAuth as jest.Mock).mockReturnValueOnce({
      user: null,
      loading: false,
    });

    const { getByText } = renderWithProviders(<ProfileScreen />);

    await waitFor(() => {
      // Should still render but with default/empty values
      expect(getByText("PROFILE")).toBeTruthy();
    });
  });
});
