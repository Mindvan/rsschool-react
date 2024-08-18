export const imageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('file conversion failed.'));
      }
    };
    reader.onerror = () => {
      reject(new Error('file reading error'));
    };
    reader.readAsDataURL(file);
  });
};
