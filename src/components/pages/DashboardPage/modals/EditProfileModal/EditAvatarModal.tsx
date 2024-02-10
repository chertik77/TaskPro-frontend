import { Modal } from 'components/ui/modal/Modal'
import { Button } from 'components/ui'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useSelector } from 'react-redux'
import { selectUser } from 'redux/slices/user/user-slice'

export const EditAvatarModal = () => {
  const { avatarURL } = useSelector(selectUser)
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader()

    file.onload = function () {
      setPreview(file.result)
    }

    file.readAsDataURL(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  })

  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)

  /**
   * handleOnSubmit
   */

  //   async function handleOnSubmit(e: React.SyntheticEvent) {
  //     e.preventDefault()

  //     if (typeof acceptedFiles[0] === 'undefined') return

  //     const formData = new FormData()

  //     formData.append('file', acceptedFiles[0])
  //     formData.append('upload_preset', '<Your Upload Preset>')
  //     formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY)

  //     const results = await fetch(
  //       'https://api.cloudinary.com/v1_1/<Your Cloud Name>/image/upload',
  //       {
  //         method: 'POST',
  //         body: formData
  //       }
  //     ).then(r => r.json())

  //     console.log('results', results)
  //    }

  return (
    <Modal modalTitle='Edit profile' size='sm'>
      <div className='mb-5'>
        {preview && (
          <button className='mb-5 size-[68px] rounded-lg bg-cover bg-center '>
            <img src={preview as string} alt='Upload preview' />
          </button>
        )}

        {!preview && (
          <button
            type='button'
            style={{ backgroundImage: `url(${avatarURL?.url})` }}></button>
        )}
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
      </div>

      <Button type='submit'>Send</Button>
    </Modal>
  )
}
