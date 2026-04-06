import { renderHook, act } from '@testing-library/react';
import { useTheme } from './useTheme';
import { ThemeUtil } from '@/src/utils';

jest.mock('@/src/utils', () => ({
  ThemeUtil: {
    initializeTheme: jest.fn(),
    toggleTheme: jest.fn(),
  },
}));

const mockThemeUtil = ThemeUtil as jest.Mocked<typeof ThemeUtil>;

describe('useTheme', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial state', () => {
    it('should initialize with isDark as false before effect runs', () => {
      mockThemeUtil.initializeTheme.mockReturnValue(false);

      const { result } = renderHook(() => useTheme());

      expect(result.current.isDark).toBe(false);
    });

    it('should call ThemeUtil.initializeTheme on mount', () => {
      mockThemeUtil.initializeTheme.mockReturnValue(false);

      renderHook(() => useTheme());

      expect(mockThemeUtil.initializeTheme).toHaveBeenCalledTimes(1);
    });

    it('should set isDark to true when initializeTheme returns true', () => {
      mockThemeUtil.initializeTheme.mockReturnValue(true);

      const { result } = renderHook(() => useTheme());

      expect(result.current.isDark).toBe(true);
    });

    it('should set isDark to false when initializeTheme returns false', () => {
      mockThemeUtil.initializeTheme.mockReturnValue(false);

      const { result } = renderHook(() => useTheme());

      expect(result.current.isDark).toBe(false);
    });
  });

  describe('toggleTheme', () => {
    it('should call ThemeUtil.toggleTheme with current isDark value', () => {
      mockThemeUtil.initializeTheme.mockReturnValue(false);
      mockThemeUtil.toggleTheme.mockReturnValue(true);

      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.toggleTheme();
      });

      expect(mockThemeUtil.toggleTheme).toHaveBeenCalledWith(false);
    });

    it('should update isDark to true after toggle from false', () => {
      mockThemeUtil.initializeTheme.mockReturnValue(false);
      mockThemeUtil.toggleTheme.mockReturnValue(true);

      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.isDark).toBe(true);
    });

    it('should update isDark to false after toggle from true', () => {
      mockThemeUtil.initializeTheme.mockReturnValue(true);
      mockThemeUtil.toggleTheme.mockReturnValue(false);

      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.toggleTheme();
      });

      expect(mockThemeUtil.toggleTheme).toHaveBeenCalledWith(true);
      expect(result.current.isDark).toBe(false);
    });

    it('should toggle theme multiple times correctly', () => {
      mockThemeUtil.initializeTheme.mockReturnValue(false);
      mockThemeUtil.toggleTheme
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false);

      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.toggleTheme();
      });
      expect(result.current.isDark).toBe(true);

      act(() => {
        result.current.toggleTheme();
      });
      expect(result.current.isDark).toBe(false);
      expect(mockThemeUtil.toggleTheme).toHaveBeenCalledTimes(2);
    });
  });

  describe('return value', () => {
    it('should return isDark and toggleTheme', () => {
      mockThemeUtil.initializeTheme.mockReturnValue(false);

      const { result } = renderHook(() => useTheme());

      expect(result.current).toHaveProperty('isDark');
      expect(result.current).toHaveProperty('toggleTheme');
      expect(typeof result.current.toggleTheme).toBe('function');
    });
  });
});
