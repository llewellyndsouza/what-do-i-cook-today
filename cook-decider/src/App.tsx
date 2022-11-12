import * as React from "react";
import { MantineProvider, AppShell, Container, ColorSchemeProvider, ColorScheme } from "@mantine/core";

import { HeaderMiddle } from "./components/Header";
import { FooterSocial } from "./components/Footer";

function App() {
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <AppShell header={<HeaderMiddle links={[{ label: "Home", link: "" }]} />} footer={<FooterSocial />}>
          <Container fluid>Content goes here</Container>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
