import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid'
import { PolicyStatus, Topic } from 'graphql/generated'
import { getTranslated } from 'lib/utils/getTranslated'
import { FilterList } from './FilterList'
import dayjs from 'dayjs'
import parse from 'html-react-parser'
import { Dropdown } from './Dropdown'

type OptionProps = {
  id?: string;
  label: string;
  value: string;
}

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

export const PolicySection = ({
  policies,
  documentTypeOptions,
  policyStatuses,
  policyTopics,
}: {
  policies: Policy[]
  documentTypeOptions: OptionProps[]
  policyStatuses: PolicyStatus[]
  policyTopics: Topic[]
}) => {
  const { t, i18n } = useTranslation('policy')
  const [activeButtons, setActiveButtons] = useState([])
  const [filteredPolicies, setFilteredPolicies] = useState<Policy[]>(policies)
  const [currentPage, setCurrentPage] = useState(0)

  // Dropdown options states
  const [policyTopicOptions, setPolicyTopicOptions] = useState<OptionProps[]>([])
  const [yearOptions, setYearOptions] = useState<OptionProps[]>([])
  // Filter states
  const [selectedDocumentType, setSelectedDocumentType] = useState<string | undefined>()
  const [selectedDocumentTopic, setSelectedDocumentTopic] = useState<string | undefined>()
  const [selectedYear, setSelectedYear] = useState<string | undefined>()


  useEffect(() => {
    const uniqueYearOptions: OptionProps[] = [];
    const years = policies.map(policy => dayjs(policy.policyPageCustomFields.initiatedDate).year().toString());
    const uniqueYears = Array.from(new Set(years)).sort((a, b) => parseInt(b) - parseInt(a));

    uniqueYears.forEach(year => {
      uniqueYearOptions.push({
        label: year,
        value: year,
      });
    });

    setYearOptions(uniqueYearOptions);
  }
    , [policies])

  useEffect(() => {
    const options = policyTopics.map(topic => ({
      label: getTranslated(topic.topicCustomFields.name, topic.topicCustomFields.nameMn, i18n.language),
      value: topic.slug,
    }))
    setPolicyTopicOptions(options)
  }, [policyTopics, i18n.language])

  useEffect(() => {
    const filtered = policies.filter(policy =>
      policy.documentTypes.edges.some(type => selectedDocumentType !== undefined ? type.node.slug === selectedDocumentType : true) &&
      policy.topics.edges.some(topic => selectedDocumentTopic !== undefined ? topic.node.slug === selectedDocumentTopic : true) &&
      (selectedYear !== undefined ? dayjs(policy.policyPageCustomFields.initiatedDate).year().toString() === selectedYear : true)
    )
    setFilteredPolicies(filtered)
  }, [selectedDocumentTopic, selectedDocumentType, policies, selectedYear])

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

  function formatMyDate(value: string) {
    if (!value) return <></>
    return dayjs(value).format('DD/MM/YYYY')
  }


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
          className={`cursor-pointer rounded-full w-12 h-12 flex items-center justify-center transition-all hover:bg-bm-blue/80 hover:text-white ${currentPage === i && 'bg-bm-blue text-white'
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
          <button
            onClick={() => {
              setSelectedDocumentType(undefined)
              setSelectedDocumentTopic(undefined)
              setSelectedYear(undefined)
            }}
            className={`w-28 border border-[#ADC4CC] font-semibold text-black py-1 rounded-2xl flex gap-3 justify-center items-center bg-bm-blue text-white hover:bg-bm-blue-hover`}
          >
            {t('filterButtons.all')}
          </button>

          <Dropdown id="types" options={documentTypeOptions} label={t('filterButtons.types')} onClick={(selected) => setSelectedDocumentType(selected)} selectedOption={selectedDocumentType} />
          <Dropdown id="topics" options={policyTopicOptions} label={t('filterButtons.topics')} onClick={(selected) => setSelectedDocumentTopic(selected)} selectedOption={selectedDocumentTopic} />

          <FilterList id={3} name={t('filterButtons.status')} isActive={activeButtons.some(button => button == 3)}>
            <div>
              {policyStatuses.map((status, idx) => (
                <div
                  key={idx}
                  className="block px-2 py-2 hover:bg-gray-100 hover:rounded-xl hover:text-bm-blue mx-auto w-[95%] l-[90%]"
                  onClick={() => {
                    // clickFilterButton(3, status.slug)
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
          <Dropdown id="year" options={yearOptions} label={t('filterButtons.year')} onClick={(selected) => setSelectedYear(selected)} selectedOption={selectedYear} />
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
                {policy.documentTypes.edges.map((type, i) => getTranslated(
                  type.node.documentTypeCustomFields.name,
                  type.node.documentTypeCustomFields.nameMn,
                  i18n.language,
                )).join(', ')}
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
            className={`transition-all hover:bg-bm-blue/80 hover:text-white rounded-full border-black border hover:border-bm-blue/80 ${currentPage === 0 ? 'opacity-0' : 'cursor-pointer'
              }`}
            onClick={() => currentPage !== 0 && onPageClick(currentPage - 1)}
          >
            <span className="block p-3">
              <ChevronLeftIcon className="w-5 h-5" />
            </span>
          </div>
          {pages}
          <div
            className={`transition-all hover:bg-bm-blue/80 hover:text-white border-black border hover:border-bm-blue/80 rounded-full ${currentPage === MAX_PAGES - 1 ? 'opacity-0' : 'cursor-pointer'
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
