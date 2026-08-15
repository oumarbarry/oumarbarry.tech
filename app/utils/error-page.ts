export interface ErrorPageContent {
  message: string
  canRetry: boolean
}

export function getErrorPageContent(statusCode: number): ErrorPageContent {
  if (statusCode === 404) {
    return { message: "looks like this page took a wrong turn.", canRetry: false }
  }

  if (statusCode === 500) {
    return {
      message: "something broke on my side. try again in a bit.",
      canRetry: true,
    }
  }

  return { message: "something went wrong.", canRetry: false }
}
