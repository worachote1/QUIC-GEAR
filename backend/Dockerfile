FROM alpine

# Set up environment for building
RUN apk add yarn nodejs

# Copy files to build environment
RUN mkdir /opt/quicgear-back
COPY . /opt/quicgear-back

WORKDIR /opt/quicgear-back
RUN yarn

CMD yarn run dev

