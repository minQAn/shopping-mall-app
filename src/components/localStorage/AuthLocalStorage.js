const AUTH_LOCALSTORAGE_KEY = 'user';

export function getAuthFromLocalStorage() {
  try {
    const user = localStorage.getItem(AUTH_LOCALSTORAGE_KEY);
    if (!user) return;

    return JSON.parse(user);
  } catch (e) {
    console.log('LocalStorage Error: ', e);
  }
}

export function setAuthToLocalStorage(user) {
  try {
    localStorage.setItem(AUTH_LOCALSTORAGE_KEY, JSON.stringify(user));
  } catch (e) {
    console.log('LocalStorage Error: ', e);
  }
}

export function emptyAuthFromLocalStorage() {
  try {
    localStorage.removeItem(AUTH_LOCALSTORAGE_KEY);
  } catch (e) {
    console.log('LocalStorage Error: ', e);
  }
}
