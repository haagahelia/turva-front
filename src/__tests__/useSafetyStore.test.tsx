import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafetyStore } from '../zustand/store';
import { briefingItems } from '../mockData';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('../mockData', () => ({
  briefingItems: [
    { id: "safe-haaga-helia", title: "Turvallinen Haaga-Helia", shortTitle: "Safe HH" },
    { id: "act-responsibly", title: "Toimi Vastuullisesti", shortTitle: "Be Responsible" },
    { id: "safety-observation-report", title: "Turvallisuushavaintoilmoitus", shortTitle: "Havaintoilmoitus" },
    { id: "safety-walk", title: "Turvallisuuskävely", shortTitle: "Safety Walk" },
    { id: "actions-disruptive-situations", title: "Toiminta Häiriötilanteissa", shortTitle: "Häiriötilanteet" },
    { id: "rescue-plan", title: "Pelastussuunnitelma", shortTitle: "Pelastussuunnitelma" },
    { id: "evacuation-building", title: "Poistuminen Rakennuksesta", shortTitle: "Poistuminen" },
    { id: "sheltering-indoors-1", title: "Sisälle Suojautuminen 1", shortTitle: "Suojautuminen 1" },
    { id: "sheltering-indoors-2", title: "Sisälle Suojautuminen 2", shortTitle: "Suojautuminen 2" },
    { id: "extreme-violence-situation", title: "Äärimmäinen Väkivaltatilanne", shortTitle: "Väkivaltatilanne" },
    { id: "risks-own-work", title: "Oman Työn Riskit", shortTitle: "Työn Riskit" },
  ],
}));

// Reset store between tests
describe('useSafetyStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSafetyStore.getState().resetSafety();
  });

  describe('Initial state', () => {
    it('should initialize with empty completed array and zero readCount', () => {
      const state = useSafetyStore.getState();
      expect(state.completed).toEqual([]);
      expect(state.readCount).toBe(0);
    });
  });

  describe('markCompleted', () => {
    it('should add a valid route to completed array and increment readCount', () => {
      const { markCompleted } = useSafetyStore.getState();
      const validRoute = 'safety-info?itemId=safe-haaga-helia';

      markCompleted(validRoute);

      const state = useSafetyStore.getState();
      expect(state.completed).toContain(validRoute);
      expect(state.readCount).toBe(1);
    });

    it('should remove route from completed array when toggled and decrement readCount', () => {
      const { markCompleted } = useSafetyStore.getState();
      const validRoute = 'safety-info?itemId=act-responsibly';

      // Add first
      markCompleted(validRoute);
      expect(useSafetyStore.getState().completed).toContain(validRoute);
      expect(useSafetyStore.getState().readCount).toBe(1);

      // Remove
      markCompleted(validRoute);
      const state = useSafetyStore.getState();
      expect(state.completed).not.toContain(validRoute);
      expect(state.readCount).toBe(0);
    });

    it('should only count valid briefing routes in readCount', () => {
      const { markCompleted } = useSafetyStore.getState();

      markCompleted('safety-info?itemId=safe-haaga-helia'); // valid
      markCompleted('safety-info?itemId=act-responsibly'); // valid
      markCompleted('safety-info?itemId=invalid-id'); // invalid ID
      markCompleted('other-route?itemId=safe-haaga-helia'); // invalid pattern

      const state = useSafetyStore.getState();

      expect(state.readCount).toBe(2); // Count the 2 valid routes
      expect(state.completed).toHaveLength(4); // But all routes are stored in completed
    });

    it('should handle multiple valid routes correctly', () => {
      const { markCompleted } = useSafetyStore.getState();

      markCompleted('safety-info?itemId=safe-haaga-helia');
      markCompleted('safety-info?itemId=act-responsibly');
      markCompleted('safety-info?itemId=safety-walk');

      const state = useSafetyStore.getState();
      expect(state.readCount).toBe(3);
      expect(state.completed).toHaveLength(3);
    });

    it('should work with all valid briefing item IDs', () => {
      const { markCompleted } = useSafetyStore.getState();

      // Test a few different valid IDs
      markCompleted('safety-info?itemId=rescue-plan');
      markCompleted('safety-info?itemId=extreme-violence-situation');
      markCompleted('safety-info?itemId=risks-own-work');

      const state = useSafetyStore.getState();
      expect(state.readCount).toBe(3);
      expect(state.completed).toHaveLength(3);
    });
  });

  describe('resetSafety', () => {
    it('should reset completed array and readCount to initial state', () => {
      const { markCompleted, resetSafety } = useSafetyStore.getState();

      markCompleted('safety-info?itemId=safe-haaga-helia');
      markCompleted('safety-info?itemId=act-responsibly');

      expect(useSafetyStore.getState().completed).toHaveLength(2);
      expect(useSafetyStore.getState().readCount).toBe(2);

      resetSafety();

      const state = useSafetyStore.getState();
      expect(state.completed).toEqual([]);
      expect(state.readCount).toBe(0);
    });
  });

  // Mix of valid and invalid completed items
  describe('initializeReadCount', () => {
    it('should recalculate readCount based on current completed array', () => {

      const completedRoutes = [
        'safety-info?itemId=safe-haaga-helia', // valid
        'safety-info?itemId=act-responsibly', // valid
        'safety-info?itemId=invalid-id', // invalid ID
        'other-route?itemId=safe-haaga-helia', // invalid pattern
        'safety-info?itemId=safety-observation-report', // valid
      ];

      // set state to data with wrong readCount
      useSafetyStore.setState({
        completed: completedRoutes,
        readCount: 0, // wrong
      });

      // Initializing should correct the readCount
      useSafetyStore.getState().initializeReadCount();

      const state = useSafetyStore.getState();
      expect(state.readCount).toBe(3); // 3 valid
    });

    it('should handle empty completed array', () => {
      useSafetyStore.getState().initializeReadCount();

      const state = useSafetyStore.getState();
      expect(state.readCount).toBe(0);
    });

    it('should correctly count all valid briefing items', () => {
      // Array with all valid routes
      const allValidRoutes = briefingItems.map(item => `safety-info?itemId=${item.id}`);
      
      // Add some invalid ones too
      const mixedRoutes = [
        ...allValidRoutes,
        'safety-info?itemId=invalid-id',
        'other-route?itemId=safe-haaga-helia',
      ];

      useSafetyStore.setState({
        completed: mixedRoutes,
        readCount: 0, // wrong count
      });

      useSafetyStore.getState().initializeReadCount();

      const state = useSafetyStore.getState();
      expect(state.readCount).toBe(briefingItems.length); // Should count all valid items (i hope)
    });
  });

  describe('Persistence', () => {
    it('should interact with AsyncStorage when state changes', () => {
      const { markCompleted } = useSafetyStore.getState();

      markCompleted('safety-info?itemId=safe-haaga-helia');

      // Verify AsyncStorage was called
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'safety-storage',
        expect.any(String)
      );
    });
  });
});