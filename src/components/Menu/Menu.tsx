import React, {useState, useRef, useEffect} from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper, {PopperPlacementType} from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { useStyles } from "./Menu.styles";
import { MenuProps } from "./Menu.props";
import Link from "next/link";
import { IconButton } from "@material-ui/core";

const Menu = (props: MenuProps) => {
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if(event.key === "Tab" || event.key === "Escape"){
      event.preventDefault();
      setOpen(false);
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  
  useEffect(() => {
    const handleResize = () => {
      setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderMenuItem = (menuItem, index) => {
    return menuItem.url ? (
      <Link href={menuItem.url} key={index}>
        <MenuItem component="a" onClick={handleClose}>
          {menuItem.startIcon ? (<span className={classes.itemStartIcon}>{menuItem.startIcon}</span>) : null}
          {menuItem.name}
          {menuItem.endIcon ? (<span className={classes.itemEndIcon}>{menuItem.endIcon}</span>) : null}
        </MenuItem>
      </Link>
    ) : (
      <MenuItem key={index} onClick={(e) => {handleClose(e); menuItem.onClick();}}>
        {menuItem.startIcon ? (<span className={classes.itemStartIcon}>{menuItem.startIcon}</span>) : null}
        {menuItem.name}
        {menuItem.endIcon ? (<span className={classes.itemEndIcon}>{menuItem.endIcon}</span>) : null}
      </MenuItem>
    );
  };

  const anchorProps = {
    ref: anchorRef,
    "aria-controls": open ? props.id : undefined,
    "aria-haspopup": true,
    onClick: handleToggle,
    disableRipple: typeof props.disableRipple === "boolean" ? props.disableRipple : false,
    disableFocusRipple: typeof props.disableFocusRipple === "boolean" ? props.disableFocusRipple : false
  };
  if(!props.useIconButton){
    anchorProps["endIcon"] = props.endIcon ? props.endIcon : null;
    anchorProps["startIcon"] = props.startIcon ? props.startIcon : null;
  }

  return (
    <div className={classes.root} id={props.id}>
      {props.useIconButton && props.startIcon ? (
        <IconButton {...anchorProps}>
          {props.startIcon}
        </IconButton>
      ) : (
        <Button {...anchorProps}>
          {props.menuName}
        </Button>
      )}
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} disablePortal transition placement={props.placement as PopperPlacementType || "bottom-end"} className={classes.popper}>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id={props.id} onKeyDown={handleListKeyDown}>
                  {props.menuItems.map(renderMenuItem)}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default Menu;
