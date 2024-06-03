# !/bin/sh
# Lancement du backend et du frontend comme
# processus en arrière plan
sudo back/init_back.sh &

sudo front/init_front.sh &