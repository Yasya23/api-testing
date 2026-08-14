import assert from 'node:assert/strict';

export class ApiAssert {
  static exists<T>(
    value: T | null | undefined,
    variableName: string,
  ): asserts value is NonNullable<T> {
    assert.ok(value, `Prerequisite failed: ${variableName} is missing`);
  }

  static status(
    response: Response,
    expectedStatus: number,
    message: string = '',
  ): void {
    assert.equal(
      response.status,
      expectedStatus,
      `Expected status ${expectedStatus} but got ${response.status} for ${response.url}. ${message}`,
    );
  }

  static headerContains(
    response: Response,
    headerName: string,
    expectedSubstring: string,
  ): void {
    const actual = response.headers.get(headerName);
    assert.ok(
      actual !== null && actual.includes(expectedSubstring),
      `Expected header "${headerName}" to contain "${expectedSubstring}", got "${actual}"`,
    );
  }

  static isEqual<T>(actual: T, expected: T, message: string = ''): void {
    const expectedResultMessage = `Expected ${JSON.stringify(actual)} to strictly equal ${JSON.stringify(expected)}. ${message}`;
    assert.strictEqual(actual, expected, expectedResultMessage);
  }

  static isDeepEqual<T>(actual: T, expected: T, message: string = ''): void {
    const expectedResultMessage = `Expected ${JSON.stringify(actual)} to strictly equal ${JSON.stringify(expected)}. ${message}`;
    assert.deepStrictEqual(actual, expected, expectedResultMessage);
  }
}
