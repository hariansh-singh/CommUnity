const fileFormat = (url = "") => {
  const fileExt = url.split(".").pop();

  if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg") {
    return "video";
  }

  if (fileExt === "mp3" || fileExt === "wav") {
    return "audio";
  }

  if (
    fileExt === "png" ||
    fileExt === "jpg" ||
    fileExt === "jpeg" ||
    fileExt === "gif"
  ) {
    return "image";
  }

  return "file";
};

const transformImage = (url = "", width = 100) => {
  const newUrl = url.replace("upload", `upload/dpr_auto/w_${width}/`);

  return newUrl;
};

export { fileFormat, transformImage };
