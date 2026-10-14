// ============================================================================
// File Path: backend/data.js (BIDIRECTIONAL TAG MERGE)
// ============================================================================


/**
 * ============================================================================
 * Project: Square H Construction (Wix Velo)
 * File: backend/data.js
 * Description: Wix Data Hooks for 'Services' CMS Collection.
 *              Automatically rejoins comma-split multi-clause sentences 
 *              into full, intact tags on insert and update.
 * Author: Antigravity & Developer
 * Last Updated: October 2026
 * ============================================================================
 */




export function Services_beforeInsert(item, context) {
    return processServiceTags(item);
}

export function Services_beforeUpdate(item, context) {
    return processServiceTags(item);
}

function processServiceTags(item) {
    if (item.whatWeInstall && Array.isArray(item.whatWeInstall)) {
        item.whatWeInstall = mergeBrokenTags(item.whatWeInstall);
    }

    if (item.howWeDoItRight && Array.isArray(item.howWeDoItRight)) {
        item.howWeDoItRight = mergeBrokenTags(item.howWeDoItRight);
    }

    return item;
}

function mergeBrokenTags(tagsArray) {
    if (!tagsArray || tagsArray.length === 0) return [];

    const merged = [];

    for (let i = 0; i < tagsArray.length; i++) {
        let tag = tagsArray[i].trim().replace(/‚/g, ',');
        if (!tag) continue;

        if (merged.length === 0) {
            merged.push(tag);
            continue;
        }

        const prevTag = merged[merged.length - 1];

        const isLowercase = /^[a-z]/.test(tag);

        const isConnector = /^(and|or|with|such as|including|for|in|to|at|as|between|never|not|screened|without)\b/i.test(tag);

        const isPrevIncomplete = /[:,–-]$/.test(prevTag);


        const hasConnectorWord = /\b(and|or|for|with|such as|including|in|to|of)\b/i;
        const isListContinuation = !prevTag.includes(',') && (hasConnectorWord.test(tag) || hasConnectorWord.test(prevTag));

        if (isLowercase || isConnector || isPrevIncomplete || isListContinuation) {
            merged[merged.length - 1] = prevTag + ', ' + tag;
        } else {
            merged.push(tag);
        }
    }

    return merged;
}
