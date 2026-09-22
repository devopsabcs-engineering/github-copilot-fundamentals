---
title: "Section 5 : Introduction au mode agent"
nav_order: 107
lang: fr
---

# Section 5 : Introduction au mode agent

Minutes 70 à 85. Quatre diapositives, l'activité D et la démonstration de relecture qui porte l'objectif de relecture responsable.

* Page anglaise correspondante : [{{ '/sections/section-5-agent-mode.html' | relative_url }}]({{ '/sections/section-5-agent-mode.html' | relative_url }})

## Objectifs servis

* O2. Distinguer Copilot Chat, les complétions de code et le mode agent
* O3. Appliquer les techniques de base de rédaction d'invites
* O4. Utiliser Copilot pour soutenir les activités de développement courantes
* O5. Évaluer et relire de façon responsable les productions générées par l'IA

## Déroulé

| Diapositive | Minutes | Activité |
| --- | --- | --- |
| S17. Ask, Edit et Agent | 70 à 73 | Comparer les plans que les surfaces produisent pour la même demande |
| S18. Examiner le plan et les autorisations | 73 à 76 | Lire le plan, puis décider d'approuver ou non l'exécution |
| S19. Activité D : implémenter la limite du titre | 76 à 81 | Appliquer le plan relu à exactement trois fichiers |
| S20. Relire, tester, restaurer | 81 à 85 | Inspecter le diff, lire les résultats réels, puis accepter, refuser ou réviser |

La section 5 se termine à la minute 85 et la section 6 commence à ce moment. Cette limite est consignée comme une décision résolue, et elle signifie qu'il n'existe aucune marge de conclusion à dépenser.

## Choisir une surface

* Ask produit une question et une réponse, et ne modifie aucun fichier.
* Edit produit une modification délimitée aux fichiers que vous avez choisis vous-même.
* Agent produit un plan, puis des modifications sur plusieurs fichiers, puis une relecture que vous devez effectuer.

Choisissez la plus petite surface capable de faire le travail.

## Examiner le plan

Lisez le plan avant de l'approuver : quels fichiers, dans quel ordre, avec quel texte d'erreur. Le périmètre autorisé est de trois fichiers, et tout ce qui en sort est un arrêt plutôt qu'un avertissement. Aucune installation de paquet, aucun accès réseau, aucun fichier d'environnement et aucun contenu de domaine réglementé.

Si le plan nomme un quatrième fichier, refusez-le devant la salle. Un plan refusé est une démonstration réussie, pas une démonstration ratée. L'approbation est le point de contrôle, car une fois l'exécution d'un outil approuvée, la relecture passe de bon marché à coûteuse.

## Activité D : implémenter la limite du titre

Minutes 76 à 81, avec la relecture de 81 à 85.

Avant l'exécution, chaque participant note les deux fichiers qu'il inspecterait en premier, et pourquoi.

Le périmètre est exactement de trois fichiers sous `lib/scenario-engine/` :

* `{{ site.data.strings.invariant.files.types }}` exporte `{{ site.data.strings.invariant.constant_name }}` avec la valeur {{ site.data.strings.invariant.constant_value }}.
* `{{ site.data.strings.invariant.files.implementation }}` rejette les titres trop longs après les contrôles d'énumération existants, avec l'erreur exacte `{{ site.data.strings.invariant.error_message }}`.
* `{{ site.data.strings.invariant.files.test }}` reçoit exactement trois cas limites, écrits avec des nombres littéraux.

### L'invite

Utilisez cette invite telle quelle. C'est l'invite d'atelier approuvée.

```text
Dans ce projet d'exercice synthétique, ajoute une longueur maximale de titre de
{{ site.data.strings.invariant.constant_value }} unités de code UTF-16 JavaScript, mesurée après suppression des
espaces de début et de fin. Modifie uniquement {{ site.data.strings.invariant.files.types }},
{{ site.data.strings.invariant.files.implementation }} et {{ site.data.strings.invariant.files.test }} dans
lib/scenario-engine/. Exporte {{ site.data.strings.invariant.constant_name }} depuis {{ site.data.strings.invariant.files.types }}.
Conserve les énumérations, les signatures publiques, les erreurs et l'ordre de
validation existants. Place le nouveau contrôle après les contrôles
d'énumération. Utilise l'erreur "{{ site.data.strings.invariant.error_message }}".
Conserve chaque test existant et n'affaiblis, ne supprime et ne réécris aucune
assertion existante. Ajoute des tests pour {{ site.data.strings.invariant.constant_value }} unités, 81 unités et un
titre de {{ site.data.strings.invariant.constant_value }} unités entouré d'espaces, et écris ces bornes
attendues sous forme de nombres littéraux plutôt qu'en référence à
{{ site.data.strings.invariant.constant_name }}, afin que les tests échouent si la constante est incorrecte.
N'installe aucun paquet, n'accède pas au réseau, ne lis aucun fichier
d'environnement et ne génère aucun contenu étranger à ce projet d'exercice. Exécute les tests
ciblés et la vérification de types préparés. Présente le diff et les résultats
réels.
```

Deux clauses de cette invite sont déterminantes et ne doivent être ni retirées ni reformulées lorsque l'invite est raccourcie.

1. Chaque test existant est conservé, et aucune assertion existante n'est affaiblie, supprimée ni réécrite.
2. Les nouvelles bornes attendues sont écrites sous forme de nombres littéraux plutôt qu'en référence à la nouvelle constante.

Sans elles, un agent qui écrit ses valeurs attendues à partir de la nouvelle constante produit une suite qui passe pour n'importe quelle valeur de limite. Les éléments de preuve de l'objectif de relecture responsable s'effondrent alors, même si l'exécution paraît verte.

### Acceptation

* Contrôle mécanique : le diff ne touche que les trois fichiers autorisés, tous les cas de référence passent encore, et les nouveaux cas limites utilisent des nombres littéraux plutôt que la nouvelle constante.
* Contrôle de jugement : le participant identifie au moins une chose à modifier dans le diff généré.

### Résultats observés

Sur la machine préparée :

| Point de la séquence | Observé |
| --- | --- |
| Trois cas limites ajoutés, règle non implémentée | 27 cas, 26 réussites, 1 échec, code de sortie 1 |
| Règle implémentée | 27 cas, 27 réussites, code de sortie 0 |

Les 24 cas de référence étaient inchangés dans les deux états. Ces décomptes sont des observations faites sur une machine à une date donnée, et non des garanties.

### Solution de repli

Si l'exécution de l'agent ne peut pas être menée en direct, examinez le diff enregistré ainsi que les sorties enregistrées avant et après. Annoncez à voix haute qu'ils sont enregistrés, et signalez-les comme enregistrés à l'écran. La discussion de relecture des minutes 81 à 85 se déroule sans changement.

## La démonstration de relecture n'est jamais supprimée

La relecture de S20 est le seul endroit de la séance où la relecture responsable est démontrée face à une production réelle. Elle n'est jamais retirée, quel que soit le dépassement. Le temps est récupéré sur les quatre éléments antérieurs de l'ordre des coupes publié.

La reprise après une mauvaise exécution est une réinitialisation, pas une dispute avec l'outil. Le projet d'exercice est livré avec un script de réinitialisation et une copie d'origine des trois fichiers, précisément pour cette raison.

## Suite

Continuez vers la [section 6]({{ '/fr/sections/section-6-wrap-up.html' | relative_url }}).
