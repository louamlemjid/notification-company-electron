import React, { useState } from 'react';

const BackgroundRemover = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [outputImage, setOutputImage] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setOriginalImage(URL.createObjectURL(event.target.files[0]));
  };

  const removeBackground = async () => {
    if (!selectedFile) {
      alert('Please select an image file first.');
      return;
    }

    const formData = new FormData();
    formData.append('image_file', selectedFile);
    formData.append('size', 'auto');

    const apiKey = 'xzWqFM4E6uSNSrVVZBtuji4W';

    try {
      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imageDataURL = canvas.toDataURL('image/png');
        console.log(imageDataURL)
        window.electron.ipcRenderer.send('save-image',imageDataURL);
      };
      window.electron.ipcRenderer.send('save-image',url)
      setOutputImage(url);
    } catch (error) {
      alert('Failed to remove background. Please try again.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Background Remover</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} id='inputImage'/>
      <button onClick={removeBackground} >Remove Background</button>
      <br />
      {originalImage && (
        <div>
          <h2 >Original Image:</h2>
          <img src={originalImage} alt="Original" style={{ maxWidth: '300px', display: 'block' }} />
        </div>
      )}
      {outputImage && (
        <div>
          <h2>Image with Background Removed:</h2>
          <img src={outputImage} alt="Output" style={{ maxWidth: '300px', display: 'block' }} />
        </div>
      )}
    </div>
  );
};

export default BackgroundRemover;
