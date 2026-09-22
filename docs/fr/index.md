---
title: Accueil
nav_order: 101
lang: fr
---

# Les fondamentaux de GitHub Copilot

Une introduction de 90 minutes à GitHub Copilot, animée par un présentateur et construite autour d'un seul petit projet d'exercice synthétique plutôt qu'autour de diapositives seules.

> **{{ site.data.strings.fr.disclaimer.title }}**
>
> {{ site.data.strings.fr.disclaimer.body }}

## Langue

Ceci est l'édition française. L'édition anglaise est l'édition de référence, rédigée en premier.

* Page d'accueil anglaise : [{{ '/' | relative_url }}]({{ '/' | relative_url }})

Cette édition française est rédigée par une machine et attend encore la relecture d'une personne nommée. Le détail figure dans `docs/_data/decisions.yml`, sous `french_language_review`.

## Profil livré

| Élément | Valeur |
| --- | --- |
| Profil | Profil 1, le profil par défaut |
| Format | Démonstrations animées par un présentateur à des horaires fixes, avec de courtes activités réalisées dans le chat ou sur papier |
| Durée | 90 minutes |
| Prérequis des participants | Aucun au-delà de la présence. Un accès à Copilot est utile mais non requis. |
| Exercices au clavier | Absents de ce profil. Le profil 2 les ajoute et sera livré dans une version ultérieure. |

Le profil 1 correspond exactement à l'ordre du jour du fichier README du dépôt. Il convient à une salle mixte ou inconnue, car aucun participant n'a besoin d'une machine préparée, d'une chaîne d'outils ni d'un accès Copilot pour y prendre part.

## Horaire

| Section | Minutes | Page |
| --- | --- | --- |
| 1. Introduction à GitHub Copilot | 0 à 15 | [Section 1]({{ '/fr/sections/section-1-introduction.html' | relative_url }}) |
| 2. Prise en main de GitHub Copilot | 15 à 30 | [Section 2]({{ '/fr/sections/section-2-getting-started.html' | relative_url }}) |
| 3. Cas d'usage quotidiens du développeur | 30 à 55 | [Section 3]({{ '/fr/sections/section-3-everyday-use-cases.html' | relative_url }}) |
| 4. Les fondamentaux de l'invite | 55 à 70 | [Section 4]({{ '/fr/sections/section-4-prompting.html' | relative_url }}) |
| 5. Introduction au mode agent | 70 à 85 | [Section 5]({{ '/fr/sections/section-5-agent-mode.html' | relative_url }}) |
| 6. Conclusion et questions | 85 à 90 | [Section 6]({{ '/fr/sections/section-6-wrap-up.html' | relative_url }}) |

Les six sections reçoivent 15, 15, 25, 15, 15 et 5 minutes. La section 5 se termine à la minute 85 et la section 6 dispose exactement des 5 minutes que le README lui accorde, il n'y a donc aucune marge de conclusion. Le dépassement est absorbé par l'ordre des coupes publié dans le [guide de l'animateur]({{ '/fr/facilitator-runbook.html' | relative_url }}).

## Objectifs d'apprentissage

À la fin de la séance, les participants seront capables de :

* O1. Comprendre les capacités fondamentales de GitHub Copilot
* O2. Distinguer Copilot Chat, les complétions de code et le mode agent
* O3. Appliquer les techniques de base de rédaction d'invites
* O4. Utiliser Copilot pour soutenir les activités de développement courantes
* O5. Évaluer et relire de façon responsable les productions générées par l'IA
* O6. Commencer avec assurance à intégrer le développement assisté par IA dans leur travail quotidien

Chaque objectif est démontré par au moins une activité programmée, et chaque activité programmée sert au moins un objectif. La correspondance complète est publiée dans le [guide de l'animateur]({{ '/fr/facilitator-runbook.html' | relative_url }}).

## Le projet d'exercice

Chaque démonstration s'appuie sur le même petit projet d'exercice synthétique : un validateur de demandes de contenu écrit en TypeScript pour cet atelier.

* Il valide une demande de court contenu rédactionnel. C'est là tout son sujet.
* C'est un matériel pédagogique rédigé à l'origine pour cet atelier. Il ne contient aucun code client et ne modélise aucun système réglementé, critique pour la sécurité ou opérationnel.
* Il a deux dépendances, aucun accès réseau, aucune interface et aucune intégration de fournisseur.
* Les participants n'ont jamais besoin de l'installer. Dans le profil 1, c'est l'animateur qui le pilote.

## D'où viennent les nombres

Les décomptes de tests cités sur ces pages ont été observés sur une seule machine préparée, à une seule date, et consignés comme des observations. Ce ne sont pas des garanties, et une exécution qui annonce un nombre différent n'a pas échoué. L'acceptation se juge sur le comportement, décrit sur chaque page de section et encadré dans le guide de l'animateur.

## Pages

* [Prérequis]({{ '/fr/prerequisites.html' | relative_url }})
* [Guide de l'animateur]({{ '/fr/facilitator-runbook.html' | relative_url }})
* [Ressources]({{ '/fr/resources.html' | relative_url }})
