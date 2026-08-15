import { describe, expect, test } from "bun:test"

import { getErrorPageContent } from "../app/utils/error-page"

describe("getErrorPageContent", () => {
  const cases = [
    {
      statusCode: 404,
      expected: { message: "looks like this page took a wrong turn.", canRetry: false },
    },
    {
      statusCode: 500,
      expected: {
        message: "something broke on my side. try again in a bit.",
        canRetry: true,
      },
    },
    {
      statusCode: 418,
      expected: { message: "something went wrong.", canRetry: false },
    },
  ] as const

  for (const { statusCode, expected } of cases) {
    test(`returns safe content for ${statusCode}`, () => {
      expect(getErrorPageContent(statusCode)).toEqual(expected)
    })
  }
})
