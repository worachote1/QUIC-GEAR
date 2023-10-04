podman stop quicgear
podman rm quicgear

podman build -t quicgear .
podman run --name quicgear -p 8083:80 -d quicgear

podman generate systemd quicgear > ~/.config/systemd/user/quicgear.service
systemctl --user daemon-reload
systemctl --user enable quicgear.service
