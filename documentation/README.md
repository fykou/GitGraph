# Documentation

## Folder structure:

    GitGraph
    ├── ...
    ├── documentation           # Documentation files
    ├── public                  # Public files
    ├── src                     # Source files
    │   ├── components          # Custom React Components that can be reused
    │   ├── content             # Content folder with loader parent components
    │   ├── styles              # Style files
    │   ├── App.tsx             # Root component
    |   ├── data-loaders        # Various data loaders.
    │   ├── index.tsx           # Entry point for react
    └── ...

# Dependencies

Currently we are using the following dependencies:

- Axios
- TailwindCSS
- Recharts
- Lodash
- Yarn (instead of NPM)

## Why Axios?

Axios is a promise-based HTTP Client. It has all the basic functionalities required to do http requests from both node.js and the browser.\
We chose Axios over fetch because of:

- Ease of use, and previous experience with the technology.
- Cleaner code due to automatic JSON stringification when sending requests (not supported by the native Fetch API).
- Native protection against cross-site request forgery (XSRF) attacks.
- Better error handling, and the ability to intercept, cancel, and timeout HTTP requests.

<br/>

## Why Tailwind?

Tailwind is a highly customizable CSS framework.\
We chose to use Tailwind because of:

- Eliminates the complexity of traditional CSS styling and makes the code more maintainable.
- It's faster to write and makes consistentency in styling easier.

<br/>

## Why Recharts?

Recharts is a graph/chart library built ontop of d3.js and made for React. Making various graphs is as simple as importing their respective components and feeding them data from the GitLab API.

- Highly flexible
- Easy to use
- Popular library

## Why Yarn ?

Yarn is a popular javascript package manager like npm (node package manager). We choosed to use yarn instead of npm because of the multiple features it offers over npm.

- Stability
- Fast
- Convenience

# API

To fetch data from the GitLab API we've created a single loader object. Called [APILoader.ts](./../src/APILoader.ts)

Here we're using Axios to request data from the [the GitLab API](https://docs.gitlab.com/ee/api/api_resources.html) with our own project as the target project.

The data we're fetching is:

- Users
- Contributors
- Issues
- Commits

The API key used to access this data is defined in a .env in the root directory of the project. As the API key is sensitive data this is not pushed to the repository.
The .env file should have the following format:

```sh
REACT_APP_GITLAB_API_KEY=[api-key]
```

Keeping all loading logic in one object allows us to keep track of the objects state (if necesseary) and makes its easier to keep track of what GitLab endpoints are being requested.

When calling one of the **APILoader**'s methods, it uses the _WebStorageCache_ object to both store and load the request data from the GitLab API. Everytime we fetch data directly from the GitLab API, we also store this data in the browser's **Session Storage**. Doing this allows us to do less direct calls to the API, and in return makes the website faster and less intensive on the user's system.

<br/>

# CI (Pipeline)

A pipeline is a group of jobs that get executed in stages.

1. Build stage defined in `.gitlab-ci.yml`\
   The building stage ensures that the code contains only valid TypeScript.
2. Test stage defined in `.gitlab-ci.yml`\
   The testing stage ensures that all tests are passed and returns a coverage report.
3. Linting stage defined in `.gitlab-ci.yml`\
   The linting stage ensured that the code does not contain errors conflicting with our ESLint rules.

Additionally, a coverage-badge and pipeline-badge in the GitLab repo is updated is displayed.

<br/>

# Technical requirements

## React Context API

We choose not use the React context API because, we felt that it was redundant seeing as we already stored state within each parent component aswell as storing payload from the GitLab API in the browsers session storage. This is explained in more detail below.

## Local storage

Local and session storage. As mentioned earlier we use Session storage to store the data we fetch from the Gitlab API. This prevents the browser from requesting the data each time through the API. We use local storage to store the state of the radio button. Local storage stores a boolean that then determines if the graph should show complete data or use the 5 days data for the amount of commits per person.

## Component structure

    index.tsx                                      # React entry point
        └── Layout.tsx                             # General layout, wraps everything.
                ├──Navbar.tsx                      # Navigation
                ├──Header.tsx                      # Top section of the website
                ├──Main.tsx/Content.tsx            # Main component containing the content.
                |    └── data-loaders              # Inside content lies all HTML DOMs
                |          |
                │          ├──APILoader.tsx        # Data from the API is served
                |          └──WebStorageCache.tsx  # Save/Load API payload to sessionStorage
                └──Footer.tsx                      # Footer of the website

## Structure

Our website is using Axios to gather data from GitLab's resource REST API. The response is in a form of a json object, with _TypeScript_ we can give these JSON values types and allow us to safely access values on these objects. In **APILoader.ts** all the main fetching functions lie. All stored within a single class object that allow us maintain state if we want, (not necessairly React state (useState etc)). The data is then loaded into _models_ that allow us to further manipulate data within the object encapsulation.

The main React component for the website is **Content.tsx** that further divides into main parent class components such as **UserList** and **IssueList** these components use the **APILoader** to load their nessecarry data when that component is created, this is done with **ComponentDidMount** and only occurs once.

As mentioned earlier we use recharts to draw our graph, the code is found in **Charts.tsx**. On the main webpage there is a radio button that toggles between 2 graphs. The first graph to be drawn is a graph showing all the commits per person during the project lifespan. If we click on the button the graph only shows commits per person within the last 5 days.

We use an infobox to display information as of Last 5 issues created, the % of issues that are closed and the members in the repository. This infobox uses data from both **UserList** and **Issuelist**.

<br/>

# Testing

A test coverage badge has been added to the main README file aswell as the GitLab repo. This bade gives us insight into how much of the codebase has been thoroughly tested. Thus far not alot.

We've implemented some snapshot tests in order to make sure that data we're gathering from the API' matchs with expected data from the API. These sorts of tests are there to help us make sure that if we make alterations to the APILoader methods that we do not introduce some new wierd data type.

## Responsive Design

We designed the website with mobile design first in mind. In order to make our website mobile we applied tailwinds responsive styles that kept the relative distances between components even no matter what the size the user screen was. We also applied media queries to the **UserCard** and **IssueCard** to make them fit into a smaller page aswell as a bigger page. This was done by chaning the _flex-direction_ from _row_ to _column_

Here are some images of the mobile view.

!['Chart'](documentation/Images/5.jpg)
!['TopContibutors'](documentation/Images/3.jpg)
