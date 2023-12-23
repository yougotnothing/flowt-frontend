import { FC, ReactElement, useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import { 
  Container,
  AdminPanel,
  AdminPanelButtons,
  Header
} from "./Admin.styled";
import { useNavigate, useLocation } from "react-router-dom";

export const Admin: FC<{ children?: ReactElement }> = observer(({ children }) => {
  const[header, setHeader] = useState<string>('Search users');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === '/admin/reports') {
      setHeader('Reports');
    }else{
      setHeader('Search users');
    }
  }, [location.pathname]);

  return (
    <Container>
      <AdminPanel>
        <AdminPanelButtons onClick={() => navigate('/admin/search-users')}>Go to users</AdminPanelButtons>
        <AdminPanelButtons onClick={() => navigate('/admin/reports')}>Go to reports</AdminPanelButtons>
      </AdminPanel>
      <Header>{header}</Header>
      {children}
    </Container>
  );
});