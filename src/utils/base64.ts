export const toBase64 = (file: File): Promise<string> => {
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
    // const validTypes = ['image/jpeg', 'image/png'];
    // const maxSizeInBytes = 2 * 1024 * 1024;
    //
    // if (!validTypes.includes(file.type)) {
    //   reject(new Error('only png/jpeg are allowed'));
    // } else if (file.size > maxSizeInBytes) {
    //   reject(new Error('max 2mb'));
    // } else {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     if (typeof reader.result === 'string') {
    //       resolve(reader.result);
    //     } else {
    //       reject(new Error('file conversion failed.'));
    //     }
    //   };
    //   reader.onerror = () => {
    //     reject(new Error('file reading error'));
    //   };
    //   reader.readAsDataURL(file);
    // }
  });
};
