import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import { scoreboard } from '../scoreboard';

jest.mock('aws-sdk', () => {
  const mockItems = [
    { handle: 'a', score: 10 },
    { handle: 'b', score: 30 },
    { handle: 'c', score: 20 },
    { handle: 'a', score: 10 },
  ];
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => ({
        scan: jest.fn().mockReturnThis(),
        promise: jest.fn().mockResolvedValue({ Items: mockItems }),
      })),
    },
  };
});

describe('scoreboard', () => {
  it('returns sorted unique scores', async () => {
    process.env.SCORE_TABLE = 'table';
    const response = await scoreboard({} as APIGatewayProxyEventV2, {} as Context);
    const body = JSON.parse((response as any).body);
    expect(body).toEqual([
      { handle: 'b', score: 30 },
      { handle: 'c', score: 20 },
      { handle: 'a', score: 10 },
    ]);
  });
});
