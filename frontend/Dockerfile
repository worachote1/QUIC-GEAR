FROM nginx:alpine

# Set up environment for building
RUN apk add yarn nodejs

# Copy files to build environment
RUN mkdir /opt/quicgear
COPY . /opt/quicgear

# Run Vite production build
WORKDIR /opt/quicgear
RUN yarn
CMD yarn start

# Copy files to nginx path
#RUN cp -r build/* /usr/share/nginx/html

