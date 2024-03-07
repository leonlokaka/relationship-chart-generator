// import * as React from "react";
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
// import { Divider, Grid, Stack } from "@mui/material";
// import { metadata, socialLinkages } from "../const";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="left">
//       {"Copyright © "}
//       Toronto Neighborhood Map {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// export default function Footer() {
//   return (
//     <Box component="footer" sx={{ bgcolor: "background.paper", py: 4 }}>
//       <Container maxWidth="lg">
//         <Grid container>
//           <Grid item xs={12} md={8} sx={{ mb: 2 }}>
//             <Typography variant="h6" align="left" gutterBottom>
//               {metadata.title?.toString()}
//             </Typography>
//             <Typography color="text.secondary" component="p">
//               Data Source: City of Toronto Open Data
//             </Typography>
//             <Typography color="text.secondary" component="p">
//               Contains information licensed under the
//             </Typography>
//             <Typography color="text.secondary" component="p">
//               <Link
//                 href="https://open.toronto.ca/open-data-license/"
//                 target="_blank"
//               >
//                 Open Government Licence – Toronto
//               </Link>
//             </Typography>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Typography variant="h6" gutterBottom>
//               About
//             </Typography>
//             {socialLinkages.map((item) => (
//               <Link
//                 key={item.name}
//                 display="block"
//                 variant="body1"
//                 href={item.link}
//                 sx={{ mb: 0.5, colorBarWidth: "fit-content" }}
//                 target="_blank"
//                 underline="none"
//               >
//                 <Stack direction="row" spacing={1} alignItems="center">
//                   <item.icon />
//                   <span>{item.name}</span>
//                 </Stack>
//               </Link>
//             ))}
//           </Grid>
//         </Grid>
//         <Divider sx={{ mt: 2, mb: 1 }} />
//         <Copyright />
//       </Container>
//     </Box>
//   );
// }
