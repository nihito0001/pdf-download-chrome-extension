const API_ENDPOINT =
  'https://q2qbomtdwphs4ocuqmx2abrrge0lgqht.lambda-url.ap-northeast-1.on.aws';

export const getPresignedUrl = async (key) => {
  const url = `${API_ENDPOINT}/?key=${key}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.putUrl;
};

export const uploadPDF = async (url, blob) => {
  const response = await fetch(url, {
    method: 'PUT',
    body: blob,
    headers: {
      'Content-Type': 'application/pdf',
    },
  });
  return response;
};

export const generateKey = () => {
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0];
  const uuid = crypto.randomUUID();
  return `file-uploads/${dateStr}/${uuid}.pdf`;
};
