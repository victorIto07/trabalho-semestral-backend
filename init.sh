cd backend
sudo bun run src/app.ts >/dev/null &

cd ../frontend
sudo live-server --port=80 >/dev/null &
