import { Button, DialogContentText } from "@mui/material";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  INodeData,
  IMainData,
  convertCYElementsObjToMainData,
  defaultData,
} from "../const";
import {
  GlobalReducerActionType,
  GlobalReducerContext,
} from "../reducer/GlobalRecuder";
import EdgeForm from "./EdgeForm";
import NodeForm from "./NodeForm";
import { useEventListener } from "./hook";
import { useCookies } from "react-cookie";

import "cytoscape-context-menus/cytoscape-context-menus.css";
import { cyMenuItems, useCYContextMenuHook } from "./cyContextMenuHook";
import lodash from "lodash";
import { useGlobalDialog } from "./GlobalDialog";

type ICyExtensions = {
  cyMenu: any;
  cyEdgeHandles: any;
  cyUndoRedo: any;
  cyCompoundDragAndDrop: any;
};

const cytoscape = require("cytoscape");
const edgehandles = require("cytoscape-edgehandles");
const compoundDragAndDrop = require("cytoscape-compound-drag-and-drop");
const undoRedo = require("cytoscape-undo-redo");

// register extension
cytoscape.use(edgehandles);
cytoscape.use(compoundDragAndDrop);
undoRedo(cytoscape);
const getUngroupBatch = (group: cytoscape.NodeSingular) => [
  {
    name: "changeParent",
    param: {
      nodes: group.children(),
      parentData: null,
      posDiffX: 0,
      posDiffY: 0,
    },
  },
  {
    name: "remove",
    param: group,
  },
];

function useCYHook() {
  const [savedChartElements, setSavedChartElements] = useState<IMainData>({
    nodes: [],
    edges: [],
  });
  const [chartElements, setChartElements] = useState<IMainData>({
    nodes: [],
    edges: [],
  });
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [isAutoSetPosition, setIsAutoSetPosition] = useState<boolean>(false);
  const [cy, setCY] = useState<cytoscape.Core | undefined>();
  const [cyExtensions, setCYExtensions] = useState<ICyExtensions>();

  const { state, dispatch } = useContext(GlobalReducerContext);
  const [cookies, setCookie, removeCookie] = useCookies([
    "data",
    "pan",
    "zoom",
  ]);

  const { getCYMenuItems } = useCYContextMenuHook(cy, cyExtensions);
  const { closeDialog } = useGlobalDialog();

  const init = useCallback(
    function init() {
      let data: IMainData;

      if (savedChartElements.nodes.length) {
        setChartElements(lodash.cloneDeep(savedChartElements));
        return;
      }
      if (cookies.data) data = cookies.data;
      else data = defaultData;

      setSavedChartElements(lodash.cloneDeep(data));
      setChartElements(lodash.cloneDeep(data));
    },
    [cookies.data, savedChartElements, setChartElements, setSavedChartElements]
  );
  useEffect(init, []);

  const saveSnapshotChartElements = useCallback(
    function saveSnapshotChartElements() {
      if (!cy) return;

      console.log("saveSnapshotChartElements", cy.nodes().toArray());
      const newChartElements: IMainData = convertCYElementsObjToMainData(
        cy.nodes().toArray(),
        cy.edges().toArray()
      );

      setChartElements(newChartElements);
      return newChartElements;
    },
    [cy]
  );

  const save = useCallback(
    function save() {
      const newChartElements: IMainData | undefined =
        saveSnapshotChartElements();
      if (newChartElements) {
        const dataStr = JSON.stringify(newChartElements);
        setCookie("data", dataStr);
        setCookie("pan", cy?.pan());
        setCookie("zoom", cy?.zoom());
        setSavedChartElements(lodash.cloneDeep(newChartElements));
      }
    },
    [cy, saveSnapshotChartElements, setCookie]
  );

  const refreshChart = useCallback(
    function refreshChart() {
      saveSnapshotChartElements();
      setLoaded(false);
      setCY(undefined);
    },
    [saveSnapshotChartElements]
  );

  const reloadChart = useCallback(
    function reloadChart() {
      // Show reminder
      dispatch({
        type: GlobalReducerActionType.UpdateGlobalDialog,
        payload: {
          globalDialog: {
            open: true,
            title: "Alert",
            content: (
              <DialogContentText>
                All unsave changes and work history will be lost.
              </DialogContentText>
            ),
            actions: (
              <Button
                onClick={() => {
                  init();
                  setCY(undefined);
                  setLoaded(false);
                  closeDialog();
                }}
              >
                Confirm
              </Button>
            ),
          },
        },
      });
    },
    [closeDialog, dispatch, init]
  );

  const autoSetPosition = useCallback(
    function autoSetPosition() {
      // Show reminder
      dispatch({
        type: GlobalReducerActionType.UpdateGlobalDialog,
        payload: {
          globalDialog: {
            open: true,
            title: "Alert",
            content: (
              <DialogContentText>
                All unsave changes and work history will be lost.
              </DialogContentText>
            ),
            actions: (
              <Button
                onClick={() => {
                  setIsAutoSetPosition(true);
                  refreshChart();
                  closeDialog();
                }}
              >
                Confirm
              </Button>
            ),
          },
        },
      });
    },
    [closeDialog, dispatch, refreshChart]
  );

  useEffect(
    function loadChart() {
      if (!isLoaded) {
        setLoaded(true);
      }
    },
    [isLoaded]
  );

  const handler = (e: KeyboardEvent) => {
    if (cyExtensions?.cyUndoRedo)
      if (e.key === "Delete") {
        var selecteds = cy?.$(":selected");
        if (selecteds && selecteds.length > 0) {
          const batchActions = [];
          for (let i = 0; i < selecteds.length; i++) {
            const selected = selecteds[i];
            if (selected.is("node:parent"))
              batchActions.push(...getUngroupBatch(selected));
            else batchActions.push({ name: "remove", param: selected });
          }
          cyExtensions.cyUndoRedo.do("batch", batchActions);
        }
      } else if (e.ctrlKey)
        if (e.key === "z") cyExtensions.cyUndoRedo.undo();
        else if (e.key === "y") cyExtensions.cyUndoRedo.redo();
  };
  useEventListener("keydown", handler);

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

  // init cy
  const cyReady = useCallback(
    (cyCore: any) => {
      console.log(cyCore, chartElements);
      if (!cy) {
        console.log("cyReady, loading cy");
        const cyEdgeHandles = cyCore.edgehandles({});

        var undoRedoOptions = {
          isDebug: true, // Debug mode for console messages
          // actions: {},
          undoableDrag: true,
          stackSizeLimit: 50,
          // ready: function () { }
        };
        const cyUndoRedo = cyCore.undoRedo(undoRedoOptions); // Can also be set whenever wanted.

        const cyCompoundDragAndDrop = cyCore.compoundDragAndDrop({
          overThreshold: -20,
          outThreshold: 100,
        });

        const contextMenus = require("cytoscape-context-menus");
        contextMenus(cytoscape);
        const cyMenu = cyCore.contextMenus(cyMenuOptions);

        const newCyExtensions = {
          cyMenu,
          cyEdgeHandles,
          cyUndoRedo,
          cyCompoundDragAndDrop,
        };
        cyMenu.appendMenuItems(getCYMenuItems);
        if (cookies.pan) cyCore.pan(cookies.pan);
        if (cookies.zoom) cyCore.zoom(cookies.zoom);
        setCY(cyCore);
        setCYExtensions(newCyExtensions);
      }
    },
    [chartElements, cy, getCYMenuItems, cyMenuOptions]
  );

  useEffect(
    function cyLoaded() {
      if (!cy) return;

      // Setup position from data
      if (isAutoSetPosition) {
        chartElements.nodes.forEach((node) => {
          delete node.data.position;
        });
        setIsAutoSetPosition(false);
        cy.fit();
      } else
        cy.nodes().forEach((node: cytoscape.NodeSingular, i: number) => {
          const id = node.id();
          const position: cytoscape.Position | undefined =
            chartElements.nodes.find((e: any) => e.data.id == id)?.data
              .position;
          console.log(id, position, chartElements);
          if (position) node.position(position);
        });

      cy.on("dbltap", "node, edge", function (event: any) {
        dispatch({
          type: GlobalReducerActionType.cyContentMenuEventTrigger,
          payload: {
            cyContextMenuEvent: {
              eventName: cyMenuItems.properties,
              event,
            },
          },
        });
      });

      // Update data position when user drag
      // cy.on("dragfree", "node", function (e: any) {
      //   const nodes = cy.nodes().jsons();
      //   console.log(nodes);
      //   nodes.forEach((node: any) => {
      //     const targetData = chartElements.nodes.find(
      //       (e: any) => e.data.id == node.data.id
      //     );
      //     if (targetData) targetData.data.position = node.position;
      //   });
      //   setChartElements(chartElements);
      // });
    },
    [cy, isAutoSetPosition, chartElements, setCookie, dispatch]
  );

  return {
    savedChartElements,
    setSavedChartElements,
    setChartElements,
    save,
    cy,
    reloadChart,
    refreshChart,
    autoSetPosition,
    isLoaded,
    chartElements,
    cyReady,
  };
}

export type { ICyExtensions };
export { useCYHook, getUngroupBatch };
