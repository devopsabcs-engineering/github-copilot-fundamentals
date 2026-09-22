---
title: Ressources
nav_order: 109
lang: fr
---

# Ressources

Références pour les participants après la séance, et repères pour les animateurs qui en préparent une.

* Page anglaise correspondante : [{{ '/resources.html' | relative_url }}]({{ '/resources.html' | relative_url }})

## Documentation officielle

* Documentation de GitHub Copilot : <https://docs.github.com/copilot>
* Prise en main de Copilot Chat : <https://docs.github.com/copilot/using-github-copilot/copilot-chat>
* Conseils de rédaction d'invites pour Copilot : <https://docs.github.com/copilot/using-github-copilot/prompt-engineering-for-github-copilot>
* Formules, droits d'accès et disponibilité des fonctionnalités : <https://docs.github.com/copilot/about-github-copilot/subscription-plans-for-github-copilot>
* Exclusion de contenu Copilot et ses limites : <https://docs.github.com/copilot/managing-copilot/configuring-and-auditing-content-exclusion>

L'exclusion de contenu n'est pas prise en charge par tous les flux, y compris certains flux d'agent et d'édition. Ne la considérez pas comme le contrôle qui rendrait un dépôt quelconque sûr à utiliser comme contexte Copilot. Les droits d'accès et le traitement des données sont des décisions organisationnelles ayant un responsable nommé.

## Pages de l'atelier

* [Accueil]({{ '/fr/' | relative_url }})
* [Prérequis]({{ '/fr/prerequisites.html' | relative_url }})
* [Guide de l'animateur]({{ '/fr/facilitator-runbook.html' | relative_url }})
* [Section 1 : Introduction à GitHub Copilot]({{ '/fr/sections/section-1-introduction.html' | relative_url }})
* [Section 2 : Prise en main de GitHub Copilot]({{ '/fr/sections/section-2-getting-started.html' | relative_url }})
* [Section 3 : Cas d'usage quotidiens du développeur]({{ '/fr/sections/section-3-everyday-use-cases.html' | relative_url }})
* [Section 4 : Les fondamentaux de l'invite]({{ '/fr/sections/section-4-prompting.html' | relative_url }})
* [Section 5 : Introduction au mode agent]({{ '/fr/sections/section-5-agent-mode.html' | relative_url }})
* [Section 6 : Conclusion et questions]({{ '/fr/sections/section-6-wrap-up.html' | relative_url }})

## Le projet d'exercice

Le projet d'exercice se trouve dans le dépôt sous `workshop/fixture/`. C'est un matériel pédagogique rédigé à l'origine pour cet atelier, avec deux dépendances, aucun accès réseau, aucune interface et aucune intégration de fournisseur.

Fichiers qu'un participant lirait :

| Fichier | Contenu |
| --- | --- |
| `lib/scenario-engine/{{ site.data.strings.invariant.files.types }}` | Les énumérations, la forme de la demande et le type de résultat discriminé |
| `lib/scenario-engine/{{ site.data.strings.invariant.files.implementation }}` | `{{ site.data.strings.invariant.function_name }}` et son ordre de validation fixe |
| `lib/scenario-engine/{{ site.data.strings.invariant.files.test }}` | La suite de tests |
| `scripts/self-check.mjs` | Affiche une seule ligne de réussite ou d'échec |
| `scripts/reset.mjs` | Restaure les trois fichiers d'exercice depuis une copie d'origine |
| `VERIFICATION.md` | Le relevé de comportement observé, où chaque décompte est étiqueté comme observé |

Commandes, exécutées depuis le répertoire du projet d'exercice :

```powershell
npm ci
npm test -- lib/scenario-engine/validateGenerateRequest.test.ts
npm run typecheck
node scripts/self-check.mjs
node scripts/reset.mjs
```

Une exécution de tests réussie n'établit pas la correction des types, et c'est pourquoi la vérification de types est une commande distincte.

## Littéraux logiciels invariants

Ce sont des valeurs de contrat de code. Elles sont identiques octet pour octet dans chaque édition linguistique de cet atelier, et ne sont jamais traduites, ni recasées, ni respacées, ni reponctuées.

| Élément | Valeur |
| --- | --- |
| Nom de la constante | `{{ site.data.strings.invariant.constant_name }}` |
| Valeur de la constante | `{{ site.data.strings.invariant.constant_value }}` |
| Message d'erreur | `{{ site.data.strings.invariant.error_message }}` |
| Nom de la fonction | `{{ site.data.strings.invariant.function_name }}` |

Le message d'erreur ne porte aucun point final.

## Prochaines étapes d'apprentissage

* Refaites l'activité C sur une règle de votre propre base de code : écrivez l'objectif, le contexte, les contraintes et les tests d'acceptation avant d'ouvrir une invite.
* Refaites la moitié relecture de l'activité D sur n'importe quelle modification générée : lisez le diff fichier par fichier, exécutez les tests, puis acceptez, refusez ou révisez.
* Gardez l'habitude du périmètre. Nommez les fichiers qu'une modification a le droit de toucher avant de demander cette modification.

## Téléchargement des diaporamas

Les diaporamas générés sont produits dans une phase ultérieure de ce projet et seront liés depuis le fichier README du dépôt dès leur livraison. Il n'y a pas encore de lien de diaporama sur cette page, car le fichier n'existe pas.
