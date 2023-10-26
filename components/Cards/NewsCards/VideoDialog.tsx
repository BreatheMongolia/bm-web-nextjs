import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShareButton } from 'components/NewsPage/DetailPage'
import { useAtom } from 'jotai'
import { videoNewsDialogAtom } from 'lib/consts/atoms'
import { useEffect, useState } from 'react'

function VideoDialog() {
  const [isOpen, setOpen] = useState(false)
  const [videoNewsDialogUrl, setVideoDialogUrl] = useAtom(videoNewsDialogAtom)

  function getId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)

    return match && match[2].length === 11 ? match[2] : null
  }

  const getYoutubeEmbedUrl = (sourceLink: string) => {
    const videoId = getId(sourceLink)
    return `https://www.youtube.com/embed/${videoId}`
  }

  useEffect(() => {
    setOpen(videoNewsDialogUrl.length > 0)
  }, [videoNewsDialogUrl])

  function onClose() {
    setVideoDialogUrl('')
    setOpen(false)
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="absolute z-50 w-screen h-screen top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center"
    >
      <Dialog.Panel className="gap-5 flex flex-col">
        <div className="flex justify-between">
          <button
            className="bg-white rounded-full p-2 transition-all hover:bg-zinc-50 hover:rotate-90"
            onClick={() => onClose()}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          <div className="bg-amber-200 rounded-full whitespace-nowrap flex">
            <ShareButton
              url={videoNewsDialogUrl}
              title=""
              bottom={false}
              className="flex bg-[#f4ac3d] backdrop-blur-sm rounded-full justify-around gap-x-2 px-4 py-2"
            />
          </div>
        </div>
        <div className="aspect-video">
          {videoNewsDialogUrl.length > 0 && (
            <iframe
              className="modal__video-style"
              loading="lazy"
              width="800"
              height="500"
              src={getYoutubeEmbedUrl(videoNewsDialogUrl)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          )}
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}

export default VideoDialog
