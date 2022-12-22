export default function setServerMessageObject(message) {
  return {
    active: true,
    error: true,
    message,
  };
}
