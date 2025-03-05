const ENDPOINT = 'https://meowing-bristle-alamosaurus.glitch.me/api/pokemon';

export const buildApiUrl = (
  path: string,
  {
    pageParam,
    chaos,
    flakiness,
    delay,
  }: {
    pageParam?: string | undefined;
    chaos: boolean;
    flakiness: number;
    delay?: number;
  },
) => {
  const url = new URL(`${ENDPOINT}/${path}`);
  if (pageParam) {
    url.searchParams.append('page', pageParam);
  }
  if (chaos) {
    url.searchParams.append('chaos', 'true');
  }
  if (flakiness > 0) {
    // flakiness is a percentage, so we need to convert it to 1/N
    const flakinessStr = (1 / (flakiness / 100)).toString();
    url.searchParams.append('flakiness', flakinessStr);
  }
  if (delay) {
    url.searchParams.append('delay', delay.toString());
  }
  return url.toString();
};
