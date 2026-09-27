"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { FilterDef, TrekSearchItem } from "@/lib/search";

type TrekData = { items: TrekSearchItem[]; filterDefs: FilterDef[] };

const TrekItemsContext = createContext<TrekData>({ items: [], filterDefs: [] });

// Server pages fetch the published treks and the admin-managed filter registry
// once and hand them to the client-side search/filter components here.
export function TrekItemsProvider({
  items,
  filterDefs = [],
  children,
}: {
  items: TrekSearchItem[];
  filterDefs?: FilterDef[];
  children: ReactNode;
}) {
  return <TrekItemsContext.Provider value={{ items, filterDefs }}>{children}</TrekItemsContext.Provider>;
}

export function useTrekItems(): TrekSearchItem[] {
  return useContext(TrekItemsContext).items;
}

export function useFilterDefs(): FilterDef[] {
  return useContext(TrekItemsContext).filterDefs;
}
