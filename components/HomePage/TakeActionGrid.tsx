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

const GRID_LIMIT = 4
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
      <div className="grid grid-cols-1 md:grid-cols-2">
        {takeActionPosts.slice(0, GRID_LIMIT).map((takeAction, idx) => (
          <TakeActionTile
            key={'take_action_' + idx}
            id={takeAction.databaseId}
            slug={takeAction.slug}
            title={
              getTranslated(
                takeAction.takeActionCustomFields?.title,
                takeAction.takeActionCustomFields?.titleMn,
                locale,
              ) !== null
                ? getTranslated(
                    takeAction.takeActionCustomFields?.title,
                    takeAction.takeActionCustomFields?.titleMn,
                    locale,
                  )
                : ''
            }
            featuredImage={
              takeAction.featuredImage?.node?.mediaDetails.sizes !== null
                ? takeAction.featuredImage?.node?.mediaDetails?.sizes[0].sourceUrl
                : ''
            }
            index={1}
            pageNumberLimit={5}
          />
        ))}
      </div>
    </div>
  )
}

export { TakeActionGrid }
