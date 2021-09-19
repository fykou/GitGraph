## Configure env setup:

We use yarn as our package manager, in order to get the app to run and be up to date with the latest dependencies run:

`yarn install`

Downloads all the newest dependencies based on package.json

## Available Scripts

In the project directory, you can run:

`yarn start`

Runs the app in the development mode.

`yarn test`

Launches the test runner in the interactive watch mode.

`yarn build`

Builds the app for production to the `build` folder.

`yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Naming conventions

We use the following naming conventions:

- FEAT - For developing new feature
- CHANGE - Updating/modifying existing code
- DRAFT - For work in progress code
- DELETE - Removal off code (no additions)

Commit messages need to follow one of these four tags before additional message.
Commit messages also need to be written in present time.

`FEAT: add new component`

## Code reviews

Everytime a member of the group creates a merge request, it needs to reviewed and verified by atleast one person before merging it.
After the MR has been verfiied and accepted, the creator of the MR needs to merge it into the master branch.

Remember to squash commits when merging, since commit messages after dosen't make much sense in the master branch.

### Dependencies:

- TypeScript
- React
- Tailwind CSS
- Jest
- Eslint
- Prettier
- Craco
- Font awesome
- Axios

### VSCode extensions

- Prettier
- ESLint
- Bracket Pair Colorizer
- Tailwind CSS Intelisense
- Vim (for legends)
