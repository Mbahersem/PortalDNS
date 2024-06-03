# PortalDNS
Projet portant sur la réalisation d'une plateforme pour des enregistrements DNS auprès d'un serveur via le WiFi. Il est constitué de :
* `back` : Backend de l'application.
* `front` : Frontend de l'application.
* `scripts` : Scripts shell nécessaires pour l'exploitation.
* `init.sh` : Script de lancement du projet.

## back
Il s'agit du backend développé avec NodeJS, ExpressJS et SQLite.

### Base de données
On retrouve tout ce qui concerne les données dans le dossier `data`. On a d'abord créé un script SQL qui a la structure :
```sql
CREATE TABLE IF NOT EXISTS dns (
    ip TEXT PRIMARY KEY,
    domain TEXT NOT NULL,
    description TEXT,
    actif INTEGER
);
```
On va l'utiliser pour créer notre base de données dns.db.

### API
On a comme endpoints :
* `GET /list-dns` : Pour obtenir la liste des DNS présents dans notre base de données.
* `POST /add-dns` : Pour ajouter un enregistrement DNS à notre base de données en fournissant
```javascript
{
    ip: String,
    domain: String,
    description: String
}
```
* `GET /stop-dns` : Pour arrêter notre backend.

## front
Implémentation de notre interface graphique en utilisant NextJS.
* `page_accueil` : Page d'accueil du projet.
* `page_formulaire` : Page pour ajouter informations pour l'enregistrement DNS.
* `page_listeDNS` : Pour afficher la liste des DNS enregistrés dans notre base de données.

## scripts
* `add_dns.sh` : Code pour ajouter un enregistrement DNS en fournissant l'adresse IP et le nom de domaine.
* `install_dns` : Code pour l'installation, la configuration et le lancement du serveur DNS.
* `Captive` : Dossier pour ce qui concerne le WiFi et captive portal.