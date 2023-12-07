systemctl --user stop quicgear

podman build -t quicgear .
cp quicgear.container ~/.config/containers/systemd
systemctl --user daemon-reload
systemctl --user start quicgear