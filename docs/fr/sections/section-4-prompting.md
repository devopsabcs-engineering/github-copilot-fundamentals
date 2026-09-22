---
title: "Section 4 : Les fondamentaux de l'invite"
nav_order: 106
lang: fr
---

# Section 4 : Les fondamentaux de l'invite

Minutes 55 à 70. Quatre diapositives et l'activité C. L'activité C se rédige et s'évalue sur papier, cette section se déroule donc sans changement même si aucun outil n'est disponible.

* Page anglaise correspondante : [{{ '/sections/section-4-prompting.html' | relative_url }}]({{ '/sections/section-4-prompting.html' | relative_url }})

## Objectifs servis

* O3. Appliquer les techniques de base de rédaction d'invites
* O5. Évaluer et relire de façon responsable les productions générées par l'IA

## Déroulé

| Diapositive | Minutes | Activité |
| --- | --- | --- |
| S13. Une invite au résultat vérifiable | 55 à 59 | Présenter la grille en quatre parties |
| S14. Le contexte fournit les éléments de preuve | 59 à 62 | Opposer une demande vague et une demande précise sur les mêmes fichiers |
| S15. Activité C : préciser la limite du titre | 62 à 68 | Rédiger une invite de proposition uniquement, puis évaluer l'invite d'un binôme |
| S16. Itérer avec une raison | 68 à 70 | Corriger une mesure ambiguë, et dire pourquoi |

## La grille en quatre parties

Une invite relisible comporte quatre parties.

* **Objectif.** Rejeter les titres plus longs que la limite, mesurés après suppression des espaces.
* **Contexte.** Les trois fichiers nommés et l'ordre de validation existant.
* **Contraintes.** Mesurer des unités de code UTF-16, et non des caractères visibles. Placer le contrôle après les contrôles d'énumération. Préserver le comportement existant.
* **Tests d'acceptation.** {{ site.data.strings.invariant.constant_value }} unités acceptées, 81 unités refusées, un titre de {{ site.data.strings.invariant.constant_value }} unités entouré d'espaces accepté avec le titre retourné sans ces espaces.

Les trois premières parties décrivent une intention. Seule la quatrième peut échouer. Une invite sans tests d'acceptation ne peut pas être relue objectivement, et c'est la partie que presque tout le monde omet dans un premier jet.

## Le contexte fournit les éléments de preuve

`Corrige la validation` n'est pas une invite. Cela ne nomme ni fichier, ni règle, ni test, donc tout ce que cela produit est irrelisible.

Joignez le validateur, les types et les tests existants. Rien d'autre. Joindre davantage n'est pas joindre mieux, et un fichier d'environnement, un fichier d'identifiants ou du matériel client ne doivent jamais être joints comme contexte.

## Activité C : préciser la limite du titre

Minutes 62 à 68.

1. Minute 1. Critiquez ensemble la version vague.
2. Minutes 2 à 4. Rédigez une invite qui demande une **proposition uniquement**, sans modification de fichier et sans exécution de commande.
3. Minutes 5 à 6. Évaluez l'invite d'un binôme avec la grille en quatre parties.

L'invite doit nommer la constante `{{ site.data.strings.invariant.constant_name }}` avec la valeur {{ site.data.strings.invariant.constant_value }}, le placement après les contrôles d'énumération, le texte d'erreur exact `{{ site.data.strings.invariant.error_message }}`, les trois fichiers autorisés et les trois cas limites.

### Acceptation

* Contrôle mécanique : l'invite contient l'objectif, le contexte, les contraintes et les tests d'acceptation.
* Contrôle de jugement : un binôme peut reformuler le comportement attendu à partir de la seule invite.

### Solution de repli

Aucune n'est nécessaire. Rien n'est exécuté pendant cette activité, elle se déroule donc entièrement sur papier, sans aucun outil.

L'évaluation en binôme est le **premier** élément de l'ordre des coupes publié. Si la section déborde, supprimez l'évaluation et conservez la rédaction.

## Itérer avec une raison

L'expression `{{ site.data.strings.invariant.constant_value }} caractères` est ambiguë, car les octets, les points de code et les caractères visibles diffèrent tous. Dites unités de code UTF-16, mesurées après suppression des espaces.

Énoncez clairement que l'on compte des unités de code plutôt que des caractères visibles, et que les entrées accentuées et les émojis sont donc hors du périmètre de ce test de limite. Les cas limites n'utilisent que de l'ASCII, la mesure est donc sans ambiguïté.

Itérez parce que l'invite était ambiguë, non parce que la réponse était décevante. La seconde tentative réussit parce que la demande a changé, non parce que l'outil s'est amélioré.

## Suite

Continuez vers la [section 5]({{ '/fr/sections/section-5-agent-mode.html' | relative_url }}).
