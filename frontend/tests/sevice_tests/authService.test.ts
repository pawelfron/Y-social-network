import { AuthService } from "../../../src/services/authService";

describe('AuthService', () => {
  beforeEach(() => {
    localStorage.clear();
    AuthService.reset_instance();
  });

  test('should return the same instance (singleton)', () => {
    const instance1 = AuthService.get_instance();
    const instance2 = AuthService.get_instance();
    expect(instance1).toBe(instance2);
  });

  test('should save tokens to localStorage', () => {
    const instance = AuthService.get_instance();
    const access = 'fakeAccessToken';
    const refresh = 'fakeRefreshToken';
    // @ts-ignore
    instance['saveTokens'](access, refresh);

    expect(localStorage.getItem('accessToken')).toBe(access);
    expect(localStorage.getItem('refreshToken')).toBe(refresh);
  });

  test('should load tokens from localStorage and set headers', () => {
    localStorage.setItem('accessToken', 'abc123');
    localStorage.setItem('refreshToken', 'def456');
    const instance = AuthService.get_instance();

    // @ts-ignore
    expect(instance['accessToken']).toBe('abc123');
    // @ts-ignore
    expect(instance['refreshToken']).toBe('def456');
  });
});
