import { Tabs, Tab, Container } from "@mui/material";
// import Box from "@mui/material/Box";
import PeopleIcon from "@mui/icons-material/People";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";
import PublicIcon from "@mui/icons-material/Public";
import WavesIcon from "@mui/icons-material/Waves";
import StraightenIcon from "@mui/icons-material/Straighten";

import PropTypes from "prop-types";

function Navigation(props) {
  const { currentAttribute, onTabChange } = props;

  return (
    <Container sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={currentAttribute}
        aria-label="Attribute Tabs"
        onChange={onTabChange}
        variant="scrollable"
      >
        <Tab
          aria-label="Population Tab"
          value="population"
          label="Population"
          icon={<PeopleIcon />}
        />
        <Tab
          aria-label="Rotation Period Tab"
          value="rotationPeriod"
          label="Rotation Period"
          icon={<ThreeSixtyIcon />}
        />
        <Tab
          aria-label="Orbital Period Tab"
          value="orbitalPeriod"
          label="Orbital Period"
          icon={<PublicIcon />}
        />
        <Tab
          aria-label="Diameter Tab"
          value="diameter"
          label="Diameter"
          icon={<StraightenIcon />}
        />
        <Tab
          aria-label="Surface Water Tab"
          value="surfaceWater"
          label="Surface Water"
          icon={<WavesIcon />}
        />
      </Tabs>
    </Container>
  );
}

Navigation.propTypes = {
  currentAttribute: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default Navigation;
