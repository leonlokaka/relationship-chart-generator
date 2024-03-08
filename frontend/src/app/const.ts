import type { Metadata } from "next";
import {
  NodeStlyeType,
  edgeArrowStyle,
  edgeHandlerStyle,
  edgeStyle,
  labelStyle,
  nodeStyle,
} from "./cy-style";

const metadata: Metadata = {
  title: "Relationship Chart Generator",
  description: "",
  icons: "/logo.png",
};

interface IMainData {
  nodes: INodeData[];
  edges: IEdgeData[];
}

interface INodeData {
  data: cytoscape.NodeDataDefinition;
  classes?: cytoscape.NodeDataDefinition["classes"];
  style?: cytoscape.NodeDataDefinition["style"];
}

interface IEdgeData {
  data: cytoscape.EdgeDataDefinition;
  classes?: cytoscape.EdgeDataDefinition["classes"];
  style?: cytoscape.EdgeDataDefinition["style"];
}
const defaultData: IMainData = {
  nodes: [
    {
      data: {
        id: "cat",
        position: { x: 100, y: 40 },
        type: NodeStlyeType.triangle,
        image: "https://live.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg",
      },
    },
    {
      data: { id: "bird", position: { x: 100, y: 410 } },
    },
    { data: { id: "ladybug", label: "top center" }, classes: "top-center" },
    {
      data: { id: "g1", label: "group 1" },
      classes: "bottom-center",
    },
    {
      data: { id: "g2", label: "group 2" },
      classes: "bottom-center",
    },
    { data: { id: "rose" } },
    {
      data: { id: "grasshopper" },
    },
    { data: { id: "plant", parent: "g1" } },
    { data: { id: "wheat" } },
  ],
  edges: [
    {
      data: {
        source: "cat",
        target: "bird",
        label: "ttt",
      },
      classes: "segments",
    },
    {
      data: { source: "bird", target: "ladybug", label: "bbb" },
      classes: "taxi",
    },
    { data: { source: "ladybug", target: "bird", label: "aaa" } },
    { data: { source: "bird", target: "grasshopper", arrow: "tee" } },
    { data: { source: "grasshopper", target: "plant" } },
    // { data: { source: 'grasshopper', target: 'wheat' } },
    { data: { source: "ladybug", target: "g1" } },
    { data: { source: "g1", target: "rose" } },
  ],
};

const defaultStylesheet = [
  // {
  //   selector: "node[type]",
  //   style: {
  //     label: "data(type)",
  //   },
  // },
  {
    selector: "node",
    style: {
      height: 80,
      width: 80,
      "background-fit": "cover",
      "border-color": "#000",
      "border-width": 3,
      "border-opacity": 0.5,
    },
  },
  {
    selector: "edge",
    style: {
      "curve-style": "bezier",
      width: 6,
      "target-arrow-shape": "triangle",
      "line-color": "#ffaaaa",
      "target-arrow-color": "#ffaaaa",
    },
  },
  ...edgeArrowStyle,
  ...labelStyle,
  ...edgeStyle,
  ...nodeStyle,
  ...edgeHandlerStyle,
];

const convertCYElementsObjToMainData = (
  nodes: cytoscape.NodeSingular[],
  edges: cytoscape.EdgeSingular[]
) => {
  const temp: IMainData = {
    nodes: [],
    edges: [],
  };
  nodes.forEach((node: cytoscape.NodeSingular) => {
    temp.nodes.push({
      data: { ...node.data(), position: node.position() },

      style: node.data("image")
        ? {
            "background-image": node.data("image"),
          }
        : {},
      classes: node.classes(),
    });
  });
  edges.forEach((edge: cytoscape.EdgeSingular) => {
    temp.edges.push({
      data: edge.data(),
      // style: edge.style(),
      classes: edge.classes(),
    });
  });
  return temp;
};

export type { IMainData, INodeData, IEdgeData };
export {
  metadata,
  defaultData,
  defaultStylesheet,
  convertCYElementsObjToMainData,
};
