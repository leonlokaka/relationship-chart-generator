"use client";

import CytoscapeComponent from "react-cytoscapejs";
import { Box, BoxProps, Button, Fab, SxProps, Zoom } from "@mui/material";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import UpIcon from "@mui/icons-material/KeyboardArrowUp";

import { DecorationRectangle, SwiperBackground } from "./components/Common";
import {
  IMainData,
  INodeData,
  convertCYElementsObjToMainData,
  defaultData,
  defaultStylesheet,
} from "./const";
import { useCookies } from "react-cookie";

import "cytoscape-context-menus/cytoscape-context-menus.css";
import {
  GlobalReducerActionType,
  GlobalReducerContext,
} from "./reducer/GlobalRecuder";
import NodeForm from "./components/NodeForm";

const cytoscape = require("cytoscape");
const edgehandles = require("cytoscape-edgehandles");
const compoundDragAndDrop = require("cytoscape-compound-drag-and-drop");
// register extension
cytoscape.use(edgehandles);
cytoscape.use(compoundDragAndDrop);

export default function Home() {
  const [chartElements, setChartElements] = useState<IMainData>({
    nodes: [],
    edges: [],
  });
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [isAutoSetPosition, setIsAutoSetPosition] = useState<boolean>(false);
  const [cy, setCY] = useState<cytoscape.Core | null>();
  const [cyMenu, setCYMenu] = useState<any>();
  const [cyEdgeHandles, setCYEdgeHandles] = useState<any>();
  const [removedItems, setRemovedItems] = useState<any[]>([]);

  const { state, dispatch } = useContext(GlobalReducerContext);

  const [cookies, setCookie, removeCookie] = useCookies(["data"]);

  const triggerClose = useCallback(
    function triggerClose() {
      dispatch({
        type: GlobalReducerActionType.UpdateGlobalDialog,
        payload: {
          globalDialog: { open: false },
        },
      });
      state.globalDialog.handleClose();
    },
    [dispatch, state.globalDialog]
  );

  const getCYMenuItems = useCallback(
    (cy: cytoscape.Core, cyMenu: any, cyeh: any) => [
      {
        id: "connect-to",
        content: "connect-to",
        tooltipText: "connect-to",
        selector: "node",
        coreAsWell: false,
        onClickFunction: function (event: any) {
          const target = event.target || event.cyTarget;
          cyeh.start(target);
        },
      },
      {
        id: "properties",
        content: "properties",
        tooltipText: "properties",
        selector: "node, edge",
        coreAsWell: false,
        onClickFunction: function (event: any) {
          const target: cytoscape.NodeSingular = event.target || event.cyTarget;
          dispatch({
            type: GlobalReducerActionType.UpdateGlobalDialog,
            payload: {
              globalDialog: {
                open: true,
                title: target.data().label,
                content: (
                  <NodeForm
                    formSubmit={(data) => {
                      triggerClose();
                      target.data().label = data.label
                    }}
                    initValues={{ label: target.data().label }}
                  >
                    <Button onClick={triggerClose}>Close</Button>
                  </NodeForm>
                ),
                actions: <></>,
              },
            },
          });
        },
      },
      {
        id: "add-node",
        content: "add node",
        tooltipText: "add node",
        selector: "",
        coreAsWell: true,
        hasTrailingDivider: true,
        onClickFunction: function (event: any) {
          console.log("add node", event);
          const newNode = cy.add({
            data: { position: event.position },
          });
          cy.nodes("#" + newNode.id())?.positions(event.position);
        },
      },
      {
        id: "remove group",
        content: "remove group",
        tooltipText: "ungroup, remove group and keep children nodes",
        selector: "node:compound",
        coreAsWell: false,
        onClickFunction: (event: any) => {
          const parent = event.target;
          parent.children().move({ parent: null });
          parent.remove();
        },
      },
      {
        id: "remove",
        content: "remove",
        tooltipText: "remove",
        selector: "node:childless, edge",
        coreAsWell: false,
        onClickFunction: (event: any) => {
          var target = event.target || event.cyTarget;
          console.log("xxxxxxxxxxxx", cy, cyMenu, target);
          removedItems.push(target.remove());
          setRemovedItems(removedItems);
          cyMenu.showMenuItem("undo-remove");
        },
      },
      {
        id: "undo-remove",
        content: "undo remove",
        selector: "",
        show: false,
        coreAsWell: true,
        onClickFunction: (event: any) => {
          if (removedItems) {
            removedItems.pop().restore();
            setRemovedItems(removedItems);
          }
          if (!removedItems.length) cyMenu.hideMenuItem("undo-remove");
        },
      },
    ],
    [dispatch, removedItems, triggerClose]
  );

  const cyMenuOptions = useMemo<any>(
    () => ({
      evtType: "cxttap",
      menuItems: [],
      // css classes that menu items will have
      menuItemClasses: [
        // add class names to this list
      ],
      // css classes that context menu will have
      contextMenuClasses: [
        // add class names to this list
      ],
      // Indicates that the menu item has a submenu. If not provided default one will be used
      // submenuIndicator: { src: 'assets/submenu-indicator-default.svg', width: 12, height: 12 }
    }),
    []
  );
  const init = useCallback(
    function init() {
      let data: IMainData;
      if (cookies.data) data = cookies.data;
      else data = defaultData;
      data.nodes.forEach((node: INodeData) => {
        if (node.data.image)
          node.style = {
            "background-image": node.data.image,
          };
      });
      setChartElements(data);
    },
    [cookies.data, setChartElements]
  );

  useEffect(init, []);

  useEffect(
    function loadChart() {
      if (!isLoaded) {
        // setTimeout(() => {
        setLoaded(true);
        // });
      }
    },
    [init, isLoaded]
  );

  function reloadChart() {
    init();
    setLoaded(false);
    setCY(null);
  }
  // init cy
  const cyReady = useCallback(
    (cyCore: any) => {
      console.log(cyCore, chartElements);
      if (!cy) {
        const contextMenus = require("cytoscape-context-menus");
        contextMenus(cytoscape);
        const cyMenu = cyCore.contextMenus(cyMenuOptions);
        console.log("aaaaa", contextMenus);
        console.log("bbbbbbbbbbbb", cyMenu);
        const cyeh = cyCore.edgehandles({});
        setCYEdgeHandles(cyeh);

        cyMenu.appendMenuItems(getCYMenuItems(cyCore, cyMenu, cyeh));
        setCYMenu(cyMenu);
        // eh.enable();
        // cyCore.enableDrawMode();
        // eh.start( sourceNode )

        const cdnd = cyCore.compoundDragAndDrop({
          overThreshold: -20,
          outThreshold: 100,
        });

        cyCore.fit();
        setCY(cyCore);
      }
    },
    [chartElements, cy, getCYMenuItems, cyMenuOptions]
  );

  const autoSetPosition = useCallback(function r() {
    setIsAutoSetPosition(true);
    reloadChart();
  }, []);

  useEffect(
    function cyLoaded() {
      if (!cy) return;

      // Setup position from data
      if (isAutoSetPosition) {
        chartElements.nodes.forEach((node) => {
          delete node.data.position;
        });
        // cy.nodes().forEach((node) => {
        //   delete node.data.position
        // })
        setIsAutoSetPosition(false);
      } else
        cy.nodes().forEach((node: cytoscape.NodeSingular, i: number) => {
          const id = node.id();
          const position: cytoscape.Position | undefined =
            chartElements.nodes.find((e: any) => e.data.id == id)?.data
              .position;
          console.log(id, position, chartElements);
          if (position) node.position(position);
        });

      // Update data position when user drag
      // cy.on("dragfree", "node", function (e: any) {
      //   const nodes = cy.nodes().jsons();
      //   console.log(nodes);
      //   const e2 = chartElements;
      //   nodes.forEach((node: any) => {
      //     const targetData = e2.nodes.find(
      //       (e: any) => e.data.id == node.data.id
      //     );
      //     if (targetData) targetData.data.position = node.position;
      //   });
      //   setChartElements(e2);
      // });
    },
    [cy, isAutoSetPosition, chartElements, setCookie]
  );

  const save = useCallback(
    function save() {
      if (!cy) return;

      const newChartElements: IMainData = convertCYElementsObjToMainData(
        cy.nodes().toArray(),
        cy.edges().toArray()
      );
      console.log(newChartElements);
      const dataStr = JSON.stringify(newChartElements);
      setCookie("data", dataStr);
      setChartElements(newChartElements);
    },
    [cy, setCookie]
  );

  const test = useCallback(
    function test() {
      console.log(cy);
      console.log(chartElements.nodes.length);
      const e2 = chartElements;
      e2.edges.push({ data: { source: "grasshopper", target: "wheat" } });
      setChartElements(e2);
      reloadChart();
    },
    [cy, chartElements]
  );

  return (
    <>
      <Button onClick={test}>Test</Button>
      <Button onClick={save}>Save</Button>
      <Button
        onClick={() => {
          cy?.fit();
        }}
      >
        Fit to screen
      </Button>
      <Button onClick={reloadChart}>Reload</Button>
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
          // autounselectify={true}
          cy={cyReady}
          layout={{
            // name: 'circle',
            name: "breadthfirst",
            directed: true,
            padding: 10,
          }}
          // toJson={toJson}
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
