export default function gettingErrorAplication(error, request, response, next) {
  response.status(error.status || 500);
  return response.json({ error: error.message });
}