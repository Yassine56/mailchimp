function localtunnel {
  lt -s oansi2doaidasd3 --port 4000
}

until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done
