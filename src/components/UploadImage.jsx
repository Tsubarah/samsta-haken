import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import useUploadImage from '../hooks/useUploadImage'
import classNames from 'classnames'

const UploadImage = () => {
  const uploadImage = useUploadImage()

  const onDrop = useCallback((acceptedFiles) => {
    console.log("Received a file")

    if (!acceptedFiles.length) {
      return
    }

    uploadImage.upload(acceptedFiles[0])
  }, [])

  const {
    acceptedFiles,
    getRootProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: {
      'image/gif' : ['.gif'],
      'image/jpeg' : ['.jpg', '.jpeg'],
      'image/png' : ['png'],
      'image/webp' : ['.webp'],
    },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024,
    multiple: false,
    onDrop,
  })

  const cssClasses = classNames({
    'drag-accept' : isDragAccept,
    'drag-reject' : isDragReject,
  })

  return (
    <div {...getRootProps()} id="upload-image-dropzone-wrapper" className={cssClasses}>
      <input {...getInputProps()} />

      {
        isDragActive
          ? isDragAccept
            ? <p>Ladda upp fil</p>
            : <p>Filen accepteras ej</p>
          : <p>Släpp filen här</p>
      }

      {acceptedFiles.length > 0 && (
        <div className="accepted-files mt-2">
          <ul className="list-unstyled">
            {acceptedFiles.map(image => (
              <li key={image.name}>{image.name} ({Math.round(image.size / 1024)} kB</li>
            ))}
          </ul>
        </div>
      )}

      {uploadImage.progress && (
        <>
          <div className="mb-1 text-base font-medium text-yellow-700 dark:text-yellow-500">Uploading Image</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
            <div className="bg-yellow-400 h-2.5 rounded-full" style={`width: ${uploadImage.progress}`}></div>
          </div>
        </>
      )}

      {uploadImage.isError && <div>{uploadImage.error.message}</div>}
      {uploadImage.isSuccess && <div>File uploaded successfully ✨</div>}
    </div>
  )
}

export default UploadImage