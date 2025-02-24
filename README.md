
# iut-nodejs-tp-projet

Ce projet est un TP noté dans le cadre de ma formation de **troisième année de BUT Informatique**, dans la matière **R6A.05 Développement Avancé**.

Vous pourrez retrouver le rendu du travail dans les releases du repository: https://github.com/SaitamTheBest/iut-nodejs-tp-projet/releases




## Démarrer le projet 

Cloner le projet

```bash
  git clone https://github.com/SaitamTheBest/iut-nodejs-tp-projet.git
```

Placez vous dans le bon dossier

```bash
  cd iut-nodejs-tp-projet
  cd iut-project
```

Installer les dépendances

```bash
  npm install
```

> [!IMPORTANT]
> Avant de lancer le projet il vous faudra également Docker pour pouvoir lancer les conteneurs suivants:

Lancer le conteneur MySQL 

```bash
  docker run -d --name hapi-mysql -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user -p 3307:3306 mysql:8.0 --default-authentication-plugin=mysql_native_password
```

Lancer le conteneur [RabbitMQ](https://www.rabbitmq.com/docs/download)

```bash
  docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:4.0-management
```

> [!NOTE]
> Si vous voulez avoir accès aux informations via l'interface de RabbitMQ, alors executez les commandes suivantes :

Ouvrez la console du conteneur

```bash
  docker exec -it rabbitmq bash
```

Créer un utilisateur administrateur (vous pouvez changer le nom du compte et le mot de passe, elle n'est pas lié au projet).

```bash
  rabbitmqctl add_user admin passwd
  rabbitmqctl set_user_tags admin administrator
  rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"
```

Démarrer le projet

> [!CAUTION]
> N'oubliez pas d'ajouter les variables d'environnement, auquel cas le projet ne marchera pas correctement, [Cliquez ici pour en savoir plus](https://github.com/SaitamTheBest/iut-nodejs-tp-projet?tab=readme-ov-file#variables-denvironnement). 

```bash
  npm start
```


## Variables d'environnement

Pour démarrer ce projet, vous aurez besoin d'ajouter dans le dossier `iut-project` où se trouve le projet un fichier ``.env` dans lequel vous y ajouterez les variables d'environnement suivantes:

```bash
  SMTP_HOST=smtp.ethereal.email
  SMTP_PORT=587
  SMTP_USER=<email du faux utilisateur>
  SMTP_PASS=<mot de passe du faux utilisateur>
```
> [!WARNING]
> Pour récupérer votre faux utilisateur, rendez-vous sur le site https://ethereal.email/ et cliquer sur `Create Ethereal Account`. Pour accèder à vos mails, vous pouvez cliquer sur le bouton `Messages` ou copier l'url https://ethereal.email/messages 

## Migration 

Pour pouvoir récupérer les migrations les plus récentes, vous pouvez executez la commande suivante dans le dossier `iut-project`:

```bash
  npx knex migrate:latest   
```


## Authors

- [Matias DEVEZE G7](https://github.com/SaitamTheBest) (matias.deveze@etu.unilim.fr)

