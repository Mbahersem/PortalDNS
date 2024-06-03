#!/bin/bash
# 1. Nom du hotspot
# 2. Mot de passe

creer_point_acces() {
    local nom_hotspot=$1
    local mot_de_passe=$2

    if [ -z "$nom_hotspot" ] || [ -z "$mot_de_passe" ]; then
        echo "Usage: $0 <nom_hotspot> <mot_de_passe>"
        return 1
    fi

    # Créer le fichier de configuration hostapd
    cat > /etc/hostapd/hostapd.conf <<EOF
interface=wlo1
driver=nl80211
ssid=$nom_hotspot
wpa=2
wpa_passphrase=$mot_de_passe
EOF

    # Démarrer le point d'accès
    hostapd /etc/hostapd/hostapd.conf
    local ret=$?
    if [ $ret -eq 0 ]; then
        echo "Le hotspot a été activé avec succès."
    else
        echo "Échec de l'activation du hotspot."
        return $ret
    fi
}

# Exemple d'utilisation : ./activer_hotspot.sh "ivan_hotspot" "ivan1234"
creer_point_acces "$1" "$2"
