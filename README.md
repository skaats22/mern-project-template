# Prevent Unnecessary React Compiling Warnings/Errors

Update esline.config.js to add two more entries to the bottom of the rules entry:

```json
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // ADD THESE NEXT TWO ENTRIES
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
    },
```

# Instructions on How to Integrate a React Frontend (Generated Using Vite) and an Express Backend in a Single Project

Instead of coding a separate project for our React frontend, we will continue building upon the mern-project-template we coded for the Express backend.

## Generate the React App Using Vite

Similar to how we put our Express server code within a folder named **backend**, we will put our React app code within a folder named **frontend** by specifying "frontend" as the name of the app when using Vite...

1. Ensure that you are in the root of the `mern-project-template` (the folder that contains the `backend` folder).

2. Generate the React app:

   ```
   npm create vite@latest frontend
   ```

3. Open the newly created `frontend` folder in a new integrated terminal in VS Code and install its Node modules as usual:

   ```
   npm i
   ```

## Forwarding AJAX/Fetch Requests From the React Dev Server to the Express Server

When the browser makes a fetch request, for example:

```js
const res = await fetch('/api/puppies');
```

The request is always sent to the host shown in the address bar, known as the _origin_. This means that the fetch request will be sent to the React Dev Server at `http://localhost:5173/` instead of the intended Express server running on `http://localhost:3000`.

Instead of having to use an additional client `.env` file with Vite specific config variables, Vite allows us to specify where requests it receives should be forwarded to based upon what the path starts with.

Let's update the `vite.config.js` file as follows:

```js
export default defineConfig({
  plugins: [react()],
  // Add the following server property
  server: {
    proxy: { '/api': 'http://localhost:3000' },
  },
  // Additional code above
});
```

The above update informs React Dev Server to forward (proxy) all requests that begin with `/api` to `http://localhost:3000/api`.

> Be sure in the Express backend to define all API routes with a path that starts with `/api/...`.

Note that this proxy business only applies during development and is not an issue with production/deployed code because the host/origin in the address bar will be the Express server as needed.

## Developing in the MERN-Stack Requires Using Two Separate Terminal Sessions

You will always need two separate terminal sessions when developing for the MERN-Stack:

- One for the Express server (`localhost:3000`)
- One for the React Dev Server (`localhost:5173`)

**When developing, be sure to always have the browser viewing `localhost:5173` instead of `localhost:3000` because the Express server running on `localhost:3000` has been configured to deliver the production/built React code (it cannot access the un-built code in the _frontend/src_ folder).**

A nice touch is to right-click on each of the terminals and change their name and color!

<img src="https://i.imgur.com/idUI0qM.png" alt="Terminal Image">
