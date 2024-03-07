// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import {
//   Drawer,
//   Link,
//   LinkProps,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   useTheme,
// } from "@mui/material";
// import { mainMenu, metadata } from "../const";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import styled from "@emotion/styled";

// interface IAppIconTitle {
//   fontSize?: string;
//   iconSize?: number;
// }
// function AppIconTitle(props: IAppIconTitle) {
//   const { fontSize = "20px", iconSize = 50 } = props;
//   return (
//     <>
//       <Image
//         src={metadata.icons?.toString() || ""}
//         alt="logo"
//         width={iconSize}
//         height={iconSize}
//       />
//       <Typography
//         variant="h6"
//         noWrap
//         component="a"
//         href="/"
//         sx={{
//           mr: 2,
//           ml: 1,
//           fontFamily: "monospace",
//           fontWeight: 700,
//           color: "inherit",
//           fontSize: fontSize,
//         }}
//       >
//         {metadata.title?.toString()} (Beta)
//       </Typography>
//     </>
//   );
// }

// export default function ResponsiveAppBar() {
//   const theme = useTheme();
//   const pathname = usePathname();
//   const DesktopAppBarLink = styled(Link)(
//     (props: LinkProps & { status?: "active" | "inactive" }) => ({
//       "&:hover": {
//         backgroundColor: "rgba(0, 0, 0, 0.04)",
//       },
//       fontWeight: props.status == "active" ? "600" : "normal",
//       margin: "4px",
//       padding: "15px",
//       color: props.status == "active"
//         ? theme.palette.primary.main
//         : theme.palette.secondary.contrastText,
//       display: "block",
//     })
//   );
//   const MobileAppBarLink = styled(Link)(
//     (props: LinkProps & { status?: "active" | "inactive" }) => ({
//       color: props.status == "active"
//         ? theme.palette.primary.main
//         : theme.palette.secondary.contrastText,
//     })
//   );

//   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
//     null
//   );
//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };


//   return (
//     <AppBar position="static" color={"secondary"}>
//       <Container maxWidth="lg">
//         <Toolbar disableGutters>
//           <Box
//             sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
//           >
//             <AppIconTitle />
//           </Box>

//           <Box
//             sx={{
//               flexGrow: 1,
//               display: { xs: "flex", md: "none" },
//               maxWidth: "fit-content",
//               ml: "-10px",
//               mr: "10px",
//             }}
//           >
//             <IconButton
//               size="large"
//               aria-label="Menu"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Drawer
//               id="menu-appbar"
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: "block", md: "none" },
//               }}
//             >
//               <List>
//                 {mainMenu.map((mainMenuItem, index) => (
//                   <ListItem
//                     key={index}
//                     onClick={handleCloseNavMenu}
//                     disablePadding
//                   >
//                     <ListItemButton>
//                       <ListItemText>
//                         <MobileAppBarLink
//                           href={mainMenuItem.url}
//                           underline="none"
//                           status={pathname === mainMenuItem.url?"active":"inactive"}
//                         >
//                           {mainMenuItem.title}
//                         </MobileAppBarLink>
//                       </ListItemText>
//                     </ListItemButton>
//                   </ListItem>
//                 ))}
//               </List>
//             </Drawer>
//           </Box>

//           <Box
//             sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
//           >
//             <AppIconTitle fontSize="16px" iconSize={30} />
//           </Box>

//           <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 2 }}>
//             {mainMenu.map((mainMenuItem, index) => (
//               <DesktopAppBarLink
//                 key={index}
//                 onClick={handleCloseNavMenu}
//                 href={mainMenuItem.url}
//                 underline="none"
//                 status={pathname === mainMenuItem.url?"active":"inactive"}
//               >
//                 {mainMenuItem.title}
//               </DesktopAppBarLink>
//             ))}
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
