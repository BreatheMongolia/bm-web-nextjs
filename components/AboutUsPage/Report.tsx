import React, { FC, useState } from 'react'
import Modal from 'react-modal'
import { useMediaQuery } from 'react-responsive'

Modal.setAppElement('#__next')

type Props = {
  id: number
  title: string
  urlMn: string
  urlEng: string
}

const Report: FC<Props> = ({ id, title, urlMn, urlEng }) => {
  const isMobile = useMediaQuery({ maxWidth: 912 })
  const [isOpen, setOpen] = useState(false)
  const [url, setUrl] = useState()

  const handleClick = (url: any) => {
    setUrl(url)
    setOpen(true)
  }
  return (
    <>
      <div className="report">
        <h2>{title}</h2>
        <div className="download">
          {urlEng && <button onClick={() => handleClick(urlEng)}>ENG</button>}
          {urlMn && <button onClick={() => handleClick(urlMn)}>MNG</button>}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
        shouldCloseOnOverlayClick={true}
        style={{
          overlay: {
            backgroundColor: 'transparent',
          },
          content: {
            inset: 0,
            width: isMobile ? 310 : 625,
            padding: 0,
            border: 'none',
            position: 'relative',
            backgroundColor: '#61b1ee',
            borderRadius: 20,
            textAlign: 'center',
          },
        }}
      >
        <section className="modal__bg" onClick={() => setOpen(false)}>
          <div className="modal__align">
            <div className="modal__content-pdf">
              <iframe className="modal__pdf" width="100%" height="100%" src={url} />
            </div>
          </div>
        </section>
      </Modal>
    </>
  )
}

export default Report
