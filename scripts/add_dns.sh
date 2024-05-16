#!/bin/bash

domaine="/etc/bind/db.dns.local"
local="/etc/bind/named.conf.local"

begin=${2:0:2}
second=${2:3:2}
third=${2:6:1}
end=${2:8:3}
rev_body="$third.$second.$begin"
db_file="/etc/bind/db.$rev_body"

info="$1	IN	A	$2"
local_zone="zone \"$rev_body.in-addr.arpa\" {\n\ttype master;\n\tfile \"/etc/bind/db.$rev_body\";\n};"
db=";\n; BIND reverse data file for local loopback interface\n;\n\$TTL\t604800\n@       IN      SOA     dns.local. root.local. (\n\t\t\t\t\t\t\t   2         ; Serial\n\t\t\t\t\t\t 604800         ; Refresh\n\n\t\t\t\t\t\t  86400         ; Retry\n\t\t\t\t\t\t2419200         ; Expire\n\t\t\t\t\t\t 604800 )       ; Negative Cache TTL\n;\n@       IN      NS      dns.local.\n$end      IN      PTR     $1.local."
db2="$end	IN	PTR	$1.local."

# Ajout du domaine au domaine local
echo -e "$info" >> "$domaine"

if [ -e $db_file ]; then
	echo -e "$db2" >> "$db_file"
else
	# Création de la zone de recherche inversée
	echo -e "$local_zone" >> "$local"

	# Configuration de la rechercher inversée
	echo -e "$db" > "$db_file"
fi

systemctl restart named
