# AdSense Integration Plan - FlexiAura

This plan details the steps to integrate real Google AdSense ads into the FlexiAura project, replacing existing mockups and adding new locations.

## Technical Strategy

1. **Verify Base Script**: `index.html` already contains an AdSense script (`ca-pub-7780547974394874`). I will verify if this is the correct ID or if a placeholder should be used.
2. **Reusable Component**: Create `components/common/AdSenseSlot.tsx` to handle the `(adsbygoogle = window.adsbygoogle || []).push({})` logic properly within the React lifecycle to prevent errors during navigation.
3. **Placements**:
   - Replace current mockup in `components/AdSection.tsx`.
   - Add a new slot between `Hero` and `Services`.
   - Add a slot before the `Footer`.

## File Changes

### 1. New Component: `components/common/AdSenseSlot.tsx`
- Encapsulates `<ins class="adsbygoogle" ...>`
- Uses `useEffect` for initialization.

### 2. Update `App.tsx`
- Inject `AdSenseSlot` in strategic locations.

### 3. Revision
- Audit `index.html` for any mobile responsiveness issues related to ads.

## Verification
- Check console for `adsbygoogle` errors.
- Ensure ad containers don't break layout on mobile.
