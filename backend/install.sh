podman stop quicgear-back
podman rm quicgear-back

podman build -t quicgear-back .
cp quicgear-back.container ~/.config/containers/systemd
systemctl --user daemon-reload
systemctl --user start quicgear-back