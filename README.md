<img alt="coding" src="https://github.com/JuLblc/up-rugby/blob/main/public/logo.png" width="300">

# Project: Up-Rugby

## Introduction

After having successfully completed the Ironhack Wed Developement Bootcamp, I wanted to keep praticing and learning new things while I was applying for job position in the meantime.

For project I decided to usethe following technologies:

- Next JS,
- MongoDB & Mongoose,

## Pitch

Up-rugby is an educational content platform for rugby players, coaches and fans. There is both free and paid content.</br>
A friend of mine created the whole content and has a wordpress version of the application.
As the <a href="https://www.up-rugby.fr/">current version</a> doesn't look that great and the perfomance should be improve, my friend ask me to redesign it.

Here started the journey!!

## Features

- Mobile-first interface
- Authentication with NextAuth (Credentials & social Network)
- E-mail verification with Nodemailer
- Password reset email with Nodemailer
- Accessing video's stored on vimeo and youtube
- Checkout with Stripe
- Profil Admin for the back office

## Give it a try

Please follow this link: https://up-rugby.vercel.app/

https://user-images.githubusercontent.com/76005217/210181485-59a8007e-ae8d-47e8-a1c4-13e46b39eb9b.mov

https://user-images.githubusercontent.com/76005217/210181486-a99b7d76-0d38-4655-8bea-83c48da26e2c.mov

https://user-images.githubusercontent.com/76005217/210181484-a4dbeafd-6e36-4d59-9744-2c32a2fdff49.mov

# For developer

## How to use with docker compose

### Prerequisites

Install [Docker Desktop](https://docs.docker.com/get-docker) for Mac, Windows, or Linux. Docker Desktop includes Docker Compose as part of the installation.

### Development

First, run the development server:

```bash
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create up-rugby_network

# Up dev
npm run docker:dev:up

# Down dev
npm run docker:dev:down

# Restart dev
npm run docker:dev:start

# Stop dev
npm run docker:dev:stop
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

### Useful commands

```bash
# Stop all running containers
docker kill $(docker ps -aq) && docker rm $(docker ps -aq)

# Free space
docker system prune -af --volumes
```
