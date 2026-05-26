import type { PageFilter } from "@/scripts/utils/Filter";
import { defineStore } from "pinia";

export const useFilterStore = defineStore("filter", {
    state: () => ({
        loading: false,
        filters: {
            page: 1,
            size: 10
        } as PageFilter
    }),
    actions: {
        setFilter(filter: PageFilter): void {
            this.filters = { ...this.filters, ...filter };
        }
    }
});