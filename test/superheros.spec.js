/**
 *  1. Get data from 'https://my-json-server.typicode.com/emrejen/generic-apis/superheros'
 *  2. Sum the heros score from new york only
 */

describe.skip('Superheros score testing suite', () => {
  it('should show the correct score of the heros from new york', () => {
    expect(getSuperherosScoreFrom('New York')).toEqual(378);
  });
});
