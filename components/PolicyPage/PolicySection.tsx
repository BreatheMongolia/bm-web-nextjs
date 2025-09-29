import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { Menu } from '@headlessui/react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ArrowUpRightIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid'
import { getTranslated } from 'lib/utils/getTranslated'
import dayjs from 'dayjs'
import parse from 'html-react-parser'
import { Dropdown } from './Dropdown'
import SearchBar from './SearchBar'

type OptionProps = {
  id?: string
  label: string
  value: string
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
  documentTypes?: {
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
  topics?: {
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
  policyStatuses?: {
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
  policyStatusOptions,
  documentTopicOptions,
}: {
  policies: Policy[]
  documentTypeOptions: OptionProps[]
  policyStatusOptions: OptionProps[]
  documentTopicOptions: OptionProps[]
}) => {
  const { t, i18n } = useTranslation('policy')
  const [filteredPolicies, setFilteredPolicies] = useState<Policy[]>(policies)
  const [currentPage, setCurrentPage] = useState(0)
  const [policyDetails, setPolicyDetails] = useState([])
  const [yearOptions, setYearOptions] = useState<OptionProps[]>([])
  const [searchValue, setSearchValue] = useState<string | undefined>('')
  // Filter states
  const [selectedDocumentType, setSelectedDocumentType] = useState([])
  const [selectedDocumentTopic, setSelectedDocumentTopic] = useState([])
  const [selectedPolicyStatus, setSelectedPolicyStatus] = useState([])
  const [selectedYear, setSelectedYear] = useState([])

  const sortArray = [
    { id: 1, label: t('sortBy.dateAsc'), value: 'dateAsc' },
    { id: 2, label: t('sortBy.dateDesc'), value: 'dateDesc' },
    { id: 3, label: t('sortBy.nameAsc'), value: 'nameAsc' },
    { id: 4, label: t('sortBy.nameDesc'), value: 'nameDesc' },
  ]

  useEffect(() => {
    const uniqueYearOptions: OptionProps[] = []
    const years = policies.map(policy => dayjs(policy.policyPageCustomFields.initiatedDate).year().toString())
    const uniqueYears = Array.from(new Set(years)).sort((a, b) => parseInt(b) - parseInt(a))

    uniqueYears.forEach(year => {
      uniqueYearOptions.push({
        label: year,
        value: year,
      })
    })

    setYearOptions(uniqueYearOptions)
  }, [policies])

  useEffect(() => {
    let filtered = policies.filter(
      policy =>
        policy.documentTypes.edges.some(type =>
          selectedDocumentType.length !== 0 ? selectedDocumentType.some(t1 => t1 === type.node.slug) : true,
        ) &&
        policy.topics.edges.some(topic =>
          selectedDocumentTopic.length !== 0 ? selectedDocumentTopic.some(t2 => t2 === topic.node.slug) : true,
        ) &&
        policy.policyStatuses.edges.some(status =>
          selectedPolicyStatus.length !== 0 ? selectedPolicyStatus.some(s => s === status.node.slug) : true,
        ) &&
        (selectedYear.length !== 0
          ? selectedYear.some(y => y === dayjs(policy.policyPageCustomFields.initiatedDate).year().toString())
          : true),
    )

    filtered =
      searchValue === ''
        ? filtered
        : filtered.filter(
            policy =>
              policy.policyPageCustomFields?.title?.toLocaleLowerCase().includes(searchValue?.toLocaleLowerCase()) ||
              policy.policyPageCustomFields?.titleMn?.toLocaleLowerCase().includes(searchValue?.toLocaleLowerCase()) ||
              policy.policyPageCustomFields?.summary?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
              policy.policyPageCustomFields?.summaryMn?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
          )

    setFilteredPolicies(filtered)
  }, [selectedDocumentTopic, selectedDocumentType, selectedPolicyStatus, policies, selectedYear, searchValue])

  // Sort function
  const clickSortButton = (id: number) => {
    switch (id) {
      case 1:
        {
          // dateAsc
          filteredPolicies.sort(
            (a, b) =>
              dayjs(b.policyPageCustomFields.initiatedDate).year() -
              dayjs(a.policyPageCustomFields.initiatedDate).year(),
          )
        }
        break
      case 2:
        {
          // dateDesc
          filteredPolicies.sort(
            (a, b) =>
              dayjs(a.policyPageCustomFields.initiatedDate).year() -
              dayjs(b.policyPageCustomFields.initiatedDate).year(),
          )
        }
        break
      case 3:
        {
          // nameAsc
          if (i18n.language === 'mn') {
            filteredPolicies.sort((a, b) =>
              a.policyPageCustomFields.titleMn.localeCompare(b.policyPageCustomFields.titleMn),
            )
          } else {
            filteredPolicies.sort((a, b) =>
              a.policyPageCustomFields.title.localeCompare(b.policyPageCustomFields.title),
            )
          }
        }
        break
      case 4:
        {
          //nameDesc
          if (i18n.language === 'mn') {
            filteredPolicies.sort((a, b) =>
              b.policyPageCustomFields.titleMn.localeCompare(a.policyPageCustomFields.titleMn),
            )
          } else {
            filteredPolicies.sort((a, b) =>
              b.policyPageCustomFields.title.localeCompare(a.policyPageCustomFields.title),
            )
          }
        }
        break
      default:
        break
    }
    setFilteredPolicies([...filteredPolicies])
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

  const showPolicyDetails = (index: number) => {
    const policy = filteredPolicies[index]
    return (
      <div>
        <div className="flex flex-row grid grid-cols-4 mt-5 gap-2 font-medium">
          <div className="ml-3 text-[#524D42]">{t('filterButtons.types') + ':'}</div>
          <div className="col-span-3">
            {policy.documentTypes?.edges
              .map(type =>
                getTranslated(
                  type.node.documentTypeCustomFields.name,
                  type.node.documentTypeCustomFields.nameMn,
                  i18n.language,
                ),
              )
              .join(', ')}
          </div>
          <div className="ml-3 text-[#524D42]">{t('filterButtons.topics') + ':'}</div>
          <div className="col-span-3">
            {policy.topics?.edges
              .map(topic =>
                getTranslated(topic.node.topicCustomFields.name, topic.node.topicCustomFields.nameMn, i18n.language),
              )
              .join(', ')}
          </div>
          <div className="ml-3 text-[#524D42]">{t('filterButtons.status') + ':'}</div>
          <div className="col-span-3">
            {policy.policyStatuses?.edges
              .map(status =>
                getTranslated(
                  status.node.policyStatusCustomFields.name,
                  status.node.policyStatusCustomFields.nameMn,
                  i18n.language,
                ),
              )
              .join(', ')}
          </div>
        </div>
        <div className="flex justify-end">
          <Link className="font-semibold text-xs text-bm-blue" href={`/policy/${policy.slug}`}>
            {t('showMore')} <ArrowUpRightIcon className="inline-block w-3 h-3 font-semibold text-bm-blue" />
          </Link>
        </div>
      </div>
    )
  }

  const checkSelectedDocumentType = typeToCheck => {
    selectedDocumentType.some(type => type === typeToCheck)
      ? setSelectedDocumentType(prevItems => prevItems.filter(item => item !== typeToCheck))
      : setSelectedDocumentType([...selectedDocumentType, typeToCheck])
  }

  const checkSelectedDocumentTopic = topicToCheck => {
    selectedDocumentTopic.some(topic => topic === topicToCheck)
      ? setSelectedDocumentTopic(prevItems => prevItems.filter(item => item !== topicToCheck))
      : setSelectedDocumentTopic([...selectedDocumentTopic, topicToCheck])
  }

  const checkSelectedPolicyStatus = statusToCheck => {
    selectedPolicyStatus.some(status => status === statusToCheck)
      ? setSelectedPolicyStatus(prevItems => prevItems.filter(item => item !== statusToCheck))
      : setSelectedPolicyStatus([...selectedPolicyStatus, statusToCheck])
  }

  const checkSelectedYear = yearToCheck => {
    selectedYear.some(year => year === yearToCheck)
      ? setSelectedYear(prevItems => prevItems.filter(item => item !== yearToCheck))
      : setSelectedYear([...selectedYear, yearToCheck])
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap w-full md:justify-between gap-2 my-5">
        {/* Desktop */}
        <div className="flex justify-start">
          <div className="relative hidden md:flex flex-wrap gap-2">
            <button
              onClick={() => {
                setSelectedDocumentType([])
                setSelectedDocumentTopic([])
                setSelectedPolicyStatus([])
                setSelectedYear([])
                setPolicyDetails([])
              }}
              className={`w-28 px-3 border border-[#ADC4CC] font-semibold py-1 rounded-xl justify-center items-center ${
                selectedDocumentType.length !== 0 ||
                selectedDocumentTopic.length !== 0 ||
                selectedPolicyStatus.length !== 0 ||
                selectedYear.length !== 0
                  ? 'text-black bg-white hover:bg-bm-blue-hover'
                  : 'bg-bm-blue text-white'
              }`}
            >
              {t('filterButtons.all')}
            </button>

            <Dropdown
              id="types"
              options={documentTypeOptions}
              label={t('filterButtons.types')}
              onClick={selected => checkSelectedDocumentType(selected)}
              selectedOption={selectedDocumentType}
            />
            <Dropdown
              id="topics"
              options={documentTopicOptions}
              label={t('filterButtons.topics')}
              onClick={selected => checkSelectedDocumentTopic(selected)}
              selectedOption={selectedDocumentTopic}
            />
            <Dropdown
              id="statuses"
              options={policyStatusOptions}
              label={t('filterButtons.status')}
              onClick={selected => checkSelectedPolicyStatus(selected)}
              selectedOption={selectedPolicyStatus}
            />
            <Dropdown
              id="year"
              options={yearOptions}
              label={t('filterButtons.year')}
              onClick={selected => checkSelectedYear(selected)}
              selectedOption={selectedYear}
            />
          </div>
        </div>
        <div className="relative flex place-content-end whitespace-nowrap">
          <SearchBar onSubmit={(e: React.FormEvent<HTMLInputElement>) => setSearchValue(e?.currentTarget?.value)} />
          <Menu>
            <Menu.Button className="w-28 bg-[#f09c4f] text-white font-semibold py-1 px-3 rounded-xl hover:opacity-80 active:opacity-80 flex gap-3 justify-center items-center">
              {t('sortButton')}
            </Menu.Button>
            <Menu.Items className="absolute top-10 right-0 bg-white z-50 rounded border border-[#f09c4f] w-60">
              {sortArray.map((x, idx) => {
                return (
                  <Menu.Item key={idx}>
                    {() => {
                      return (
                        <div
                          className="px-5 py-1 cursor-pointer border-b border-white hover:bg-[#f09c4f]/20 text-xs"
                          onClick={() => clickSortButton(x.id)}
                        >
                          {x.label}
                        </div>
                      )
                    }}
                  </Menu.Item>
                )
              })}
            </Menu.Items>
          </Menu>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex border-b border-zinc-500 py-5">
          <div className="relative flex flex-wrap w-full justify-items-center gap-2">
            <button
              onClick={() => {
                setSelectedDocumentType([])
                setSelectedDocumentTopic([])
                setSelectedPolicyStatus([])
                setSelectedYear([])
                setPolicyDetails([])
              }}
              className={`w-[30%] px-3 border border-[#ADC4CC] font-semibold py-1 rounded-xl ${
                selectedDocumentType.length !== 0 ||
                selectedDocumentTopic.length !== 0 ||
                selectedPolicyStatus.length !== 0 ||
                selectedYear.length !== 0
                  ? 'text-black bg-white hover:bg-bm-blue-hover'
                  : 'bg-bm-blue text-white'
              }`}
            >
              {t('filterButtons.all')}
            </button>
            <Dropdown
              id="types"
              options={documentTypeOptions}
              label={t('filterButtons.types')}
              onClick={selected => checkSelectedDocumentType(selected)}
              selectedOption={selectedDocumentType}
            />
            <Dropdown
              id="topics"
              options={documentTopicOptions}
              label={t('filterButtons.topics')}
              onClick={selected => checkSelectedDocumentTopic(selected)}
              selectedOption={selectedDocumentTopic}
            />
            <Dropdown
              id="statuses"
              options={policyStatusOptions}
              label={t('filterButtons.status')}
              onClick={selected => checkSelectedPolicyStatus(selected)}
              selectedOption={selectedPolicyStatus}
            />
            <Dropdown
              id="year"
              options={yearOptions}
              label={t('filterButtons.year')}
              onClick={selected => checkSelectedYear(selected)}
              selectedOption={selectedYear}
            />
          </div>
        </div>

        {/* Table Header */}
        <div className="hidden md:grid w-full grid-cols-7 bg-bm-blue text-lg font-semibold text-white my-5 rounded-l-md rounded-r-md">
          <div className="col-span-2 pl-2">{t('tableHeader.documentName')}</div>
          <div className="">{t('tableHeader.documentType')}</div>
          <div className="">{t('tableHeader.documentStatus')}</div>
          <div className="col-span-3">{t('tableHeader.documentSummary')}</div>
        </div>

        {/* Policies */}
        <div className="flex flex-col gap-2 w-full">
          {filteredPolicies.length !== 0 ? (
            filteredPolicies.map((policy, index) => (
              <div key={'policyList' + index}>
                {/* Desktop */}
                <div className="hidden md:grid grid-cols-7 border-b border-zinc-200 pb-5 gap-2">
                  <div className="col-span-2">
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
                  <p className="">
                    {policy.documentTypes.edges
                      .map((type, i) =>
                        getTranslated(
                          type.node.documentTypeCustomFields.name,
                          type.node.documentTypeCustomFields.nameMn,
                          i18n.language,
                        ),
                      )
                      .join(', ')}
                  </p>
                  {policy.policyStatuses?.edges.length > 0 && (
                    <p>
                      {getTranslated(
                        policy.policyStatuses?.edges[0].node.policyStatusCustomFields.name,
                        policy.policyStatuses?.edges[0].node.policyStatusCustomFields.nameMn,
                        i18n.language,
                      )}
                    </p>
                  )}
                  <div className="col-span-3">
                    <div className="policy-summary-limit">
                      {parse(
                        getTranslated(
                          policy.policyPageCustomFields.summary,
                          policy.policyPageCustomFields.summaryMn,
                          i18n.language,
                        ),
                      )}
                    </div>
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
                {/* Mobile */}
                <div className="md:hidden grid border-b border-zinc-500 py-2">
                  <Link href={`/policy/${policy.slug}`}>
                    <h3 className="mb-3">
                      {getTranslated(
                        policy.policyPageCustomFields.title,
                        policy.policyPageCustomFields.titleMn,
                        i18n.language,
                      )}
                    </h3>
                  </Link>
                  <div className="flex flex-row">
                    <div className="flex flex-row items-center h-8 bg-[#E9EAEB] rounded-l-md rounded-r-md px-3 text-sm">
                      <CalendarIcon className="h-5 w-5 mr-2" />{' '}
                      {formatMyDate(policy.policyPageCustomFields.initiatedDate)}
                    </div>
                    <div className="flex flex-1 justify-end">
                      <ChevronDownIcon
                        className="mt-3 h-4 w-4 cursor-pointer"
                        onClick={() => setPolicyDetails([...policyDetails, index])}
                      />
                    </div>
                  </div>
                  {policyDetails.some(i => i == index) && showPolicyDetails(index)}
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center text-gray-500">{t('noPoliciesFound.all')}</div>
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
    </div>
  )
}
