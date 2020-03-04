export function getResultByResponseMessage(message, resultKey) {
  try {
    if (!message) return undefined;
    const jsonObject = JSON.parse(message);
    if(jsonObject && resultKey && jsonObject[resultKey]) {
        return jsonObject[resultKey];
    }
    return undefined;
  } catch (error) {
    console.error(error);
  }
}
