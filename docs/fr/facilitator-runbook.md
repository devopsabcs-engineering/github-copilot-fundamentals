---
title: Guide de l'animateur
nav_order: 110
lang: fr
---

# Guide de l'animateur

Tout ce qu'il faut pour mener la séance, publié comme une page plutôt qu'enfoui dans les notes du présentateur. Un co-animateur, un traducteur ou un relecteur ne peut pas lire les notes du présentateur pendant que la séance se déroule.

* Page anglaise correspondante : [{{ '/facilitator-runbook.html' | relative_url }}]({{ '/facilitator-runbook.html' | relative_url }})

Profil 1, animé par un présentateur, 90 minutes. Répartition des sections : 15, 15, 25, 15, 15 et 5 minutes.

## Déroulé

| Minutes | Diapositive | Ce qui se passe | Arrêt impératif |
| --- | --- | --- | --- |
| 0 à 3 | S01 | Titre, durée, répartition des sections, avis d'indépendance lu à voix haute | |
| 3 à 7 | S02 | Ce que Copilot fait réellement, et où reste la responsabilité | |
| 7 à 11 | S03 | Chat, complétions et mode agent comparés | |
| 11 à 15 | S04 | Six idées reçues | La section 1 finit à 15 |
| 15 à 18 | S05 | Projet d'exercice préparé à l'écran, référence verte montrée | |
| 18 à 22 | S06 | Joindre deux fichiers, poser une seule question délimitée | |
| 22 à 28 | S07 | **Activité A** : expliquer, compléter une assertion, écrire et comparer une question | |
| 28 à 30 | S08 | Inspecter ce que l'activité A a produit | La section 2 finit à 30 |
| 30 à 34 | S09 | Suivre une demande dans l'ordre de validation fixe | |
| 34 à 39 | S10 | Échec introduit lu à voix haute, puis remaniement de la garde démontré | |
| 39 à 51 | S11 | **Activité B** : prédire, diagnostiquer, corriger, remanier, vérifier le résumé | |
| 51 à 55 | S12 | Résumé des modifications généré, puis confronté au diff | La section 3 finit à 55 |
| 55 à 59 | S13 | La grille en quatre parties | |
| 59 à 62 | S14 | Demande vague contre demande précise sur les mêmes fichiers | |
| 62 à 68 | S15 | **Activité C** : rédiger une invite de proposition uniquement, puis évaluer celle d'un binôme | |
| 68 à 70 | S16 | Corriger la mesure ambiguë, et dire pourquoi | La section 4 finit à 70 |
| 70 à 73 | S17 | Plans de la surface ask et de la surface agent, côte à côte | |
| 73 à 76 | S18 | Lire le plan, décider de l'approbation | |
| 76 à 81 | S19 | **Activité D** : appliquer le plan relu à exactement trois fichiers | |
| 81 à 85 | S20 | **Démonstration de relecture** : inspecter le diff, lire les résultats réels, décider | La section 5 finit à 85 |
| 85 à 87 | S21 | Récapitulatif, puis billet de sortie | |
| 87 à 90 | S22 | Ressources, puis questions | La séance finit à 90 |

La section 6 dispose exactement de 5 minutes. Il n'y a aucune marge de conclusion, le seul mécanisme de reprise est donc l'ordre des coupes ci-dessous. Commencez la conclusion au plus tard à la minute 85.

## Ordre des coupes

Appliquez ces coupes dans l'ordre. Prenez d'abord l'élément 1, et ne passez à l'élément 2 que si la séance est encore en retard.

1. Supprimer l'évaluation en binôme de l'activité C, minutes 66 à 68. Conserver la rédaction.
2. Écourter la démonstration de remaniement de l'activité B, minutes 49 à 51. Le remaniement reste démontré en S10, le sujet survit donc.
3. Supprimer la comparaison de plans en S17, minutes 70 à 73. Passer directement à l'examen du plan en S18.
4. Supprimer les idées reçues cinq et six en S04.
5. Réduire l'activité D à sa moitié relecture. Sauter l'exécution de l'agent en direct et examiner le diff enregistré à la place.

### Jamais supprimé

La démonstration de relecture en S20, minutes 81 à 85, n'est **jamais** supprimée, quel que soit le dépassement. C'est le seul endroit de la séance où la relecture responsable d'une production générée est démontrée face à des résultats réels, et c'est l'unique élément de preuve de l'objectif O5. Si la séance est en retard au point de mettre S20 en péril, appliquez d'abord les coupes 1 à 5, et si cela ne suffit toujours pas, terminez la section 5 plus tôt et écourtez le billet de sortie plutôt que la relecture.

## Acceptation à deux contrôles

L'acceptation ne dépend jamais de ce que le modèle produit ce jour-là. Chaque activité comporte un contrôle mécanique que n'importe quel observateur peut vérifier, et un contrôle de jugement que l'animateur apprécie.

| Activité | Minutes | Contrôle mécanique, vérifiable objectivement | Contrôle de jugement, appréciation de l'animateur |
| --- | --- | --- | --- |
| A. Expliquer et compléter | 22 à 28 | L'assertion complétée compile et l'exécution ciblée des tests est verte | Le participant énonce, avec ses propres mots, ce que garantit le type de résultat |
| B. Corriger et vérifier | 39 à 51 | Les cas précédemment en échec passent, le nombre de cas de référence est inchangé, et aucune assertion existante n'a été affaiblie ni supprimée | Le participant nomme le symptôme qui a désigné le défaut de suppression des espaces |
| C. Préciser la limite du titre | 62 à 68 | L'invite contient l'objectif, le contexte, les contraintes et les tests d'acceptation | Un binôme peut reformuler le comportement attendu à partir de la seule invite |
| D. Implémenter la limite du titre | 76 à 81 | Le diff ne touche que les trois fichiers autorisés, tous les cas de référence passent encore, et les nouveaux cas limites utilisent des nombres littéraux plutôt que la nouvelle constante | Le participant identifie au moins une chose à modifier dans le diff généré |
| Démonstration de relecture | 81 à 85 | Une décision est énoncée à voix haute, accepter, refuser ou réviser, après une inspection fichier par fichier | La salle sait nommer les éléments de preuve sur lesquels la décision s'est appuyée |
| Billet de sortie | 85 à 87 | Le formulaire consigne une tâche délimitée et une étape de vérification | L'animateur juge que la tâche est réalisable en une seule journée |

L'activité B échoue si la suite est rendue verte en relâchant une assertion, même si le décompte semble alors correct. Dites-le avant que la salle ne commence. Le contrôle mécanique est rédigé précisément pour attraper ce cas.

L'activité D dépend des deux clauses déterminantes de l'invite approuvée : chaque test existant est conservé, et les bornes attendues sont écrites sous forme de nombres littéraux plutôt qu'en référence à la nouvelle constante. Retirer l'une ou l'autre fait qu'une exécution verte ne prouve plus rien, car une suite qui déduit ses attentes de la constante passe pour n'importe quelle valeur de limite.

## Couverture des objectifs

Chaque objectif correspond à au moins une activité programmée, et chaque activité programmée correspond à au moins un objectif.

### De l'objectif vers l'activité

| Objectif | Activités programmées qui le démontrent |
| --- | --- |
| O1. Comprendre les capacités fondamentales | S01, S02, S04, S09, S21 |
| O2. Distinguer chat, complétions et agent | S01, S03, S06, S07, S17, S19, S21 |
| O3. Appliquer la rédaction d'invites | S01, S06, S13, S14, S15, S16, S18, S21 |
| O4. Soutenir les activités de développement courantes | S01, S07, S09, S10, S11, S12, S19 |
| O5. Relire les productions de façon responsable | S01, S04, S08, S10, S11, S12, S14, S16, S18, S20, S21 |
| O6. Commencer avec assurance le travail assisté par IA | S01, S05, S21, S22 |

### De l'activité vers l'objectif

| Diapositive | Minutes | Objectifs servis |
| --- | --- | --- |
| S01 | 0 à 3 | O1, O2, O3, O4, O5, O6 |
| S02 | 3 à 7 | O1 |
| S03 | 7 à 11 | O2 |
| S04 | 11 à 15 | O1, O5 |
| S05 | 15 à 18 | O6 |
| S06 | 18 à 22 | O2, O3 |
| S07 | 22 à 28 | O2, O4 |
| S08 | 28 à 30 | O5 |
| S09 | 30 à 34 | O1, O4 |
| S10 | 34 à 39 | O4, O5 |
| S11 | 39 à 51 | O4, O5 |
| S12 | 51 à 55 | O4, O5 |
| S13 | 55 à 59 | O3 |
| S14 | 59 à 62 | O3, O5 |
| S15 | 62 à 68 | O3 |
| S16 | 68 à 70 | O3, O5 |
| S17 | 70 à 73 | O2 |
| S18 | 73 à 76 | O3, O5 |
| S19 | 76 à 81 | O2, O4 |
| S20 | 81 à 85 | O5 |
| S21 | 85 à 87 | O1, O2, O3, O5, O6 |
| S22 | 87 à 90 | O6 |

Aucun objectif n'est sans correspondance et aucune activité n'est sans correspondance.

## Repli A : Copilot est indisponible

Déclencheur : la connexion échoue, le service est injoignable, ou aucune réponse n'est produite dans la fenêtre de la diapositive. Décidez en moins de 60 secondes et basculez. Ne passez pas une fenêtre d'activité à dépanner.

La séance se déroule toujours sur ses 90 minutes complètes. L'activité C et les moitiés sur papier des activités A et D ne nécessitent aucun outil.

Ressources dont ce repli a besoin, toutes accessibles hors connexion depuis la machine de présentation :

| Ressource | Utilisée à |
| --- | --- |
| `docs/assets/images/v01-completion-and-accepted-diff.png` | S07, S08, à la place de la complétion en direct |
| `docs/assets/images/v02-chat-context-attachment.png` | S06, S14, à la place de la pièce jointe en direct |
| `docs/assets/images/v03-fixture-before-and-after.png` | S19, à la place de l'exécution de l'agent en direct |
| `docs/assets/images/v04-failing-test-diff-passing-test.png` | S10, S11, S12, à la place de la correction en direct |
| `docs/assets/images/v05-mode-comparison.png` | S17, à la place de la comparaison de plans en direct |
| `docs/assets/images/v06-plan-and-approval.png` | S18, à la place du plan en direct |
| `docs/assets/images/v07-checkpoint-boundary.png` | S20, aux côtés du diff enregistré |
| Sortie de terminal enregistrée pour les états de référence, introduit, avant fonctionnalité et implémenté | S05, S08, S10, S11, S19, S20 |
| L'arborescence de travail du projet d'exercice sous `workshop/fixture/`, déjà installée | Toutes les sections, pour que les fichiers restent lisibles et commentables |

Substitution par activité :

* Activité A. Projeter la complétion enregistrée, puis mener la moitié sur papier sans changement. Le contrôle de jugement n'est pas affecté.
* Activité B. L'animateur applique la correction d'une ligne à la main et la salle réalise la prédiction et la relecture du diff. Le contrôle mécanique devient l'exécution faite à la main plutôt qu'une exécution générée.
* Activité C. Se déroule sans changement. Elle se rédige et s'évalue sur papier.
* Activité D. Examiner le diff enregistré ainsi que les sorties enregistrées avant et après. La démonstration de relecture en S20 se déroule intégralement.

## Repli B : une démonstration en direct échoue

Déclencheur : l'outil a répondu, mais le résultat est inexploitable, l'exécution renvoie une erreur, ou le projet d'exercice est dans un état inattendu.

1. Dites à voix haute ce qui a mal tourné. Un échec visible est un matériel pédagogique utile et ne doit pas être caché.
2. Réinitialisez le projet d'exercice avec `node scripts/reset.mjs` depuis son répertoire. La reprise est une réinitialisation, pas une dispute avec l'outil.
3. Si la réinitialisation ne rétablit pas un état exploitable dans la fenêtre restante, basculez sur les ressources enregistrées de cette diapositive et poursuivez.
4. Ne relancez pas plus d'une fois une génération en échec à l'intérieur d'une fenêtre d'activité.

Ressources dont ce repli a besoin :

| Ressource | Rôle |
| --- | --- |
| `workshop/fixture/scripts/reset.mjs` | Restaure les trois fichiers d'exercice depuis la copie d'origine |
| `workshop/fixture/.pristine/lib/scenario-engine/` | La copie d'origine à partir de laquelle la réinitialisation restaure |
| `workshop/fixture/scripts/self-check.mjs` | Confirme en une ligne que l'environnement est de nouveau exploitable |
| `workshop/fixture/VERIFICATION.md` | Le relevé observé, pour citer le comportement attendu sans exécution en direct |
| La sortie de terminal enregistrée et les images listées sous le repli A | Substituts de la démonstration qui a échoué |

Les captures approuvées sont réalisées dans une phase ultérieure de ce projet. Tant qu'elles n'existent pas, les replis A et B reposent sur la sortie de terminal enregistrée et sur `VERIFICATION.md`, et un animateur doit vérifier que chaque ressource de ces deux tableaux est présente avant la séance plutôt que d'en découvrir l'absence pendant.

## Signaler une production enregistrée

Toute production enregistrée montrée pendant la séance doit être **annoncée à voix haute** et **signalée à l'écran comme enregistrée plutôt qu'en direct**, à chaque fois qu'elle est montrée. Une image fixe ou une transcription de terminal présentée sans cette mention donne une fausse idée d'une démonstration qui n'a pas eu lieu.

Cela vaut pour les captures d'écran, les sorties de terminal enregistrées, les diffs enregistrés et toute vidéo préenregistrée. Cela vaut aussi bien lorsque l'enregistrement sert d'appui prévu que lorsqu'il sert de repli.

## Décomptes de vérification

Chaque décompte cité dans cet atelier a été observé sur une seule machine préparée, à une seule date, et consigné comme une observation.

| Point de la séquence | Observé |
| --- | --- |
| Référence | 24 cas, 24 réussites, code de sortie 0 |
| Anomalie de suppression des espaces introduite | 24 cas, 19 réussites, 5 échecs, code de sortie 1 |
| Après réinitialisation | 24 cas, 24 réussites, code de sortie 0 |
| Tests de la fonctionnalité ajoutés, règle non implémentée | 27 cas, 26 réussites, 1 échec, code de sortie 1 |
| Fonctionnalité implémentée | 27 cas, 27 réussites, code de sortie 0 |

Ces nombres sont **observés, non garantis**. Une exécution qui annonce un décompte différent n'a pas échoué, et aucun contrôle d'acceptation de ce guide ne dépend de la correspondance d'un nombre. Chaque décompte dépend aussi de la configuration de tests du projet d'exercice lui-même, une arborescence configurée autrement peut donc légitimement les doubler ou les modifier.

Jugez l'acceptation sur les conditions de comportement du tableau à deux contrôles : la référence est verte, l'anomalie introduite produit des échecs imputables à la suppression des espaces perdue, les tests de la fonctionnalité échouent avant l'implémentation et passent après, le nombre de cas de référence est inchangé d'un état à l'autre, et aucune assertion de référence n'a été affaiblie.

## Préparation avant la séance

* Éditeur connecté avec Copilot vérifié sur la machine de présentation.
* Projet d'exercice installé, une exécution verte des tests de référence observée, script de réinitialisation exercé une fois.
* Chaque ressource des tableaux des replis A et B présente et accessible hors connexion.
* Profil de capture propre : aucun chemin client, nom d'organisation, identifiant de compte, nom de branche, onglet sans rapport ni historique de conversation à l'écran.
* Formulaire de billet de sortie ouvert et prêt.
* Un chronomètre visible par l'animateur, réglé sur les arrêts impératifs des minutes 15, 30, 55, 70, 85 et 90.
