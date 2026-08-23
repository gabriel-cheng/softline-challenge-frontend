export function extractErrorMessage(err, fallback = "Something went wrong. Please try again.") {
  return err.response?.data?.message ?? fallback;
}