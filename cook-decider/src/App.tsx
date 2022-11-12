import * as React from "react";
import { MantineProvider } from "@mantine/core";

import { HeaderMiddle } from "./components/Header";
import { FooterSocial } from "./components/Footer";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <HeaderMiddle links={[{ label: "Home", link: "" }]} />
      Content here
      <FooterSocial />
    </MantineProvider>
  );
}

export default App;
