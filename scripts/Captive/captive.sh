#!/bin/bash

# Vérifie si l'utilisateur est root
if [[ $EUID -ne 0 ]]; then
   echo "Ce script doit être exécuté en tant que root" 
   exit 1
fi

# Définir l'interface réseau à utiliser
INTERFACE="wlo1"

# Définir l'adresse IP du serveur web
SERVER_IP="192.168.43.57"

# Définir le chemin du fichier HTML
HTML_FILE="/var/www/html/captive_portal.html"

# Configurer le redirection DNS
echo "nameserver 8.8.8.8" > /etc/resolv.conf

# Activer le forwarding IP
echo 1 > /proc/sys/net/ipv4/ip_forward

# Configurer les règles iptables
iptables -t nat -A PREROUTING -i $INTERFACE -p tcp --dport 80 -j DNAT --to-destination $SERVER_IP:80
iptables -t nat -A POSTROUTING -o $INTERFACE -j MASQUERADE

# Rediriger le trafic HTTP vers la page HTML
iptables -t filter -A FORWARD -i $INTERFACE -o $INTERFACE -p tcp --dport 80 -j ACCEPT
iptables -t filter -A FORWARD -i $INTERFACE -o $INTERFACE -p tcp --dport 443 -j ACCEPT
iptables -t filter -A FORWARD -i $INTERFACE -o $INTERFACE -j REJECT --reject-with icmp-port-unreachable

# Démarrer le serveur web
systemctl start apache2

echo "Le portail captif a été configuré avec succès !"
