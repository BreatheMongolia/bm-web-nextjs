import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useAtom } from 'jotai'
import { giveButterDialogAtom } from 'lib/consts/atoms'

const FORM_URL = 'https://givebutter.com/embed/c/donatebreathemongolia'

const GiveButterDialog = () => {
  const [dialogOpen, setDialogOpen] = useAtom(giveButterDialogAtom)

  return (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <div className="fixed inset-0 bg-black/30 z-50" aria-hidden={true}></div>
      <div className="fixed inset-0 z-50 flex w-screen items-center justify-center">
        <Dialog.Panel className="mx-1 w-full sm:w-5/6 lg:w-4/6 xl:w-3/6">
          <button onClick={() => setDialogOpen(false)} className="absolute right-6 top-10">
            <XMarkIcon className="h-5 w-5" />
          </button>
          <iframe className="min-h-[600px] w-full" src={FORM_URL} />
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default GiveButterDialog
