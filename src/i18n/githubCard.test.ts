import { describe, expect, it } from 'vitest';
import en from './en.json';
import ptBr from './pt-br.json';

// The GitHub card shows a rolling last-12-months window (jogruber ?y=last),
// so it must not be labelled with the calendar year.
describe.each([['en', en], ['pt-br', ptBr]])('%s GitHub card strings', (_, locale) => {
  const home = locale.home as Record<string, unknown>;

  it('labels the period as the last 12 months', () => {
    expect(home.githubPeriod).toEqual(expect.stringMatching(/12/));
    expect(home.activitiesLast12).toEqual(expect.stringContaining('{{total}}'));
    expect(home.activitiesLast12).toEqual(expect.stringMatching(/12/));
  });

  it('drops the calendar-year phrasing', () => {
    expect(home.activitiesIn).toBeUndefined();
  });
});
