import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Content from "./Content";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { List, ListItem, ListItemButton, SvgIcon } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"© "}
      <Link color="inherit" href="https://www.froystein.jp/">
        Froystein Consulting Co., Ltd
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

function SocialMediaLinks() {
  return (
    <>
      <Link color="inherit" href="https://github.com/stianfro">
        <SvgIcon component={GitHubIcon} />
      </Link>
      <Link
        color="inherit"
        href="https://www.linkedin.com/in/stian-fr%C3%B8ystein-1baa52103"
      >
        <SvgIcon component={LinkedInIcon} />
      </Link>
    </>
  );
}

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, textAlign: "center" }}>
        <Typography variant="h2" component="h2" gutterBottom>
          Froystein Consulting
        </Typography>
        <Typography variant="body1">
          We offer consultancy services for Kubernetes and Cloud Native
          technology.
        </Typography>
        <br />
        <Typography variant="h5" component="h5" align="left">
          Featured content
        </Typography>
        <Typography variant="body1">
          <List>
            <ListItem>
              <Link
                color="inherit"
                href="https://engineering.intility.com/article/guide-to-high-availability-in-kubernetes"
                target="_blank"
                rel="noopener noreferrer"
              >
                Guide to High Availability in Kubernetes
              </Link>
            </ListItem>
          </List>
        </Typography>
        <Typography variant="h5" component="h5" align="left">
          Certifications
        </Typography>
        <Typography variant="body1">
          <List>
            <ListItem>
              <Link
                color="inherit"
                href="https://www.credly.com/badges/417725b8-2350-472c-85d4-f1db952371f7/public_url"
                target="_blank"
                rel="noopener noreferrer"
              >
                Red Hat Certified OpenShift Administrator
              </Link>
            </ListItem>
            <ListItem>
              <Link
                color="inherit"
                href="https://www.credly.com/badges/2f24df96-a500-4175-b0a1-97142609c93c/public_url"
                target="_blank"
                rel="noopener noreferrer"
              >
                Red Hat Certified Engineer (RHCE)
              </Link>
            </ListItem>
            <ListItem>
              <Link
                color="inherit"
                href="https://www.credly.com/badges/12c4dcdb-2833-446e-bf69-eb0bda710d74/public_url"
                target="_blank"
                rel="noopener noreferrer"
              >
                Red Hat Certified System Administrator (RHCSA)
              </Link>
            </ListItem>
          </List>
        </Typography>
        <Content />
        <Copyright />
        <SocialMediaLinks />
      </Box>
    </Container>
  );
}
