export default function generateUniqueSessionId() {
  const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string
  return `${randomString}-${Date.now()}`;
}
