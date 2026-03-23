# i18n Translation Refactor

Extract the translations currently housed in `constants.ts` into individual files within an `i18n` directory to improve maintainability and make future adjustments easier, without breaking existing code.

## Proposed Changes

### i18n Directory and Files
We will create a new directory called `i18n` and create individual files for each language, extracting the content currently hardcoded in `DICTIONARY` inside `constants.ts`.

- `i18n/pt.ts`: Export the Portuguese translations object.
- `i18n/en.ts`: Export the English translations object.
- `i18n/fr.ts`: Export the French translations object.
- `i18n/zh.ts`: Export the Chinese (Mandarin) translations object.
- `i18n/ar.ts`: Export the Arabic translations object.

Each file will import the `Translations` type from `../types` and export its respective language object.

### constants.ts
- Modify `constants.ts` to import the individual language objects from the `i18n` directory.
- Reconstruct the `DICTIONARY` constant using these imported objects so that the rest of the application (like `LanguageContext.tsx`) continues functioning exactly as before without needing any further changes.

## Verification Plan

### Automated Tests
- Run `npm run build` or rely on the running `npm run dev` to ensure no TypeScript compilation errors occur.

### Manual Verification
- Check the running application in the browser.
- Verify that the language switcher still works.
- Verify that text across different languages correctly loads on the page.
