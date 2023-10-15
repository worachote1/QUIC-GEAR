podman stop quicgear-back
podman rm quicgear-back

podman build -t quicgear-back .
podman run --name quicgear-back -p 5000:5000 -v ../frontend:/opt/frontend -d quicgear-back

podman generate systemd quicgear-back > ~/.config/systemd/user/quicgear-back.service
systemctl --user daemon-reload
systemctl --user enable quicgear-back.service
