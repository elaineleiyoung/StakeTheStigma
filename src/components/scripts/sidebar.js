import React from 'react';
import { ProSidebarProvider, Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

function App() {
  // const { collapseSidebar } = useProSidebar();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        content: '""',
      },
    },
  }));
  
  return (
    <ProSidebarProvider>
      <div style={{ display: 'flex'}}>
        <Sidebar>
        <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            style={{ position: 'relative', left: '100px' }}
        >
        <Avatar alt="Elaine Leiyoung" src="/static/images/avatar/1.jpg" />
        </StyledBadge>
          <Menu>
            <MenuItem> My Account </MenuItem>
            <SubMenu label="My Articles">
              <MenuItem> Saved Articles </MenuItem>
            </SubMenu>
            <MenuItem> Insights </MenuItem>
            <MenuItem> About Us </MenuItem>
          </Menu>
        </Sidebar>
        {/* <main>
          <button onClick={() => collapseSidebar()}>Collapse</button>
        </main> */}
      </div>
    </ProSidebarProvider>
  );
}

export default App;
