FROM node:18

WORKDIR /app

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

# Keep the container running
ENTRYPOINT [ "/entrypoint.sh" ]