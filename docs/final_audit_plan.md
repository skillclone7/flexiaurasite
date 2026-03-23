# Final Audit and Fixes Plan

The objective is to finalize the site by cleaning up the footer, updating social media branding, and ensuring the phone number is correctly formatted and responsive.

## Proposed Changes

### [Component] [Footer.tsx](file:///e:/Downloads/em/desenvolvimento/flexiaurasite-main/components/Footer.tsx)
- Reduce platform list iteration from 6 to 3 to avoid empty entries.
- Change `twitter` font-awesome icon to `x-twitter`.

### [Component] [Contact.tsx](file:///e:/Downloads/em/desenvolvimento/flexiaurasite-main/components/Contact.tsx)
- Update raw phone number with `+244` prefix.
- Implement clickable `tel:` and `mailto:` links for improved mobile UX.
- Ensure the phone number uses `whitespace-nowrap` to prevent awkward wrapping on small screens.

### [Translations] [i18n/*.ts](file:///e:/Downloads/em/desenvolvimento/flexiaurasite-main/i18n/)
- Update `contactInfo` in all 5 languages (`pt.ts`, `en.ts`, `fr.ts`, `zh.ts`, `ar.ts`) to include the `+244` prefix in the descriptive text.

## Verification Plan

### Manual Verification
- Verify footer links and icons in the browser.
- Check phone number display on different screen sizes using browser dev tools.
- Test the phone number's clickability on a mobile simulator.
