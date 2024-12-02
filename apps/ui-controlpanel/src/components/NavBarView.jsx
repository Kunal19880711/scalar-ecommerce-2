import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import deepPurple from "@mui/material/colors/deepPurple";
import Drawer from "@mui/material/Drawer";

import Paths from "../constants/Paths";
import l10n from "../constants/l10n";

const NavBarView = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const pages = [
    { title: l10n.NAV_BAR_PAGE_MICROSERVICE, path: Paths.MicroServices },
    { title: l10n.NAV_BAR_PAGE_ADMIN_USERS, path: Paths.AdminUser },
  ];
  const settings = [
    {
      title: l10n.NAV_BAR_SETTING_PROFILE,
      action: () => navigate(Paths.Profile),
    },
    { title: l10n.NAV_BAR_SETTING_LOGOUT, action: onLogout },
  ];

  const [showLeftPanel, setLeftPanel] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(false);
  const shortName = (user.name || "")
    .split(" ")
    .map((s) => s[0].toUpperCase())
    .join("");

  const openLeftPanel = () => {
    setShowRightPanel(false);
    setLeftPanel(true);
  };
  const closeLeftPanel = () => setLeftPanel(false);
  const openRightPanel = () => {
    setLeftPanel(false);
    setShowRightPanel(true);
  };
  const closeRightPanel = () => setShowRightPanel(false);

  const pagesOnTitle = pages.map((page) => (
    <Button
      key={page.title}
      onClick={() => navigate(page.path)}
      sx={{
        ml: 1,
        display: "block",
        color: "white",
        fontWeight: 600,
        textDecoration: "none",
      }}
    >
      {page.title}
    </Button>
  ));
  const pagesOnLeftPanel = pages.map((page) => (
    <Button
      key={page.title}
      onClick={() => navigate(page.path)}
      sx={{
        ml: 1,
        fontWeight: 600,
        textDecoration: "none",
      }}
    >
      {page.title}
    </Button>
  ));

  const settingsOnRightPanel = settings.map((setting) => (
    <Button
      key={setting.title}
      onClick={setting.action}
      sx={{
        ml: 1,
        fontWeight: 600,
        textDecoration: "none",
      }}
    >
      {setting.title}
    </Button>
  ));

  return (
    <>
      <AppBar
        position="fixed"
        component="nav"
        sx={{
          zIndex: 1400,
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              justifyContent: "flex-start",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={openLeftPanel}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Control Panel logo"
            sx={{
              display: "flex",
              p: 0.5,
            }}
          >
            <img
              src="/vite.svg"
              alt="Control Panel"
              style={{ width: "2em", height: "2em" }}
            />
          </IconButton>
          <Typography
            variant="subtitle1"
            noWrap
            component="header"
            sx={{
              ml: 1,
              display: "flex",
              flexGrow: { xs: 1, md: 0 },
              fontSize: "1.2em",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {l10n.APP_NAME}
          </Typography>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              ml: 2,
            }}
          >
            {pagesOnTitle}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={l10n.NAV_BAR_TOOLTIP_OPEN_SETTINGS}>
              <IconButton onClick={openRightPanel} sx={{ p: 0 }}>
                <Avatar alt={user.name} sx={{ bgcolor: deepPurple[500] }}>
                  {shortName}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={showLeftPanel}
        onClose={closeLeftPanel}
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            mt: 2,
            backgroundColor: "background.default",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
          onClick={closeLeftPanel}
        >
          {pagesOnLeftPanel}
        </Box>
      </Drawer>
      <Drawer
        anchor="right"
        open={showRightPanel}
        onClose={closeRightPanel}
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            mt: 2,
            backgroundColor: "background.default",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
          onClick={closeRightPanel}
        >
          {settingsOnRightPanel}
        </Box>
      </Drawer>
    </>
  );
};

export default NavBarView;
