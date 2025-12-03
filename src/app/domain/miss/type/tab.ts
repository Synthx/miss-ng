export const TABS = ['vote', 'ranking'] as const;
export type Tab = (typeof TABS)[number];
