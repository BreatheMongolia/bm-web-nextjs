import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import { DocumentType, PolicyStatus, Topic } from 'graphql/generated'
import { getTranslated } from 'lib/utils/getTranslated'
import { FilterList } from './FilterList'
import dayjs from 'dayjs'
import parse from 'html-react-parser'

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
        slug: string
        topicCustomFields: {
          name: string
          nameMn: string
        }
      }
    }[]
  }
  policyStatuses: {
    edges: {
      node: {
        slug: string
        policyStatusCustomFields: {
          name: string
          nameMn: string
        }
      }
    }[]
  }
}

const POLICIES_PER_PAGE = 5

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

export const PolicySection = ({
  policies,
  documentTypes,
  policyStatuses,
  policyTopics,
}: {
  policies: Policy[]
  documentTypes: DocumentType[]
  policyStatuses: PolicyStatus[]
  policyTopics: Topic[]
}) => {
  const { t, i18n } = useTranslation('policy')
  const [activeButtons, setActiveButtons] = useState([])
  // const [showAll, setShowAll] = useState(true)
  const [filteredPolicies, setFilteredPolicies] = useState([] as Policy[])
  const [currentPage, setCurrentPage] = useState(0)
  const [isMenuOpen, setMenuOpen] = useState(false)

  const uniqueYears = getUniqueYears(policies)

  useEffect(() => {
    setFilteredPolicies(policies)
    if (isMenuOpen) {
      setMenuOpen(false)
    }
  }, [])

  const truncate = (input1: string, input2: string) => {
    const s = parse(getTranslated(input1, input2, i18n.language))[0]?.props?.children || ''
    if (typeof s !== 'string') {
      return ''
    }
    if (s.length > 225) {
      if (i18n.language === 'mn') {
        return s.substring(0, 200) + '...'
      } else {
        s.substring(0, 225) + '...'
      }
    } else {
      return s
    }
  }

  const onPageClick = (pageNum: number) => {
    if (pageNum < 0) setCurrentPage(0)
    const maxPages = Math.ceil(filteredPolicies.length / POLICIES_PER_PAGE)
    if (pageNum >= maxPages) {
      setCurrentPage(maxPages - 1)
    }
    setCurrentPage(pageNum)
  }

  // on click event function
  const clickFilterButton = (buttonId: number, filterArgumentSlug: string) => {
    setCurrentPage(0)
    if (filteredPolicies !== null) {
      if (buttonId !== 0) {
        if (activeButtons.some(x => x === buttonId)) {
          setActiveButtons(activeButtons.filter(x => x !== buttonId))
        } else {
          setActiveButtons([...activeButtons, buttonId])
        }
      } else {
        setActiveButtons([])
      }
    } else {
      if (buttonId == 0) {
        setFilteredPolicies(policies)
      }
      setActiveButtons([])
    }

    if (filteredPolicies !== null) {
      switch (buttonId) {
        case 0:
          {
            setFilteredPolicies(policies)
          }
          break
        case 1:
          {
            const fPolicies = filteredPolicies.filter(policy =>
              policy.documentTypes.edges.some(type => type.node.slug == filterArgumentSlug),
            )
            if (fPolicies.length === 0) {
              setFilteredPolicies(null)
            } else {
              setFilteredPolicies(fPolicies)
            }
          }
          break
        case 2:
          {
            const fPolicies = filteredPolicies.filter(policy =>
              policy.topics.edges.some(topic => topic.node.slug == filterArgumentSlug),
            )
            if (fPolicies.length === 0) {
              setFilteredPolicies(null)
            } else {
              setFilteredPolicies(fPolicies)
            }
          }
          break
        case 3:
          {
            const fPolicies = filteredPolicies.filter(policy =>
              policy.policyStatuses.edges.some(status => status.node.slug == filterArgumentSlug),
            )
            if (fPolicies.length === 0) {
              setFilteredPolicies(null)
            } else {
              setFilteredPolicies(fPolicies)
            }
          }
          break
        case 4:
          {
            const fPolicies = filteredPolicies.filter(policy =>
              policy.policyPageCustomFields.initiatedDate.toString().includes(filterArgumentSlug),
            )
            if (fPolicies.length === 0) {
              setFilteredPolicies(null)
              return (
                <>
                  (<div className="text-center text-gray-500">{t('noPoliciesFound.year')}</div>)
                </>
              )
            } else {
              setFilteredPolicies(fPolicies)
            }
          }
          break
        default:
          break
      }
    } else {
      setActiveButtons([])
    }
  }

  function formatMyDate(value: string) {
    if (!value) return <></>
    return dayjs(value).format('DD/MM/YYYY')
  }

  console.log(filteredPolicies)

  // pagination
  const pages = []
  let MAX_PAGES = 1
  if (filteredPolicies !== null && filteredPolicies.length !== 0) {
    MAX_PAGES = Math.ceil(filteredPolicies.length / POLICIES_PER_PAGE)
  }
  let repeated = false
  for (let i = 0; i < MAX_PAGES; i++) {
    if (i === 0 || i === MAX_PAGES - 1 || (i < currentPage + 2 && i > currentPage - 2)) {
      pages.push(
        <div
          key={'page' + i}
          onClick={() => setCurrentPage(i)}
          className={`cursor-pointer rounded-full w-12 h-12 flex items-center justify-center transition-all hover:bg-bm-blue/80 hover:text-white ${
            currentPage === i && 'bg-bm-blue text-white'
          }`}
        >
          {i + 1}
        </div>,
      )
      repeated = false
    } else {
      if (!repeated) {
        pages.push(<div>...</div>)
        repeated = true
      }
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap w-full gap-2 grow items-center my-5">
        <div className="relative flex place-content-start gap-2">
          <div
            onClick={() => {
              clickFilterButton(0, null)
            }}
          >
            <FilterList id={0} name={t('filterButtons.all')} isActive={activeButtons !== null} />
          </div>
          <FilterList id={1} name={t('filterButtons.types')} isActive={activeButtons.some(button => button == 1)}>
            <div>
              {documentTypes.map((type, idx) => (
                <div
                  key={idx}
                  className="block px-2 py-2 hover:bg-gray-100 hover:rounded-xl hover:text-bm-blue mx-auto w-[95%] l-[90%]"
                  onClick={() => {
                    clickFilterButton(1, type.slug)
                  }}
                >
                  {getTranslated(
                    type.documentTypeCustomFields.name,
                    type.documentTypeCustomFields.nameMn,
                    i18n.language,
                  )}
                </div>
              ))}
            </div>
          </FilterList>
          <FilterList id={2} name={t('filterButtons.topics')} isActive={activeButtons.some(button => button == 2)}>
            <div>
              {policyTopics.map((topic, idx) => (
                <div
                  key={idx}
                  className="block px-2 py-2 hover:bg-gray-100 hover:rounded-xl hover:text-bm-blue mx-auto w-[95%] l-[90%]"
                  onClick={() => {
                    clickFilterButton(2, topic.slug)
                  }}
                >
                  {getTranslated(topic.topicCustomFields.name, topic.topicCustomFields.nameMn, i18n.language)}
                </div>
              ))}
            </div>
          </FilterList>
          <FilterList id={3} name={t('filterButtons.status')} isActive={activeButtons.some(button => button == 3)}>
            <div>
              {policyStatuses.map((status, idx) => (
                <div
                  key={idx}
                  className="block px-2 py-2 hover:bg-gray-100 hover:rounded-xl hover:text-bm-blue mx-auto w-[95%] l-[90%]"
                  onClick={() => {
                    clickFilterButton(3, status.slug)
                  }}
                >
                  {getTranslated(
                    status.policyStatusCustomFields.name,
                    status.policyStatusCustomFields.nameMn,
                    i18n.language,
                  )}
                </div>
              ))}
            </div>
          </FilterList>
          <FilterList id={4} name={t('filterButtons.year')} isActive={activeButtons.some(button => button == 4)}>
            <div>
              {uniqueYears.map((y, idx) => (
                <div
                  key={idx}
                  className="block px-2 py-2 hover:bg-gray-100 hover:rounded-xl hover:text-bm-blue mx-auto w-[95%] l-[90%]"
                  onClick={() => {
                    clickFilterButton(4, y)
                  }}
                >
                  {y}
                </div>
              ))}
            </div>
          </FilterList>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-7 bg-bm-blue text-lg font-semibold text-white my-5 rounded-l-md rounded-r-md">
        <div className="col-span-2 pl-2">{t('tableHeader.documentName')}</div>
        <div className="">{t('tableHeader.documentType')}</div>
        <div className="">{t('tableHeader.documentStatus')}</div>
        <div className="col-span-3">{t('tableHeader.documentSummary')}</div>
      </div>

      {/* Policies */}
      <div className="">
        {filteredPolicies !== null ? (
          filteredPolicies.map((policy, index) => (
            <div key={'policyList' + index} className="grid grid-cols-7 border-b border-zinc-200 pb-5">
              <div className="col-span-2 mr-5">
                <Link href={`/policy/${policy.slug}`} className="">
                  <h3>
                    {getTranslated(
                      policy.policyPageCustomFields.title,
                      policy.policyPageCustomFields.titleMn,
                      i18n.language,
                    )}
                  </h3>
                </Link>
                <div className="flex justify-start mt-5">
                  <p className="bg-[#E9EAEB] rounded-l-md rounded-r-md px-2">
                    {(i18n.language === 'mn' ? 'Батлагдсан: ' : 'Date Passed: ') +
                      formatMyDate(policy.policyPageCustomFields.initiatedDate)}
                  </p>
                </div>
              </div>
              <p className="mr-5">
                {getTranslated(
                  policy.documentTypes.edges[0].node.documentTypeCustomFields.name,
                  policy.documentTypes.edges[0].node.documentTypeCustomFields.nameMn,
                  i18n.language,
                )}
              </p>
              <p>
                {getTranslated(
                  policy.policyStatuses.edges[0].node.policyStatusCustomFields.name,
                  policy.policyStatuses.edges[0].node.policyStatusCustomFields.nameMn,
                  i18n.language,
                )}
              </p>
              <div className="col-span-3">
                <p className="h-24">
                  {truncate(policy.policyPageCustomFields.summary, policy.policyPageCustomFields.summaryMn)}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {policy.topics.edges.map((topic, i) => (
                    <div key={'topic' + i} className="flex items-center">
                      {i < 5 && (
                        <p className="bg-[#E3F8FF] rounded-l-md rounded-r-md px-2 text-bm-blue">
                          {getTranslated(
                            topic.node.topicCustomFields.name,
                            topic.node.topicCustomFields.nameMn,
                            i18n.language,
                          )}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">{t('noPoliciesFound.all')}</div>
        )}
      </div>

      {/* Pagination */}
      <div className="pt-8 pb-3 mx-auto text-lg font-bold sm:text-xl">
        <div className="flex gap-0.5 sm:gap-5 justify-center items-center">
          <div
            className={`transition-all hover:bg-bm-blue/80 hover:text-white rounded-full border-black border hover:border-bm-blue/80 ${
              currentPage === 0 ? 'opacity-0' : 'cursor-pointer'
            }`}
            onClick={() => currentPage !== 0 && onPageClick(currentPage - 1)}
          >
            <span className="block p-3">
              <ChevronLeftIcon className="w-5 h-5" />
            </span>
          </div>
          {pages}
          <div
            className={`transition-all hover:bg-bm-blue/80 hover:text-white border-black border hover:border-bm-blue/80 rounded-full ${
              currentPage === MAX_PAGES - 1 ? 'opacity-0' : 'cursor-pointer'
            }`}
            onClick={() => currentPage !== MAX_PAGES - 1 && onPageClick(currentPage + 1)}
          >
            <span className="block p-3">
              <ChevronRightIcon className="w-5 h-5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
