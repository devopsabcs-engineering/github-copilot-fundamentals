---
title: "Section 3 : Cas d'usage quotidiens du développeur"
nav_order: 105
lang: fr
---

# Section 3 : Cas d'usage quotidiens du développeur

Minutes 30 à 55. La section la plus longue, et celle qui porte l'explication, le débogage, les tests, un remaniement explicite et la documentation. Quatre diapositives et l'activité B.

* Page anglaise correspondante : [{{ '/sections/section-3-everyday-use-cases.html' | relative_url }}]({{ '/sections/section-3-everyday-use-cases.html' | relative_url }})

## Objectifs servis

* O1. Comprendre les capacités fondamentales de GitHub Copilot
* O4. Utiliser Copilot pour soutenir les activités de développement courantes
* O5. Évaluer et relire de façon responsable les productions générées par l'IA

## Déroulé

| Diapositive | Minutes | Activité |
| --- | --- | --- |
| S09. Suivre une demande de validation | 30 à 34 | Suivre une demande dans l'ordre de validation fixe |
| S10. De l'échec à la preuve | 34 à 39 | Lire l'échec introduit, puis démontrer le remaniement de la garde |
| S11. Activité B : corriger et vérifier | 39 à 51 | Prédire, diagnostiquer, corriger, remanier et confronter le résumé au diff |
| S12. Expliquer la modification | 51 à 55 | Générer un résumé des modifications, puis en vérifier chaque affirmation |

## L'ordre de validation

L'ordre est fixe, et chaque étape retourne dès le premier échec.

1. Le corps doit être un objet simple.
2. Chaque champ obligatoire doit être une chaîne non vide.
3. La catégorie obligatoire doit être un membre connu de l'énumération.
4. Chaque champ facultatif adossé à une énumération et fourni doit être un membre connu.
5. Le texte libre est débarrassé de ses espaces, et les champs facultatifs omis restent undefined.

L'étape 2 s'exécute avant l'étape 3. Sur la référence validée, une catégorie composée uniquement d'espaces est donc signalée comme un champ obligatoire manquant plutôt que comme une valeur d'énumération non prise en charge. Retenez ce fait, car l'activité B en dépend.

## L'anomalie introduite

La garde privée des champs de texte libre porte une anomalie introduite : un contrôle de longueur seule, qui perd la suppression des espaces. C'est une anomalie d'exercice délibérée, rédigée pour cet atelier. Ce n'est pas un défaut d'un système réel, et il faut le dire ainsi à voix haute avant que quiconque photographie l'écran.

Observé sous l'anomalie, sur la machine préparée : 24 cas, 19 réussites, 5 échecs, code de sortie 1.

Les noms des cinq cas en échec forment l'ensemble de symptômes que la salle doit apprendre.

1. rejette un titre composé uniquement d'espaces comme champ obligatoire manquant
2. rejette une catégorie composée uniquement d'espaces comme champ obligatoire manquant
3. rejette un résumé composé uniquement d'espaces comme champ obligatoire manquant
4. signale l'erreur de champ obligatoire avant l'erreur d'énumération
5. distingue une catégorie vide d'une catégorie inconnue

### Enseignez l'asymétrie avec précision

Ne dites pas que les valeurs vides passent sous l'anomalie introduite. C'est faux, et la suite de tests montre pourquoi.

* Un **titre** composé uniquement d'espaces est accepté à tort, et le titre est normalisé en chaîne vide.
* Une **catégorie** composée uniquement d'espaces n'est pas acceptée silencieusement. Elle survit au contrôle de champ obligatoire, atteint le contrôle d'énumération, et y est rejetée par l'erreur de catégorie non prise en charge portant la valeur vide, plutôt que par l'erreur de champ obligatoire.

Les deux cas sont des défaillances de la même suppression des espaces perdue, et ils se manifestent différemment. La leçon est l'ensemble de symptômes précis, et non une affirmation globale.

## Activité B : corriger et vérifier

Minutes 39 à 51.

1. Avant l'exécution, notez combien des 24 cas vous vous attendez à voir échouer.
2. Minutes 1 à 2. Reproduisez l'anomalie et lisez les noms des cinq cas en échec.
3. Minutes 3 à 6. Localisez la garde privée dans `{{ site.data.strings.invariant.files.implementation }}`.
4. Minutes 7 à 9. Rétablissez le rejet des valeurs composées uniquement d'espaces, puis relancez.
5. Minutes 10 à 12. Remaniez la garde pour la lisibilité, relancez, puis demandez un résumé des modifications et confrontez-le au diff.

Le remaniement est une étape programmée, pas un supplément facultatif. Il est aussi démontré en S10, afin qu'une activité B écourtée couvre encore le remaniement.

Invite à utiliser :

```text
Rétablis le rejet des valeurs composées uniquement d'espaces dans la garde
privée. Ne change rien d'autre. Ensuite, dans une étape distincte, renomme les
gardes privées pour la lisibilité, sans changer les prédicats, les messages
d'erreur ni l'ordre de validation.
```

### Acceptation

* Contrôle mécanique : les cas précédemment en échec passent, le nombre de cas de référence est inchangé, et aucune assertion existante n'a été affaiblie ni supprimée.
* Contrôle de jugement : le participant nomme le symptôme qui a désigné le défaut de suppression des espaces.

L'activité B échoue si la suite est rendue verte en relâchant une assertion, même si le décompte semble alors correct. Dites-le avant que la salle ne commence.

Observé après la correction, sur la machine préparée : 24 cas, 24 réussites, code de sortie 0, avec un nombre de cas inchangé par rapport à la référence.

### Solution de repli

Si Copilot est indisponible, l'animateur applique la correction d'une ligne à la main et la salle réalise la prédiction et la relecture du diff sans changement. Si l'exécution en direct échoue, utilisez les sorties enregistrées en échec puis en réussite, et annoncez à voix haute qu'elles sont enregistrées.

## Vérifier un résumé des modifications

Un résumé des modifications ne devient un élément de preuve qu'après vérification face au diff. Un résumé qui nomme un fichier que vous n'avez pas touché est faux, aussi fluide soit-il. Ici, le résumé exact ne mentionne que le module du validateur : suppression des espaces rétablie, gardes privées renommées, comportement inchangé.

Régénérez le commentaire de documentation en dernier, une fois le comportement stabilisé.

## Suite

Continuez vers la [section 4]({{ '/fr/sections/section-4-prompting.html' | relative_url }}).
