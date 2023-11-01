import { useTranslation } from 'next-i18next'
import { useAtom } from 'jotai'
import { giveButterDialogAtom } from 'lib/consts/atoms'
import { HeartIcon } from '@heroicons/react/24/solid'

const GiveButterFloatingButton = () => {
  const { t } = useTranslation('nav')
  const [_, setDialogOpen] = useAtom(giveButterDialogAtom)
  return (
    <div className="absolute bottom-4 right-8">
      <button
        className="bg-action-red hover:bg-red-300 text-white rounded-full px-3 sm:px-6 py-3 font-bold tracking-[1px] cursor-pointer flex items-center justify-center gap-x-2 shadow-md"
        onClick={() => {
          setDialogOpen(true)
        }}
      >
        <span className="hidden sm:block">{t('support')}</span>
        <HeartIcon className="w-5 h-5" />
      </button>
    </div>
  )
}

export default GiveButterFloatingButton
