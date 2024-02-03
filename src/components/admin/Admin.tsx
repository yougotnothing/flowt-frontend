import { FC, ReactElement, useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import { 
  Container,
  AdminPanel,
  AdminPanelButtons,
  Header
} from "./Admin.styled";
import { useNavigate, useLocation } from "react-router-dom";
import { Title as Helmet } from "../../helmet";

export const Admin: FC<{ children?: ReactElement }> = observer(({ children }) => {
  const[header, setHeader] = useState<string>('Search users');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch(location.pathname) {
      case "/admin/search-users":
        setHeader('Search users');
        break;
      case "/admin/reports":
        setHeader('Reports');
        break;
      case "/admin/verify-artists":
        setHeader('Verify artists');
        break;
    }
  }, [location.pathname]);

  return (
    <Container>
      <Helmet title={`Admin: ${header}`} />
      <AdminPanel>
        <AdminPanelButtons onClick={() => navigate('/admin/search-users')}>Go to users</AdminPanelButtons>
        <AdminPanelButtons onClick={() => navigate('/admin/reports')}>Go to reports</AdminPanelButtons>
        <AdminPanelButtons onClick={() => navigate('/admin/verify-artists')}>Go to verify artists</AdminPanelButtons>
      </AdminPanel>
      <Header>{header}</Header>
      {children}
    </Container>
  );
});