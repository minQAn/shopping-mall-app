# Shopping Mall App Project

### Database

- Firebase

### Libraries

- React Router Dom
- React Icons
- Tailwindcss
- uuid
- @tanstack/react-query

<br />

---

<br />

## Something I learned new from this project

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

- To show uploaded image

```jsx
// In form in NewProduct component
{
  file && <img src={URL.createObjectURL(file)} alt='local file' />;
}
```

- useQuery and useMutation

```jsx
// NewProduct component

// If used staleTime for the query, you have to 'invalidate' to update immediately using useMutation

const queryClient = useQueryClient();
const addProduct = useMutation(
  ({ product, url }) => addNewProduct(product, url),
  {
    onSuccess: () => queryClient.invalidateQueries(['products']),
  }
);
```

- Hooks: useCart, useProducts Hooks

https://tkdodo.eu/blog/practical-react-query#create-custom-hooks

You can keep the actual data fetching out of the ui, but co-located with your useQuery call.

You can keep all usages of one query key (and potentially type definitions) in one file.

If you need to tweak some settings or add some data transformation, you can do that in one place.
