import { createContext, type ReactNode, useContext, useMemo, useState } from 'react';

type MockUserStateValue = {
  favoriteIds: string[];
  followedBreederIds: string[];
  isFavorite: (id: string) => boolean;
  isFollowing: (id: string) => boolean;
  toggleFavorite: (id: string) => boolean;
  toggleFollow: (id: string) => boolean;
};

const MockUserStateContext = createContext<MockUserStateValue | null>(null);

export function MockUserStateProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState(['l1', 'l3']);
  const [followedBreederIds, setFollowedBreederIds] = useState(['b1', 'b3']);

  const value = useMemo<MockUserStateValue>(() => ({
    favoriteIds,
    followedBreederIds,
    isFavorite: (id) => favoriteIds.includes(id),
    isFollowing: (id) => followedBreederIds.includes(id),
    toggleFavorite: (id) => {
      const next = !favoriteIds.includes(id);
      setFavoriteIds((current) => next ? [...current, id] : current.filter((item) => item !== id));
      return next;
    },
    toggleFollow: (id) => {
      const next = !followedBreederIds.includes(id);
      setFollowedBreederIds((current) => next ? [...current, id] : current.filter((item) => item !== id));
      return next;
    },
  }), [favoriteIds, followedBreederIds]);

  return <MockUserStateContext.Provider value={value}>{children}</MockUserStateContext.Provider>;
}

export function useMockUserState() {
  const context = useContext(MockUserStateContext);
  if (!context) throw new Error('useMockUserState must be used inside MockUserStateProvider');
  return context;
}
