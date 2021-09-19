Why Axios?
- Automatic JSON stringification when sending requests -> cleaner code. A feature not supported by the native Fetch API.
- Native protection against cross-site request forgery (CSFR) attacks.

The API key used is defined in a .env in the root directory of the project. As the API key is sensitive data this is not pushed to the repository.
The .env file should have the following format: `REACT_APP_GITLAB_API_KEY=[api-key]`