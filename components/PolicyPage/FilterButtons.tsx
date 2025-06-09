import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { FilterList } from './FilterList'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import { getTranslated } from 'lib/utils/getTranslated'
import { DocumentType } from 'graphql/generated'
import dayjs from 'dayjs'

type Policy = {
  slug: string
  policyPageCustomFields: {
    title: string
    titleMn: string
    summary: string
    summaryMn: string
    initiatedDate: string
  }
  documentTypes: {
    edges: {
      node: {
        slug: string
        documentTypeCustomFields: {
          name: string
          nameMn: string
        }
      }
    }[]
  }
  topics: {
    edges: {
      node: {
        topicCustomFields: {
          name: string
          nameMn: string
        }
      }
    }[]
  }
  policyStatus: {
    edges: {
      node: {
        policyStatusCustomFields: {
          name: string
          nameMn: string
        }
      }
    }[]
  }
}

const getUniqueYears = (policies: Policy[]) => {
  const years = []
  policies.forEach(policy => {
    const year = dayjs(policy.policyPageCustomFields.initiatedDate).year()
    if (!years.some(item => item == year)) {
      years.push(year)
    }
  })
  // Sort years in descending order
  years.sort((a, b) => b - a)
  return years
}

export const FilterButtons = ({ policies, documentTypes }: { policies: Policy[]; documentTypes: DocumentType[] }) => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const { t, i18n } = useTranslation('policy')
  const uniqueYears = getUniqueYears(policies)

  useEffect(() => {
    if (isMenuOpen) {
      setMenuOpen(false)
    }
  }, [])

  return (
    <div className="uppercase text-xsm tracking-[1px] font-medium bg-white text-black">
      <div className="flex">
        <FilterList id={0} name={t('filterButtons.all')} isActive={true} />
        <FilterList id={1} name={t('filterButtons.types')} isActive={false} />
        <FilterList id={2} name={t('filterButtons.topics')} isActive={false} />
        <FilterList id={3} name={t('filterButtons.status')} isActive={false} />
        <FilterList id={4} name={t('filterButtons.year')} isActive={true}>
          <div>
            {uniqueYears.map((y, idx) => (
              <div
                key={idx}
                className="block px-2 py-2 hover:bg-gray-100 hover:rounded-xl hover:text-bm-blue mx-auto w-[95%] l-[90%] font-semibold"
              >
                {y}
              </div>
            ))}
          </div>
        </FilterList>
      </div>
      {/* <div
          id="mobile-menu"
          className={`bg-white w-full lg:hidden fixed py-10 flex flex-col gap-7 h-full z-30 px-10 
        uppercase text-lg font-semibold tracking-widest
        transition-all ease-in-out duration-200 overflow-x-hidden
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <FilterList name={t('home')} isActive="/" isActive={path == '/'} />
          <FilterList name={t('takeAction')} isActive="/take-action" isActive={path.includes('take-action')} />
          <FilterList name={t('policy')} isActive="/policy" isActive={path.includes('policy')} />
          <FilterList name={t('health')} isActive="/health" isActive={path.includes('health')} />
          <FilterList name={t('projects')} isActive={false}>
            <div>
              {projects.map((project, index) => (
                <Link key={index} isActive={project.url} target={'_blank'}>
                  <div className="block px-2 py-2 hover:bg-gray-100 hover:rounded-xl hover:text-bm-blue mx-auto w-[95%] l-[90%] font-semibold">
                    {getTranslated(project.name, project.titleMn)}
                  </div>
                </Link>
              ))}
            </div>
          </FilterList>
          <FilterList name={t('news')} isActive="/news" isActive={path.includes('news')} />
          <FilterList name={t('aboutUs')} isActive="/about" isActive={path.includes('about')} />

        </div> */}
    </div>
  )
}
