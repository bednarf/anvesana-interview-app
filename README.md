## Short description of app

This is a simple app that allows you to search for a comments from [https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com). You can search for the comments using searchbar where you canfill the `postId` (1-100). If you fill the search input with the number in range 1-100, the app will search for the comments of `postId` you provided.

The search input is also `Autocomplete` input, so you can select the `postId` from the dropdown list as you write. In the dropdown list you can see the provided options. None of them will search for some comments. They are just for demonstration purposes.

You can also sort the comments by name, email, body. The comments are paginated and you can navigate through the pages.

Remember that this app is only for demonstration purposes and is not intended for production use.

## Technologies used
Material-UI, Next.js, React, TypeScript, Axios, ESLint, Prettier, Tanstack/react-query, JSONPlaceholder API.

## Getting Started

First create a `.env.local` file in the root of the project and copy the contents of the `.env.example` file into it. Or you can just rename the `.env.example` file to `.env.local`.

Then, install the dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
