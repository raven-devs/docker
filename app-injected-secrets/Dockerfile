# docker build . -t my-fancy-image --build-arg PRIVATE_SSH_KEY=xxx
# docker history my-fancy-image

# Use multi-stage builds to avoid leaking secrets inside your docker history.
# The multi-stage build only retains the history of the final image. The builder history is ignored and thus your secret is safe.
# Comapre to Dockerfile-bad

FROM ruby:2.5.5-alpine AS builder

# This is a secret
ARG PRIVATE_SSH_KEY

# Just a basic Gemfile to make bundle install happy
RUN echo 'source "https://rubygems.org"; gem "sinatra"' > Gemfile

# We require the secret for installing dependencies
RUN mkdir -p /root/.ssh/ && \
  echo "${PRIVATE_SSH_KEY}" > /root/.ssh/id_rsa && \
  bundle install && \
  rm /root/.ssh/id_rsa

# The final image doesn't need the secret
FROM ruby:2.5.5-alpine

COPY --from=builder /usr/local/bundle/ /usr/local/bundle/

CMD ruby -e "puts 1 + 2"