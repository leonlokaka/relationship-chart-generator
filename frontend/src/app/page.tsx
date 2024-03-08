"use client";

import CytoscapeComponent from "react-cytoscapejs";
import { Button, Fab, Zoom } from "@mui/material";
import { useCallback, useEffect } from "react";

import UpIcon from "@mui/icons-material/KeyboardArrowUp";

import { IMainData, defaultData, defaultStylesheet } from "./const";
import { useCookies } from "react-cookie";

import lodash from "lodash";
import { useCYHook } from "./components/cyHook";

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(["data"]);

  const {
    save,
    cy,
    reloadChart,
    refreshChart,
    autoSetPosition,
    isLoaded,
    chartElements,
    cyReady,
  } = useCYHook();

  return (
    <>
      <Button onClick={save}>Save</Button>
      <Button
        onClick={() => {
          cy?.fit();
        }}
      >
        Fit to screen
      </Button>
      <Button onClick={reloadChart}>Reload</Button>
      <Button onClick={refreshChart}>Refresh</Button>
      <Button onClick={autoSetPosition}>Auto Set Position</Button>
      {isLoaded && (
        <CytoscapeComponent
          elements={[...chartElements.nodes, ...chartElements.edges]}
          wheelSensitivity={0.1}
          stylesheet={defaultStylesheet as any}
          style={{
            border: "solid 1px black",
            width: "80vw",
            height: "600px",
            margin: "2vh 5vw",
          }}
          cy={cyReady}
          layout={{
            // name: 'circle',
            name: "breadthfirst",
            directed: true,
            padding: 10,
          }}
        />
      )}
      <Zoom>
        <Fab
          aria-label="go-to-top"
          color="primary"
          sx={{
            position: "absolute",
            right: "10px",
            bottom: "10px",
            width: "50px",
            height: "50px",
            zIndex: 100,
          }}
          onClick={() => {}}
        >
          <UpIcon />
        </Fab>
      </Zoom>
    </>
  );
}
