FROM ubuntu
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt-get install -y nodejs git
RUN mkdir /app
WORKDIR /app
RUN git clone https://github.com/tscarton/GitHubAPI.git
WORKDIR /app/GitHubAPI
RUN npm install
RUN npm run test