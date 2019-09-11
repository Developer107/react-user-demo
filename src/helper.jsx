/* This file contains helper methods */

export const FileRead = function (blobData, callback = null) {
  const reader = new FileReader();
  reader.readAsDataURL(blobData);
  reader.onloadend = function () {
    const base64data = reader.result;
    if (callback) { callback(base64data); }
  };
};
