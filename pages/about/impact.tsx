import { AboutUsHeader } from 'components/AboutUsPage'
import AboutUsImpact from 'components/AboutUsPage/AboutUsImpact'
import { OurPartners } from 'components/HomePage'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getHomePage } from 'lib/graphql-api/queries/home'
import { getTranslated } from 'lib/utils/getTranslated'
import { getAccomplishments, getImpactSettings, getReports } from 'lib/graphql-api/queries/aboutUs'

export default function ImpactPage({ page, reports, accomplishments, locale }) {
  return (
    <div className="flex flex-col bg-[#FAFAFF]">
      <AboutUsHeader />

      {/* Content */}
      <AboutUsImpact reports={reports} accomplishments={accomplishments} locale={locale} />

      <div className="container mx-auto flex flex-col gap-20">
        <OurPartners
          title={{
            en: page?.customFields.partnersLogosTitle,
            mn: page?.customFields.partnersLogosTitleMn,
          }}
          partnerLogos={page?.customFields.partnersLogos}
          locale={locale}
        />
      </div>
    </div>
  )
}

const getTransformedAccomplishment = (accData: string | any[], locale: string) => {
  const accomplishments = []

  for (let i = 0; i < accData.length; i++) {
    accomplishments.push({
      title: getTranslated(accData[i].node.customFields.title, accData[i].node.customFields.titleMn, locale),
      category: getTranslated(accData[i].node.customFields.category, accData[i].node.customFields.categoryMn, locale),
      description: getTranslated(
        accData[i].node.customFields.description,
        accData[i].node.customFields.descriptionMn,
        locale,
      ),
      date: accData[i].node.customFields.date,
      image:
        accData[i].node.customFields.image?.mediaDetails?.sizes !== null
          ? accData[i].node.customFields.image?.mediaDetails?.sizes[0]?.sourceUrl
          : '',
      sortBy: accData[i].node.customFields.date,
    })
  }

  return accomplishments
}

const getTransformedReport = (data: any[], locale: string) => {
  const reports: any[] = []

  data.map((report: any) => {
    reports.push({
      id: report.node.databaseId,
      title:
        getTranslated(report.node.customFields.title, report.node.customFields.titleMn, locale) !== null
          ? getTranslated(report.node.customFields.title, report.node.customFields.titleMn, locale)
          : '',
      urlMn: report.node.customFields?.pdfFileMn ? report.node.customFields?.pdfFileMn?.mediaItemUrl : null,
      urlEng: report.node.customFields?.pdfFile ? report.node.customFields?.pdfFile?.mediaItemUrl : null,
    })
  })

  return reports
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const page = await getHomePage('/')
  const accomplishments = await getAccomplishments()
  const reports = await getReports()
  const data = await getImpactSettings()

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['home', 'nav', 'footer', 'about'])),
      reports: getTransformedReport(reports, locale),
      accomplishments: getTransformedAccomplishment(accomplishments, locale),
      locale,
      page,
      title: getTranslated(data.title, data.titleMn, locale),
      description: getTranslated(data.description, data.descriptionMn, locale),
      image: getTranslated(data.image.mediaItemUrl, data.imageMn.mediaItemUrl, locale),
    },
    // This tells the page how often to refetch from the API (in seconds) (1 hour)
    revalidate: 60 * 60,
  }
}
