#!/bin/bash
# 1. Nom du hotspot
# 2. Mot de passe

activer_hotspot() {
    nom_hotspot=$1
    mot_de_passe=$2
    nmcli device wifi hotspot con-name "$nom_hotspot" ssid "$nom_hotspot" password "$mot_de_passe"
    echo "Le hotspot a été activé avec succès."
}

# Exemple d'utilisation : ./activer_hotspot.sh "MonHotspot" "MonMotDePasse"

nom_hotspot=$1
mot_de_passe=$2
activer_hotspot "$nom_hotspot" "$mot_de_passe"
