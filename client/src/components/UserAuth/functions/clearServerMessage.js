export default function clearServerMessage(setCallback) {
  return setCallback({
    active: false,
    error: false,
    message: "",
  });
}
