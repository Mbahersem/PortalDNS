#!/bin/bash

interface="/etc/systemd/network/10-virtualeth0.netdev"
network="/etc/systemd/network/10-virtualeth0.network"
dhcp_client="/etc/dhcp/dhclient.conf"
named_conf="/etc/bind/named.conf.options"
resolved="/etc/systemd/resolved.conf"
local="/etc/bind/named.conf"
db_dns="/etc/bind/db.dns.local"
db_server="/etc/bind/db.0.42.10"


conf_options="options {\n\tdirectory \"/var/cache/bind\";\n\tlisten-on { 127.0.0.1; 10.42.0.1; };\n\tlisten-on-v6 { none; };\n\trecursion yes;\n\tallow-recursion { 127.0.0.1; 10.42.0.0/24; };\n\tdnssec-validation auto;\n\tquerylog yes;\n};"
local_zone="zone \"local\" {\n\ttype master;\n\tfile \"/etc/bind/db.dns.local\";\n};\nzone \"0.42.10.in-addr.arpa\" {\n\ttype master;\n\tfile \"/etc/bind/db.0.42.10\";\n};"
dns_local="\$TTL 15m\n@             IN SOA     dns.local root.local. (\n\t\t  2021082512     ; n° série\n\t\t\t\t  1h     ; intervalle de rafraîchissement esclave\n\t\t\t\t 15m     ; intervalle de réessaie pour l’esclave\n\t\t\t\t  1w     ; temps d’expiration de la copie esclave\n\t\t\t\t  1h )   ; temps de cache NXDOMAIN\n\n\t\t\t  IN NS      dns.local\n; domaine vers adresse IP\ndns           IN A     10.42.0.1"
dns10="\$TTL 15m\n@       IN SOA     dns.local. root.local. (\n\t2021082512     ; n° série\n\t\t\t1h     ; intervalle de rafraîchissement esclave\n\t\t   15m     ; intervalle de réessaie pour l’esclave\n\t\t\t1w     ; temps d’expiration de la copie esclave\n\t\t\t1h )   ; temps de cache NXDOMAIN\n\n\t\tIN NS      dns.local.\n\n; IP vers nom de domaine DNS\n1  IN PTR     dns.local.\n"

if [ -e $interface ]; then	
	sudo systemctl start named
else
	# Création de l'interface réseau virtuelle
	sudo echo -e "[NetDev]\nName = virtualeth0\nKind = dummy" > "$interface"
	sudo echo -e "[Match]\nName = virtualeth0\n\n[Network]\nAddress = 10.10.10.1/24" > "$network"
	
	# Réinitialisation après création
	sudo systemctl start systemd-networkd
	sudo systemctl enable systemd-networkd
	
	# Ajout du serveur DNS local dans la liste des serveurs DNS fournis
	echo "prepend local 10.42.0.1" >> "$dhcp_client"
	
	# Définition du domaine local de la machine Ubuntu
	sudo hostnamectl set-hostname dns.local --static
	
	# Installation des applications de base
	sudo apt install -y bind9 bind9utils bind9-dnsutils bind9-doc bind9-host net-tools
	
	# Activation du serveur Bind9 au démarrage
	# sudo systemctl enable named
	
	# Configuration du DNS local
	echo -e "$conf_options" > "$named_conf"
	# cat << EOF > "$named_conf"
	# options {
	#	directory "/var/cache/bind";
	#	listen-on { 127.0.0.1; 10.42.0.1; };
	#	listen-on-v6 { none; };
	#	recursion yes;
	#	allow-recursion { 127.0.0.1; 10.42.0.0/24; };
	#	dnssec-validation auto;
	#	querylog yes;
	# };
	#EOF
	
	# Redémarrage du serveur DNS
	sudo systemctl restart named
	
	# Ajout du serveur DNS local à la liste des serveurs DNS de systemd-resolved
	sudo echo "DNS=10.42.0.1" >> "$resolved"
	
	# Relancer le réseau
	sudo systemctl restart systemd-resolved
	sudo nmcli general reload
	
	# Configuration de la zone DNS locale
	sudo echo -e "$local_zone" >> "$local"
	
	# Paramétrage de la zone locale
	sudo echo -e "$dns_local" > "$db_dns"
	# cat << EOF > "$db_dns"
	# \$TTL 15m
	# @             IN SOA     dns.local root.local. (
	#	2021082512     ; n° série
	#			1h     ; intervalle de rafraîchissement esclave
	#		   15m     ; intervalle de réessaie pour l’esclave
	#		    1w     ; temps d’expiration de la copie esclave
	#		    1h )   ; temps de cache NXDOMAIN
	#		    
	#		   	IN NS      dns.local
	#		   	
	#		   	; domaine vers adresse IP
	# dns    IN A   10.42.0.1
	# EOF
	
	sudo echo -e "$dns_10" > "$db_server"
	# cat << EOF > "$db_server"
	# \$TTL 15m
	# @       IN SOA     dns.local. root.local. (
	#	2021082512     ; n° série
	#	        1h     ; intervalle de rafraîchissement esclave
	#	       15m     ; intervalle de réessaie pour l’esclave
	#	        1w     ; temps d’expiration de la copie esclave
	#	        1h )   ; temps de cache NXDOMAIN
	#	        IN NS      dns.local.
	#	        
	#	        ; IP vers nom de domaine DNS
	# 1  IN PTR     dns.local.
	# EOF
	
	# Test de la configuration
	sudo named-checkconf
	
	# Validation de la configuration de la zone
	sudo systemctl restart named
	
	# Arrêt du serveur
	sudo systemctl stop named
fi
