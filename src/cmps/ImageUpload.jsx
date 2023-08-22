import { useEffect } from 'react'
import { useRef, useState } from 'react'

export const ImageUpload = ({ updatePlaylistImg, playlistImg }) => {
  const [selectedImage, setSelectedImage] = useState('https://res.cloudinary.com/dtaiyvzq5/image/upload/v1692020104/m2pslfiyjn8tgx9hs5pw.png')
  const changeImg = useRef(null)

  useEffect(() => {
    setSelectedImage(playlistImg || 'https://res.cloudinary.com/dtaiyvzq5/image/upload/v1692020104/m2pslfiyjn8tgx9hs5pw.png')
  },[playlistImg])

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('api_key', 829761526336932)
      formData.append('upload_preset', 'Eran Dev')
      formData.append('timestamp', '1678783380000')
      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dtaiyvzq5/image/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json()
        updatePlaylistImg(data.secure_url)
        setSelectedImage(data.secure_url)
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleUpload = async () => {
    if (selectedImage) {
      setSelectedImage(null)
      await updatePlaylistImg(null)
      setTimeout(() => { changeImg.current.children[0].click() }, 500)
    }
  };

  return (
    <div className='image-upload' ref={changeImg} style={{border:selectedImage?'none':''}}>
      {!selectedImage && 
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      }
      {selectedImage && (
          <img className='image' onClick={handleUpload}
            src={selectedImage }
            alt="select"
            title='Change by clicking again'
          />
      )}
    </div>
  )
}