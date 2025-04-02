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
            en: page?.homePage.partnersLogosTitle,
            mn: page?.homePage.partnersLogosTitleMn,
          }}
          partnerLogos={page?.homePage.partnersLogos}
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
      title: getTranslated(accData[i].node.accomplishmentCustomFields.title, accData[i].node.accomplishmentCustomFields.titleMn, locale),
      category: getTranslated(accData[i].node.accomplishmentCustomFields.category, accData[i].node.accomplishmentCustomFields.categoryMn, locale),
      description: getTranslated(
        accData[i].node.accomplishmentCustomFields.description,
        accData[i].node.accomplishmentCustomFields.descriptionMn,
        locale,
      ),
      date: accData[i].node.accomplishmentCustomFields.date,
      image:
        accData[i].node.accomplishmentCustomFields.image?.node.mediaDetails?.sizes !== null
          ? accData[i].node.accomplishmentCustomFields.image?.node?.mediaDetails?.sizes[0]?.sourceUrl
          : accData[i].node.accomplishmentCustomFields.image?.node?.mediaItemUrl,
      sortBy: accData[i].node.accomplishmentCustomFields.date,
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
        getTranslated(report.node.reportCustomFields.title, report.node.reportCustomFields.titleMn, locale) !== null
          ? getTranslated(report.node.reportCustomFields.title, report.node.reportCustomFields.titleMn, locale)
          : '',
      urlMn: report.node.reportCustomFields?.pdfFileMn ? report.node.reportCustomFields?.pdfFileMn?.node.mediaItemUrl : null,
      urlEng: report.node.reportCustomFields?.pdfFile ? report.node.reportCustomFields?.pdfFile?.node.mediaItemUrl : null,
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
      image: getTranslated(data.image.node.mediaItemUrl, data.imageMn.node.mediaItemUrl, locale),
    },
    // This tells the page how often to refetch from the API (in seconds) (1 hour)
    revalidate: 60 * 60,
  }
}
