systemctl --user stop quicgear

podman build -t quicgear .
cp frontend/quicgear.container ~/.config/containers/systemd
systemctl --user daemon-reload
systemctl --user start quicgear


podman run --name quicgear -p 8083:3000 -v ./frontend:/opt/frontend -d quicgear yarn start
