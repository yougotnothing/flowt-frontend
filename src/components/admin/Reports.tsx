import { FC, useEffect, useState } from "react"
import { Report, ReportNav, ReportNavButton, ReportsContainer, ReportTextContainer, ReportText, ReportButtonsContainer, ReportButton } from "./Admin.styled"
import { handleMouseEnter, handleMouseLeave, handleNavigateToReportContent, reportButtonText } from "./functions";
import { adminStore as admin } from "../../stores/toAdmin.mobx";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

export const Reports: FC = observer(() => {
  const [isOpen, setIsOpen] = useState<boolean[]>(Array(admin.reports.length).fill(false));
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleScroll = (e: any) => {
    const element = e.target.documentElement;

    if(element.scrollHeight - (element.scrollTop + window.innerHeight) < 100) {
      setIsFetching(true);
      console.log('scroll', e.target.documentElement.scrollTop);
    }
  }

  useEffect(() => {
    if(isFetching) {
      admin.setPage(admin.page + 1);
      admin.getReports();
      setIsFetching(false);
    }
  }, [isFetching]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
  
    return () => {
      document.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    admin.getReports();
  }, [admin.type]);

  return (
    <>
      <ReportNav>
        <ReportNavButton onClick={() => admin.setType('USER')}>User reports</ReportNavButton>
        <ReportNavButton onClick={() => admin.setType('SONG')}>Song reports</ReportNavButton>
        <ReportNavButton onClick={() => admin.setType('PLAYLIST')}>Playlist reports</ReportNavButton>
      </ReportNav>
      <ReportsContainer>
        {admin.reports.map((report, index) => (
          <Report
            key={index}
            onMouseEnter={() => handleMouseEnter(index, setIsOpen)}
            onMouseLeave={() => handleMouseLeave(index, setIsOpen)}
          >
            <ReportTextContainer>
              <ReportText $type="info">
                {report.contentTypeName}
              </ReportText>
              <ReportText $type="info">
                report type: {report.contentType.toLowerCase()}
              </ReportText>
              <ReportText $type="info">
                Created at: {report.createdAt}
              </ReportText>
            </ReportTextContainer>
            {report.checkedAt && <ReportText $type="info">checked at: {report.checkedAt}</ReportText>}
            <ReportButtonsContainer $isOpen={isOpen[index]}>
              <ReportButton onClick={() => admin.declineReport(report.id)}>decline report</ReportButton>
              <ReportButton onClick={() => admin.sendReport(report.id)}>send warning mail</ReportButton>
              <ReportButton onClick={() => handleNavigateToReportContent(report.contentTypeName, navigate)}>
                {reportButtonText}
              </ReportButton>
            </ReportButtonsContainer>
          </Report>
        ))}
        <ReportText $type="report mail">{admin.report_mail}</ReportText>
      </ReportsContainer>
    </>
  )
});