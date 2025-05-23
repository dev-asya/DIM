/**
 * Return a set of compile time feature flags. These values will be inlined into
 * the code at build time, based on the version of the app being built. This
 * will then allow Webpack/Terser to fully remove code if the feature flag is
 * off. We build features behind these feature flags so we can easily remove
 * them from the app, or keep them in beta/dev for a longer time without
 * releasing to app.
 */
export function makeFeatureFlags(env: {
  release: boolean;
  beta: boolean;
  dev: boolean;
  pr: boolean;
}) {
  return {
    // Print debug info to console about item moves
    debugMoves: !env.release,
    // Debug Service Worker
    debugSW: !env.release,
    // Send exception reports to Sentry.io on beta/prod only
    sentry: !env.dev && !env.pr,
    // Community-curated wish lists
    wishLists: true,
    // Show a banner for supporting a charitable cause
    issueBanner: false,
    // Show the triage tab in the item popup
    triage: true,
    // Advanced Write Actions (inserting mods)
    awa: process.env.USER === 'brh', // Only Ben has the keys...
    // Item feed sidebar
    itemFeed: true,
    // Clarity perk descriptions
    clarityDescriptions: true,
    // Elgato Stream Deck integration
    elgatoStreamDeck: true,
    // Warn when DIM Sync is off and you save some DIM-specific data
    warnNoSync: true,
    // Expose the "Automatically add stat mods" Loadout Optimizer toggle
    loAutoStatMods: true,
    // Pretend that Bungie.net is down for maintenance
    simulateBungieMaintenance: false,
    // Pretend that Bungie.net is not returning sockets info
    simulateMissingSockets: false,
    // Request the PresentationNodes component only needed during
    // Solstice to associate each character with a set of triumphs.
    // Solstice 2022 had a set of challenges for each character,
    // while Solstice 2023 had shared progress/challenges, so maybe
    // this won't be needed going forward?
    solsticePresentationNodes: false,
    // not ready to turn these on but the code is there
    customStatWeights: false,
    // On the Loadouts page, run Loadout Optimizer to find better tiers for loadouts.
    runLoInBackground: true,
    // Whether to allow setting in-game loadout identifiers on DIM loadouts.
    editInGameLoadoutIdentifiers: false,
    // Whether to sync DIM API data instead of loading everything
    dimApiSync: true,
  };
}

export type FeatureFlags = ReturnType<typeof makeFeatureFlags>;
