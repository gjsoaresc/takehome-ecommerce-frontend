import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import MenuIcon from '@mui/icons-material/Menu'
import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import { alpha, styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '~/contexts/AuthContext'

import ColorModeIconDropdown from './ColorModeIconDropdown'
import Sitemark from './SitemaskIcon'

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: '8px 12px',
}))

export default function AppBar() {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, logout, user } = useAuth()

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  return (
    <MuiAppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Sitemark />
            </Link>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button
                component={Link}
                to="/"
                variant="text"
                color="info"
                size="small"
              >
                Products
              </Button>
              <Button
                component={Link}
                to="/cart"
                variant="text"
                color="info"
                size="small"
              >
                Cart
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            {isAuthenticated ? (
              <>
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  onClick={logout}
                >
                  {user?.name}
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/auth/signin"
                  color="primary"
                  variant="text"
                  size="small"
                >
                  Sign in
                </Button>
                <Button
                  component={Link}
                  to="/auth/signup"
                  color="primary"
                  variant="contained"
                  size="small"
                >
                  Sign up
                </Button>
              </>
            )}
            <ColorModeIconDropdown />
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                {isAuthenticated ? (
                  <>
                    <MenuItem>{user?.name}</MenuItem>
                    <Divider sx={{ my: 3 }} />
                    <MenuItem
                      onClick={() => {
                        logout()
                        toggleDrawer(false)()
                      }}
                    >
                      <Button color="primary" variant="outlined" fullWidth>
                        Logout
                      </Button>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem onClick={toggleDrawer(false)}>
                      <Button
                        component={Link}
                        to="/products"
                        variant="text"
                        color="info"
                        fullWidth
                      >
                        Products
                      </Button>
                      <Button
                        component={Link}
                        to="/cart"
                        variant="text"
                        color="info"
                        fullWidth
                      >
                        Cart
                      </Button>
                    </MenuItem>
                    <Divider sx={{ my: 3 }} />
                    <MenuItem onClick={toggleDrawer(false)}>
                      <Button
                        component={Link}
                        to="/auth/signup"
                        color="primary"
                        variant="contained"
                        fullWidth
                      >
                        Sign up
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={toggleDrawer(false)}>
                      <Button
                        component={Link}
                        to="/auth/signin"
                        color="primary"
                        variant="outlined"
                        fullWidth
                      >
                        Sign in
                      </Button>
                    </MenuItem>
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </MuiAppBar>
  )
}
