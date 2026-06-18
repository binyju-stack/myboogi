import type { BreedingEgg, EggStatus } from '@/types/breeding';

export type EggStatusSummary = Record<EggStatus, number> & { total: number };

export function getEggStatusSummary(eggs: BreedingEgg[]): EggStatusSummary {
  return eggs.reduce<EggStatusSummary>(
    (summary, egg) => {
      summary.total += 1;
      summary[egg.status] += 1;
      return summary;
    },
    {
      total: 0,
      unknown: 0,
      developing: 0,
      infertile: 0,
      stopped: 0,
      hatched: 0,
      discarded: 0,
    },
  );
}
