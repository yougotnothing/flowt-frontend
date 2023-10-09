export const getCroppedImg = async (imageSrc: any, pixelCrop: any) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx: any = canvas.getContext("2d");

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      const timestamp = Date.now();
      let extension = "";
      if(imageSrc.name) {
        extension = imageSrc.name.split('.').pop() || "";
      }else if(imageSrc.type) {
        extension = imageSrc.type.split('/').pop() || "";
      }

      if(!extension) {
        extension = "jpg";
      }

      canvas.toBlob(
        (blob) => {
          if(!blob) {
            console.error("Canvas is empty");
            return;
          }

          const fileName = `image_${timestamp}.${extension}`;
          const file = new File([blob], fileName, { type: blob.type });
          resolve(file);
          console.log(file);
        },
        imageSrc.type || "image/jpeg",
        1
      );
    };

    image.src = imageSrc;
  });
};