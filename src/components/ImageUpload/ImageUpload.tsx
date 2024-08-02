import { useState, useEffect } from "react";
//import UploadService from "../../services/FileUploadService";
import IFile from "../../types/File";
import http from "../../http-common";

const ImageUpload: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [imageInfos, setImageInfos] = useState<Array<IFile>>([]);
  const [resImg, setResImg] = useState<string>("");;

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    setCurrentImage(selectedFiles?.[0]);
    //setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
    console.log(selectedFiles?.[0])
    setProgress(0);
  };

  const upload = async (e: any) => {
    e.preventDefault();

    setMessage("Translating...");
    if (!currentImage) {
      setMessage("No currentImage");
      return;
    }
    let formData = new FormData();

    formData.append("webtoon_img", currentImage);
    formData.append("name","manhwa");

    await fetch('http://localhost:8000/api/image', {
       method: "POST",
       body: formData
    }).then((response) => response.blob())
    .then( myBlob => {
      setMessage("Image Translated")
      console.log(myBlob);
      const img = URL.createObjectURL(myBlob);
      setResImg(img); 
      console.log(img);
    }).catch((err) => { 
      setMessage("Error after making POST request")
    });

  }

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <label className="btn btn-default p-0">
            <input type="file" accept="image/*" onChange={selectImage} />
          </label>
        </div>

        <div className="col-4">
          <button
            className="btn btn-success btn-sm"
            disabled={!currentImage}
            onClick={upload}
          >
            Upload
          </button>
        </div>
      </div>

      {currentImage && progress > 0 && (
        <div className="progress my-3">
          <div
            className="progress-bar progress-bar-info"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ width: progress + "%" }}
          >
            {progress}%
          </div>
        </div>
      )}

      {previewImage && (
        <div>
          <img className="preview" src={previewImage} alt="" />
        </div>
      )}
     
      {resImg && (
        <div>
          <img className="preview" src={resImg} alt="" />
        </div>
      )}

      {message && (
        <div className="alert alert-secondary mt-3" role="alert">
          {message}
        </div>
      )}

      {imageInfos.length > 0 && (
        <div className="card mt-3">
          <div className="card-header">List of Images</div>
          <ul className="list-group list-group-flush">
            {imageInfos.map((img, index) => (
              <li className="list-group-item" key={index}>
                <p>
                  <a href={img.url}>{img.name}</a>
                </p>
                <img src={img.url} alt={img.name} height="80px" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>    
  );
};

export default ImageUpload;
