Projet du module PHP-SQL-POO 
--

Partie pratique du module **POO-PHP-SQL** 

#### Descriptif: 
https://github.com/laukho/hitema

### Guide d'installation:
#### Pré-requis: 
1. Docker & Docker-compose

#### Téléchargement du code source et lancement de l'application: 
1. ``` Git clone https://github.com/lelbil/projetPHP.git ```
2. Se dériger vers le dossier `projetPHP` crée
3. ```docker-compose up ``` ou `docker-compose up -d ` (l'option -d est pour executer dans le background sans afficher les logs)
4. Ouvrir son navigateur web et aller vers l'adresse: `localhost:3000`
5. Taper le lieu (**Montpellier** par exemple) choisi et admirez le résultat 


### Stack technique:
#### Backend: 
* PHP

#### Frontend: 
* React.js

### Liste des conteneurs: 
* **server**: Le serveur 
* **db**: Une base de données MariaDB
* **pma**: PHP my admin
* **front**: Serveur Node.js servant le front-end React.js

### Liens: 
* **Application web:** `localhost:3000`
* **PhpMyAdmin:** `localhost:8080` (Username: **root** Password: **root**)
* **Serveur PHP:** `localhost` (PORT 80)