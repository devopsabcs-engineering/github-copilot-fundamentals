---
title: Prérequis
nav_order: 102
lang: fr
---

# Prérequis

Cette page ne couvre que le profil 1, qui est le profil livré. Le profil 1 est animé par un présentateur et ne demande rien à la machine d'un participant.

> **{{ site.data.strings.fr.disclaimer.title }}**
>
> {{ site.data.strings.fr.disclaimer.body }}

* Page de prérequis anglaise : [{{ '/prerequisites.html' | relative_url }}]({{ '/prerequisites.html' | relative_url }})

## Pour les participants

Rien n'est installé, ni connecté, ni configuré pendant la séance.

| Élément | Requis | Remarques |
| --- | --- | --- |
| Présence | Oui | La séance est animée de bout en bout par un présentateur. |
| De quoi écrire | Oui | Trois des quatre activités se font sur papier ou dans le chat. |
| Un accès GitHub Copilot | Non | Utile pour suivre en parallèle, mais aucune activité n'en dépend. |
| Un éditeur ou une chaîne d'outils préparés | Non | Aucun participant n'exécute le projet d'exercice dans le profil 1. |
| Une expérience de TypeScript | Non | Le projet d'exercice est lu et commenté, pas écrit par les participants. |

Si vous disposez d'un accès Copilot et souhaitez suivre en parallèle, connectez-vous avant le début de la séance plutôt que pendant.

## Pour l'animateur

Ces conditions doivent être remplies avant l'arrivée de la salle, et non sous ses yeux.

* Un éditeur connecté avec Copilot fonctionnel, vérifié sur la machine de présentation.
* Le projet d'exercice déjà décompressé, ses dépendances déjà installées, et une exécution verte des tests de référence déjà observée.
* Le script de réinitialisation exercé au moins une fois, pour que la reprise soit une commande plutôt qu'une improvisation.
* Les ressources de repli enregistrées, présentes et accessibles hors connexion. Elles sont nommées une à une dans le [guide de l'animateur]({{ '/fr/facilitator-runbook.html' | relative_url }}).
* Un profil de capture propre : aucun chemin client, aucun nom d'organisation, aucun identifiant de compte, aucun onglet sans rapport et aucun historique de conversation visible à l'écran.
* Le formulaire de billet de sortie ouvert et prêt, pour que la section 6 ne consacre pas ses 5 minutes à la logistique.

## Traitement des données

Seul le projet d'exercice synthétique entre dans une invite Copilot pendant cette séance. Ne placez aucun matériel client, aucun code propriétaire, aucun identifiant et aucun fichier d'environnement dans une invite, une pièce jointe ou une capture d'écran.

Savoir si Copilot peut être utilisé sur du code privé ou client est une décision organisationnelle distincte, avec son propre responsable. Elle sort du périmètre de cette séance, et un animateur doit refuser d'improviser une réponse à ce sujet.

## Le profil 2 et le contrat de travail préalable

Le profil 2 est la variante de 120 minutes qui remplace chaque activité par un exercice au clavier sur un projet préparé. Il introduit de vrais prérequis que le profil 1 n'a pas : une chaîne d'outils locale fonctionnelle, un accès Copilot vérifié pour chaque participant, et un contrat de travail préalable signé avant l'événement.

Le profil 2 et son contrat de travail préalable sont **prévus pour une version ultérieure**. Ils ne sont volontairement pas décrits ici et aucune page ne leur correspond encore. Si l'achèvement du travail préalable ne peut pas être confirmé pour un groupe, la séance est livrée en profil 1.
