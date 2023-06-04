# **FRONTEND CODING CHALLENGE**

SpotiView is a web application that utilizes the Spotify API to display recently released songs, featured playlists, and browse different music genres.

Basic Spotify clone challenge. The service will be responsible for API response and loading state handling.

# **Pre-requisites**

- Clone the base code from GitHub link
- Add these environment variables to “.env” file in root directory to use Spotify APIs

`	`○ REACT_APP_SPOTIFY_CLIENT_ID

`	`○ REACT_APP_SPOTIFY_CLIENT_SECRET

`	`○ You can look at [Spotify API Documentation](https://developer.spotify.com/documentation/)

# **Requirements**

- Display “Released This Week” songs

`            `With using _new-releases_ API path

- Display “Featured Playlists”

`            `With using _featured-playlists_ API path

- Display “Browse genres”

`            `With using _categories_ API path


## Extra Feature

- Display “Search Artist”

`            `With using _artist_ API path

Users can search for their favorite artists

# **Rules**

- React and TypeScript is mandatory.
- Sass or Scss is mandatory.
- Dockerizing the app is a plus.
- Documentation/comment in the code is a plus.
- Extra UI components and API requests are optional.


## Prerequisites to Dockerize the App

### Clone the repository

\`\`\`bash
git clone https://github.com/yigitkg/frontend-coding-challenge.git
cd frontend-coding-challenge
\`\`\`

Ensure you have Docker installed:
* [Get Docker](https://docs.docker.com/get-docker/)

### Build the Docker image

\`\`\`bash
docker build -t spotiview .
\`\`\`

This command builds the Docker image and tags it as "spotiview".

### Run the Docker container

\`\`\`bash
docker run -p 8080:80 spotiview
\`\`\`

This command starts the Docker container and maps port 8080 of your local machine to port 80 of the Docker container.

You can now view the application in your web browser by visiting [http://localhost:8080](http://localhost:8080).

  
