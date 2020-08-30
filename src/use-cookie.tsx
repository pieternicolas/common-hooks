import { useState, useCallback } from 'react';
import Cookies from 'js-cookie';

const defaultCookieOptions = {
  expires: 1,
};

/**
 * Cookie hook
 *
 * @param key property name of cookie
 * @param initialValue initial value of cookie (will not set the cookie automatically)
 *
 * @returns {Array.<{cookieStateValue: any, setValue: Function}>} Array of cookie value, function to set value, and to remove value
 */
const useCookie = (key: string, initialValue: any = null): [any, Function] => {
  const [cookieStateValue, setCookieStateValue] = useState(() => {
    try {
      const cookie = Cookies.get(key);

      if (cookie === 'null') {
        return JSON.parse(Cookies.get(key) ?? 'null');
      }
      return cookie;
    } catch {
      return initialValue;
    }
  });

  const removeCookie = useCallback(() => {
    setCookieStateValue(null);
    Cookies.remove(key);
  }, [key]);

  const setValue = useCallback(
    (value: any, option: object = {}) => {
      if (value === null) {
        removeCookie();
        return;
      }

      setCookieStateValue(value);
      Cookies.set(key, value, { ...defaultCookieOptions, ...option });
    },
    [key, removeCookie]
  );

  return [cookieStateValue, setValue];
};

export default useCookie;
