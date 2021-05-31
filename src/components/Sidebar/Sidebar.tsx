import React, { useState, Fragment } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useStyles } from "./Sidebar.styles";
import { useRouter } from "next/router";
import { SidebarProps } from "./Sidebar.props";

const Sidebar = (props: SidebarProps) => {
  const classes = useStyles(props);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const router = useRouter();
  const handleSubMenuClick = (index) => {
    if(index === openSubMenu)
      return setOpenSubMenu(null);

    return setOpenSubMenu(index)
  };

  const renderMenuItem = (navItem, inset=false) => {
    const onClick = navItem.onClick ? () => {
      navItem.onClick();
      props.closeSidebar();
    } : () => {
      if(navItem.url)
        router.push(navItem.url);
      props.closeSidebar();
    };
    return (
      <ListItem button className={classes.menuItem} onClick={onClick}>
        {navItem.startIcon ? navItem.startIcon : null}
        <ListItemText primary={navItem.name.toUpperCase()} inset={inset || !!navItem.startIcon} />
      </ListItem>
    );
  };

  const renderCollapsibleMenuItem = (navItem, index) => (
    <>
      <ListItem button onClick={() => handleSubMenuClick(index)} className={classes.menuItem}>
        <ListItemText primary={navItem.name.toUpperCase()} />
        <FontAwesomeIcon icon={openSubMenu === index ? faCaretUp : faCaretDown} />
      </ListItem>
      <Collapse in={openSubMenu === index} timeout="auto" unmountOnExit>
        <Divider />
        <List component="div" disablePadding>
          {navItem.navigationItems.map((subItem, index) => (
            <Fragment key={index}>
              {renderMenuItem(subItem, true)}
            </Fragment>
          ))}
        </List>
      </Collapse>
    </>
  );

  return (
    <Drawer open={props.isOpen} onClose={props.onClose} classes={{root: classes.drawerRoot, paper: classes.drawerPaper}}>
      <List component="nav" className={classes.sidebarMenu} disablePadding>
        {props.navigationItems.map((navItem, index) => (
          <Fragment key={index}>
            {navItem.navigationItems && navItem.navigationItems.length ? (
              renderCollapsibleMenuItem(navItem, index)
            ) : (
              renderMenuItem(navItem)
            )}
          </Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
