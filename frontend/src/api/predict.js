export async function predictImage(file) {
  const form = new FormData();
  form.append('image', file);
  const resp = await fetch('/predict', { method: 'POST', body: form });
  if (!resp.ok) throw new Error('HTTP ' + resp.status);
  const data = await resp.json();
  if (data.error) throw new Error(data.error);
  return data;
}
