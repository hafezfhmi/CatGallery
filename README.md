# Starting the container for backend server

- Development mode:

        docker-compose -f dev.docker-compose.yml up

- Production mode:

      docker-compose -f docker-compose.yml up

# Starting the frontend client

Navigate to the client directory and run:

      npm run start

# Adding dependencies in development

Adding dependencies should be done in the container to make sure the dependencies is of the same platform as in production.

Dependencies can be added via:

- By running a terminal in the container:

        docker exec -it [container-id] bash

  and install the package directly in the container:

        npm install [package name]
