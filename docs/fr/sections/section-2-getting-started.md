---
title: "Section 2 : Prise en main de GitHub Copilot"
nav_order: 104
lang: fr
---

# Section 2 : Prise en main de GitHub Copilot

Minutes 15 à 30. Quatre diapositives et l'activité A. Cette section enseigne l'usage, pas l'installation. Aucune installation, connexion ni configuration initiale n'a lieu devant la salle.

* Page anglaise correspondante : [{{ '/sections/section-2-getting-started.html' | relative_url }}]({{ '/sections/section-2-getting-started.html' | relative_url }})

## Objectifs servis

* O2. Distinguer Copilot Chat, les complétions de code et le mode agent
* O3. Appliquer les techniques de base de rédaction d'invites
* O4. Utiliser Copilot pour soutenir les activités de développement courantes
* O5. Évaluer et relire de façon responsable les productions générées par l'IA
* O6. Commencer avec assurance à intégrer le développement assisté par IA dans leur travail quotidien

## Déroulé

| Diapositive | Minutes | Activité |
| --- | --- | --- |
| S05. Prêts à travailler | 15 à 18 | Montrer le projet préparé et l'exécution verte des tests de référence |
| S06. Fournir le bon contexte | 18 à 22 | Joindre deux fichiers, puis poser une seule question délimitée |
| S07. Activité A : expliquer et compléter | 22 à 28 | Expliquer, compléter une assertion, puis écrire et comparer une question |
| S08. Inspecter avant d'accepter | 28 à 30 | Inspecter ce que l'activité A a produit |

## Le projet d'exercice à l'écran

Trois fichiers sous `lib/scenario-engine/` :

* `{{ site.data.strings.invariant.files.types }}` porte les énumérations, la forme de la demande et le type de résultat.
* `{{ site.data.strings.invariant.files.implementation }}` porte `{{ site.data.strings.invariant.function_name }}`.
* `{{ site.data.strings.invariant.files.test }}` porte la suite de tests.

Le contrat que la salle doit connaître avant l'activité A :

* Le validateur accepte une entrée inconnue et renvoie une union succès ou erreur. Affinez le type sur le discriminant avant d'aller plus loin.
* Le texte libre est débarrassé de ses espaces de début et de fin.
* L'appartenance à une énumération est exacte et sensible à la casse, et la valeur n'est pas débarrassée de ses espaces avant la comparaison.
* Les champs facultatifs omis restent undefined. Le validateur ne substitue jamais de valeur par défaut.

C'est ce dernier point qui est le plus souvent mal énoncé. Si une explication générée affirme que le validateur renseigne un niveau de détail ou une longueur de sortie par défaut, refusez-la devant la salle.

## Activité A : expliquer et compléter

Minutes 22 à 28.

1. Minute 1. Demandez au chat d'expliquer `{{ site.data.strings.invariant.function_name }}`, sans aucune modification.
2. Minutes 2 à 4. Acceptez une complétion en ligne pour une assertion de titre normalisé, puis relisez-la à voix haute.
3. Minutes 5 à 6. Sur papier, écrivez l'unique question que vous poseriez sur le type de résultat, puis comparez-la avec celle de votre voisin.

Invite à utiliser :

```text
Explique ce que renvoie {{ site.data.strings.invariant.function_name }} et ce que
garantit un résultat de succès. Ne modifie aucun fichier.
```

### Acceptation

* Contrôle mécanique : l'assertion complétée compile et l'exécution ciblée des tests est verte.
* Contrôle de jugement : le participant énonce, avec ses propres mots, ce que garantit le type de résultat.

### Solution de repli

Si Copilot est indisponible, projetez la capture de complétion préparée, annoncez à voix haute qu'elle est enregistrée et non en direct, puis menez la partie sur papier sans changement.

## Référence observée

Sur la machine préparée, l'exécution ciblée de référence a annoncé 24 cas, 24 réussites, code de sortie 0.

Ce nombre est une observation, faite sur une machine à une date donnée, et il dépend de la configuration de tests du projet d'exercice. Ce n'est pas une garantie. Un participant ou un animateur qui voit un décompte différent n'a pas raté l'activité.

## Suite

Continuez vers la [section 3]({{ '/fr/sections/section-3-everyday-use-cases.html' | relative_url }}).
