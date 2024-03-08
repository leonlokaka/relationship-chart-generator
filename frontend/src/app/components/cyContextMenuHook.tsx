import { Button } from "@mui/material";
import { useEffect, useMemo, useCallback, useContext } from "react";
import {
  GlobalReducerActionType,
  GlobalReducerContext,
} from "../reducer/GlobalRecuder";
import EdgeForm from "./EdgeForm";
import NodeForm, { INodeFormInput } from "./NodeForm";
import { ICyExtensions, getUngroupBatch } from "./cyHook";
import {
  ChartEdgeFormConverter,
  ChartNodeFormConverter,
  NodeLabelPosition,
  NodeShape,
} from "../const";
import { useGlobalDialog } from "./GlobalDialog";

enum cyMenuItems {
  "connectTo" = "connectTo",
  "properties" = "properties",
  "addNode" = "addNode",
  "removeGroup" = "removeGroup",
  "remove" = "remove",
}

const cytoscape = require("cytoscape");
function useCYContextMenuHook(
  cy: cytoscape.Core | undefined,
  cyExtensions: ICyExtensions | undefined
) {
  const { state, dispatch } = useContext(GlobalReducerContext);
  const { closeDialog } = useGlobalDialog();
  useEffect(
    function onContextMenuEvent() {
      const { event, eventName } = state.cyContextMenuEvent;
      if (!event) return;
      const target = event.target || event.cyTarget;

      switch (eventName) {
        case cyMenuItems.connectTo:
          cyExtensions?.cyEdgeHandles.start(target);
          break;
        case cyMenuItems.properties:
          let dialogContent = <></>;
          if (target.is("node")) {
            const chartNodeFormConverter = new ChartNodeFormConverter(target);
            dialogContent = (
              <NodeForm
                formSubmit={(data) => {
                  chartNodeFormConverter.parseFormValue(data);
                  closeDialog();
                }}
                initValues={chartNodeFormConverter.toFormValue()}
                customButton={<Button onClick={closeDialog}>Close</Button>}
              ></NodeForm>
            );
          } else if (target.is("edge")) {
            const chartEdgeFormConverter = new ChartEdgeFormConverter(target);
            dialogContent = (
              <EdgeForm
                formSubmit={(data) => {
                  chartEdgeFormConverter.parseFormValue(data);
                  closeDialog();
                }}
                initValues={chartEdgeFormConverter.toFormValue()}
                customButton={<Button onClick={closeDialog}>Close</Button>}
              ></EdgeForm>
            );
          }
          dispatch({
            type: GlobalReducerActionType.UpdateGlobalDialog,
            payload: {
              globalDialog: {
                open: true,
                title:
                  "Node" +
                  (target.data("label") ? `[${target.data("label")}]` : ""),
                content: dialogContent,
                actions: <></>,
                showCloseBtn: false,
              },
            },
          });
          break;
        case cyMenuItems.addNode:
          const newNode = cyExtensions?.cyUndoRedo.do("add", {
            data: { position: event.position },
          });
          cy?.nodes(`#${newNode.id()}`)?.positions(event.position);
          break;
        case cyMenuItems.removeGroup:
          // parent.children().move({ parent: null });
          cyExtensions?.cyUndoRedo.do("batch", getUngroupBatch(target));
          break;
        case cyMenuItems.remove:
          cyExtensions?.cyUndoRedo.do("remove", target);

          // cyExtensions.cyMenu.showMenuItem("undo");
          break;
      }
      dispatch({
        type: GlobalReducerActionType.cyContentMenuEventTrigger,
        payload: {
          cyContextMenuEvent: {
            eventName: null,
            event: null,
          },
        },
      });
    },
    [
      closeDialog,
      cy,
      cyExtensions?.cyEdgeHandles,
      cyExtensions?.cyUndoRedo,
      dispatch,
      state.cyContextMenuEvent,
    ]
  );
  const getCYMenuItems = useMemo(
    // (cy: cytoscape.Core, cyExtensions: ICyExtensions) => [
    () => [
      {
        id: cyMenuItems.connectTo,
        content: "connect-to",
        tooltipText: "connect-to",
        selector: "node",
        coreAsWell: false,
        onClickFunction: function (event: any) {
          dispatch({
            type: GlobalReducerActionType.cyContentMenuEventTrigger,
            payload: {
              cyContextMenuEvent: {
                eventName: cyMenuItems.connectTo,
                event,
              },
            },
          });
        },
      },
      {
        id: cyMenuItems.properties,
        content: "properties",
        tooltipText: "properties",
        selector: "node, edge",
        coreAsWell: false,
        onClickFunction: function (event: any) {
          dispatch({
            type: GlobalReducerActionType.cyContentMenuEventTrigger,
            payload: {
              cyContextMenuEvent: {
                eventName: cyMenuItems.properties,
                event,
              },
            },
          });
        },
      },
      {
        id: cyMenuItems.addNode,
        content: "add node",
        tooltipText: "add node",
        selector: "",
        coreAsWell: true,
        hasTrailingDivider: true,
        onClickFunction: function (event: any) {
          dispatch({
            type: GlobalReducerActionType.cyContentMenuEventTrigger,
            payload: {
              cyContextMenuEvent: {
                eventName: cyMenuItems.addNode,
                event,
              },
            },
          });
        },
      },
      {
        id: cyMenuItems.removeGroup,
        content: "remove group",
        tooltipText: "ungroup, remove group and keep children nodes",
        selector: "node:compound",
        coreAsWell: false,
        onClickFunction: (event: any) => {
          dispatch({
            type: GlobalReducerActionType.cyContentMenuEventTrigger,
            payload: {
              cyContextMenuEvent: {
                eventName: cyMenuItems.removeGroup,
                event,
              },
            },
          });
        },
      },
      {
        id: cyMenuItems.remove,
        content: "remove",
        tooltipText: "remove",
        selector: "node:childless, edge",
        coreAsWell: false,
        onClickFunction: (event: any) => {
          dispatch({
            type: GlobalReducerActionType.cyContentMenuEventTrigger,
            payload: {
              cyContextMenuEvent: {
                eventName: cyMenuItems.remove,
                event,
              },
            },
          });
        },
      },
      // {
      //   id: "undo",
      //   content: "undo",
      //   selector: "",
      //   show: false,
      //   coreAsWell: true,
      //   onClickFunction: (event: any) => {
      //     if (removedItems) {
      //       removedItems.pop().restore();
      //       setRemovedItems(removedItems);
      //     }
      //     if (!removedItems.length) cyMenu.hideMenuItem("undo-remove");
      //   },
      // },
    ],
    [dispatch]
  );

  return { getCYMenuItems };
}

export { useCYContextMenuHook, cyMenuItems };
