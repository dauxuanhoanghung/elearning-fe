import { ClickAwayListener, Grow, MenuList, Paper, Popper } from "@mui/material";

const ScrollAway = ({ children, open, anchorElement, onClickAway }) => {
  return <>
    <Popper open={open} anchorEl={anchorElement} transition disablePortal>
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
          <Paper>
            <ClickAwayListener onClickAway={onClickAway}>
              <MenuList autoFocusItem={open} id='menu-list-grow'>{children}</MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  </>
}

export default ScrollAway;