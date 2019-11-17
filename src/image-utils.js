import browserImageSize from "browser-image-size";
import Pica from "pica";

const pica = new Pica();

const drawImage = (url, canvas) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      canvas.getContext("2d").drawImage(image, 0, 0);
      resolve();
    };
    image.onerror = reject;
    image.src = url;
  });
};

export const resizeImage = async (file, width, height) => {
  const dimensions = await browserImageSize(file);
  const context = document.createElement("canvas");
  context.width = dimensions.width;
  context.height = dimensions.height;

  const destination = document.createElement("canvas");
  destination.width = width;
  destination.height = (dimensions.height * width) / dimensions.width;

  const url = URL.createObjectURL(file);
  await drawImage(url, context);
  const result = await pica.resize(context, destination);
  const blob = window.URL.createObjectURL(
    await pica.toBlob(result, "image/jpeg", 0.9).then()
  );
  // return destination.toDataURL("image/jpeg");
  return blob;
};

export const getBase64 = (file, reader = new FileReader()) => {
  return new Promise((resolve, reject) => {
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = error => reject(error);
  });
};
