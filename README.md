# GithubAPI

This is a NodeJS application that loads Repositories from GitHub using the [Personal Access Token](https://github.com/settings/tokens).

The API is published on Heroku: 
https://tscarton-git.herokuapp.com/api/repositories

```python 
curl --request GET 'https://tscarton-git.herokuapp.com/api/repositories' --header 'token: my_github_acess_token'

or

curl --request GET 'https://tscarton-git.herokuapp.com/api/repositories?name=my_repo' --header 'token: my_github_acess_token'
```



-   How to run the app
    -   Clone this repo
    -   ```npm install ```
    -   ```npm start```
    -   Or if dev environment ```npm run dev``` . The development environment uses DEBUG log level

- How to test it
  ```npm run test```

- This application is dockerized 
  - Build the image 
  ``` docker build . -t githubapi ```
  - Create the container
  ```docker run --name git -p 5000:5000 -d githubapi```
  - It exposes the PORT 5000

  


## GithubAPI client

The repo below contains a ReactJS app that uses this API:
https://github.com/tscarton/GitHubClient
