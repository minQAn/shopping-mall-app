# Shopping Mall App Project

### Database

- Firebase

### Libraries

- React Router Dom
- React Icons
- Tailwindcss
- uuid

### Something I learned new from this project

- replace

```jsx
<Navigate to='/' replace />
// replace=true: if you want to not save this path in history to prevent coming from unapproved user
```

- AuthContext for ProtectedRoute

```jsx
// Had to initialize the useState with localStorage,
// if not, it will return undefined when it first rendered and navigate to Home
const [auth, setAuth] = useState(() => getAuthFromLocalStorage());

useEffect(() => {
  onUserStateChange((user) => {
    setAuthToLocalStorage(user);
    setAuth(user);
  }); // same as (user => setUser(user))
}, []);
```
