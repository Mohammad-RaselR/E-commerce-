# Fix Redux Import Error

## Step 1: Rename Directory
Rename the folder from "redux copy" to "redux":

```
src/
├── redux copy/   ← Rename this folder
    ├── store.js
    └── user/
```

to:

```
src/
├── redux/        ← To this
    ├── store.js
    └── user/
```

## Step 2: Verify Redux Store Setup
After renaming, make sure your Redux store.js file is correctly configured:

1. It should export both `store` and `persistor`
2. Make sure all reducers are properly registered
3. Verify that the redux-persist configuration is correct