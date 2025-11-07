import { ThemeUtil, Theme } from './theme';

describe('ThemeUtil', () => {
  let mockLocalStorage: { [key: string]: string };
  let mockMatchMedia: jest.Mock;
  let mockDocumentElement: {
    classList: {
      add: jest.Mock;
      remove: jest.Mock;
      toggle: jest.Mock;
    };
  };

  beforeEach(() => {
    mockLocalStorage = {};

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key: string) => mockLocalStorage[key] || null),
        setItem: jest.fn((key: string, value: string) => {
          mockLocalStorage[key] = value;
        }),
        removeItem: jest.fn((key: string) => {
          delete mockLocalStorage[key];
        }),
        clear: jest.fn(() => {
          mockLocalStorage = {};
        }),
      },
      writable: true,
    });

    mockMatchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      value: mockMatchMedia,
      writable: true,
    });

    mockDocumentElement = {
      classList: {
        add: jest.fn(),
        remove: jest.fn(),
        toggle: jest.fn(),
      },
    };

    Object.defineProperty(document, 'documentElement', {
      value: mockDocumentElement,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getInitialTheme', () => {
    it('should return false when window is undefined (SSR)', () => {
      const originalWindow = global.window;
      // @ts-expect-error: Testing SSR scenario
      delete global.window;

      const result = ThemeUtil.getInitialTheme();

      expect(result).toBe(false);

      global.window = originalWindow;
    });

    it('should return true when localStorage has dark theme', () => {
      mockLocalStorage['theme'] = 'dark';

      const result = ThemeUtil.getInitialTheme();

      expect(result).toBe(true);
      expect(window.localStorage.getItem).toHaveBeenCalledWith('theme');
    });

    it('should return false when localStorage has light theme', () => {
      mockLocalStorage['theme'] = 'light';

      const result = ThemeUtil.getInitialTheme();

      expect(result).toBe(false);
    });

    it('should return true when no saved theme but system prefers dark', () => {
      mockMatchMedia.mockImplementation((query: string) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));

      const result = ThemeUtil.getInitialTheme();

      expect(result).toBe(true);
      expect(mockMatchMedia).toHaveBeenCalledWith(
        '(prefers-color-scheme: dark)'
      );
    });

    it('should return false when no saved theme and system prefers light', () => {
      mockMatchMedia.mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));

      const result = ThemeUtil.getInitialTheme();

      expect(result).toBe(false);
    });

    it('should prioritize localStorage over system preference', () => {
      mockLocalStorage['theme'] = 'light';
      mockMatchMedia.mockImplementation((query: string) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));

      const result = ThemeUtil.getInitialTheme();

      expect(result).toBe(false);
    });
  });

  describe('applyTheme', () => {
    it('should return early when document is undefined (SSR)', () => {
      const originalDocument = global.document;
      // @ts-expect-error: Testing SSR scenario
      delete global.document;

      ThemeUtil.applyTheme(true);

      expect(true).toBe(true);

      global.document = originalDocument;
    });

    it('should add dark class when isDark is true', () => {
      ThemeUtil.applyTheme(true);

      expect(mockDocumentElement.classList.add).toHaveBeenCalledWith('dark');
      expect(mockDocumentElement.classList.remove).not.toHaveBeenCalled();
    });

    it('should remove dark class when isDark is false', () => {
      ThemeUtil.applyTheme(false);

      expect(mockDocumentElement.classList.remove).toHaveBeenCalledWith('dark');
      expect(mockDocumentElement.classList.add).not.toHaveBeenCalled();
    });
  });

  describe('initializeTheme', () => {
    it('should get initial theme and apply it, returning dark mode', () => {
      mockLocalStorage['theme'] = 'dark';

      const result = ThemeUtil.initializeTheme();

      expect(result).toBe(true);
      expect(mockDocumentElement.classList.add).toHaveBeenCalledWith('dark');
    });

    it('should get initial theme and apply it, returning light mode', () => {
      mockLocalStorage['theme'] = 'light';

      const result = ThemeUtil.initializeTheme();

      expect(result).toBe(false);
      expect(mockDocumentElement.classList.remove).toHaveBeenCalledWith('dark');
    });
  });

  describe('toggleTheme', () => {
    it('should return early when document is undefined (SSR)', () => {
      const originalDocument = global.document;
      // @ts-expect-error: Testing SSR scenario
      delete global.document;

      const result = ThemeUtil.toggleTheme(false);

      expect(result).toBe(true);

      global.document = originalDocument;
    });

    it('should toggle from light to dark', () => {
      const result = ThemeUtil.toggleTheme(false);

      expect(result).toBe(true);
      expect(mockDocumentElement.classList.toggle).toHaveBeenCalledWith(
        'dark',
        true
      );
      expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    });

    it('should toggle from dark to light', () => {
      const result = ThemeUtil.toggleTheme(true);

      expect(result).toBe(false);
      expect(mockDocumentElement.classList.toggle).toHaveBeenCalledWith(
        'dark',
        false
      );
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'theme',
        'light'
      );
    });

    it('should save theme to localStorage when toggling', () => {
      ThemeUtil.toggleTheme(false);

      expect(mockLocalStorage['theme']).toBe('dark');
    });
  });

  describe('saveTheme', () => {
    it('should return early when window is undefined (SSR)', () => {
      const originalWindow = global.window;
      // @ts-expect-error: Testing SSR scenario
      delete global.window;

      ThemeUtil.saveTheme('dark');

      expect(true).toBe(true);

      global.window = originalWindow;
    });

    it('should save dark theme to localStorage', () => {
      ThemeUtil.saveTheme('dark');

      expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
      expect(mockLocalStorage['theme']).toBe('dark');
    });

    it('should save light theme to localStorage', () => {
      ThemeUtil.saveTheme('light');

      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'theme',
        'light'
      );
      expect(mockLocalStorage['theme']).toBe('light');
    });
  });

  describe('getSavedTheme', () => {
    it('should return null when window is undefined (SSR)', () => {
      const originalWindow = global.window;
      // @ts-expect-error: Testing SSR scenario
      delete global.window;

      const result = ThemeUtil.getSavedTheme();

      expect(result).toBeNull();

      global.window = originalWindow;
    });

    it('should return dark theme from localStorage', () => {
      mockLocalStorage['theme'] = 'dark';

      const result = ThemeUtil.getSavedTheme();

      expect(result).toBe('dark');
      expect(window.localStorage.getItem).toHaveBeenCalledWith('theme');
    });

    it('should return light theme from localStorage', () => {
      mockLocalStorage['theme'] = 'light';

      const result = ThemeUtil.getSavedTheme();

      expect(result).toBe('light');
    });

    it('should return null when no theme is saved', () => {
      const result = ThemeUtil.getSavedTheme();

      expect(result).toBeNull();
    });
  });
});
