/**
 *  1. Get data from 'https://my-json-server.typicode.Som/emrejen/generic-apis/superheros'
 *  2. Sum the heros score from new york only
 */

describe('Superheros score testing suite', () => {
    it('Should show the correct score of the heros from new york', () => {
        expect(getSuperherosScoreFrom('New York')).toEqual(378);
    });
});