import { H2 } from 'components/generic/Typography'
import { useTranslation } from 'next-i18next'
import { TakeAction } from 'graphql/generated'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { getTranslated } from 'lib/utils/getTranslated'
import TakeActionTile from '../Cards/TakeActionTile'

type Props = {
  takeActionPosts: TakeAction[]
  locale: string
}

const TakeActionGrid = ({ takeActionPosts, locale }: Props) => {
  const { t } = useTranslation('home')

  return (
    <div>
      <H2
        title={t('takeAction.gridTitle')}
        trailingLineColor="yellow"
        extraButton={{
          title: t('takeAction.seeMore'),
          url: '/take-action',
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2">{}</div>
    </div>
  )
}

export { TakeActionGrid }
