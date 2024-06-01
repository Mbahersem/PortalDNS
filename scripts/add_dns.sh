#!/bin/bash
# Prend deux arguments :
# -	Nom de domaine
# -	Adresse IP

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

# Ajout du domaine au domaine local
# echo -e "$info" >> "$domaine"

if [ -e $db_file ]; then
	echo -e "$db2" >> "$db_file"
else
	# Création de la zone de recherche inversée
	echo -e "$local_zone" >> "$local"

	# Configuration de la rechercher inversée
	cat << EOF > "$db_file"
	;
	; BIND reverse data file for local loopback interface
	;
	\$TTL	604800
	
	@       IN      SOA     dns.local. root.local. (
				2         ; Serial
	       604800         ; Refresh
	        86400         ; Retry
	      2419200         ; Expire
	       604800 )       ; Negative Cache TTL
	 ;
	 @       IN      NS      dns.local.
	 $end      IN      PTR     $1.local.
	EOF
	
fi

systemctl restart named
