import type { Metadata } from "next";
import {
  NodeShape,
  edgeArrowStyle,
  edgeHandlerStyle,
  edgeStyle,
  labelStyle,
  nodeStyle,
} from "./cy-style";
import { INodeFormInput } from "./components/NodeForm";
import { IEdgeFormInput } from "./components/EdgeForm";

const metadata: Metadata = {
  title: "Relationship Chart Generator",
  description: "",
  icons: "/logo.png",
};

interface IMainData {
  nodes: INodeData[];
  edges: IEdgeData[];
}

enum NodeShape {
  "ellipse" = "ellipse",
  "triangle" = "triangle",
  "round-triangle" = "round-triangle",
  "rectangle" = "rectangle",
  "round-rectangle" = "round-rectangle",
  "bottom-round-rectangle" = "bottom-round-rectangle",
  "cut-rectangle" = "cut-rectangle",
  "barrel" = "barrel",
  "rhomboid" = "rhomboid",
  "right-rhomboid" = "right-rhomboid",
  "diamond" = "diamond",
  "round-diamond" = "round-diamond",
  "pentagon" = "pentagon",
  "round-pentagon" = "round-pentagon",
  "hexagon" = "hexagon",
  "round-hexagon" = "round-hexagon",
  "concave-hexagon" = "concave-hexagon",
  "heptagon" = "heptagon",
  "round-heptagon" = "round-heptagon",
  "octagon" = "octagon",
  "round-octagon" = "round-octagon",
  "star" = "star",
  "tag" = "tag",
  "round-tag" = "round-tag",
  "vee" = "vee",
}

enum NodeLabelPosition {
  "top-left" = "top left",
  "top-center" = "top center",
  "top-right" = "top right",
  "center-left" = "center left",
  "center-center" = "center center",
  "center-right" = "center right",
  "bottom-left" = "bottom left",
  "bottom-center" = "bottom center",
  "bottom-right" = "bottom right",
}

enum EdgeStyle {
  "bezier" = "bezier",
  "unbundled-bezier" = "unbundled-bezier",
  "multi-unbundled-bezier" = "multi-unbundled-bezier",
  "haystack" = "haystack",
  "segments" = "segments",
  "taxi" = "taxi",
  "straight-triangle" = "straight-triangle",
}

enum EdgeArrow {
  "triangle" = "triangle",
  "triangle-tee" = "triangle-tee",
  "circle-triangle" = "circle-triangle",
  "triangle-cross" = "triangle-cross",
  "triangle-backcurve" = "triangle-backcurve",
  "vee" = "vee",
  "tee" = "tee",
  "square" = "square",
  "circle" = "circle",
  "diamond" = "diamond",
  "chevron" = "chevron",
  "none" = "none",
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
        type: NodeShape.triangle,
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
      width: 6,
      "curve-style": "bezier",
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

interface ChartItemFormConverter<T, I> {
  target: T;
  toFormValue: () => I;
  parseFormValue: (data: I) => T;
}
class ChartNodeFormConverter
  implements ChartItemFormConverter<cytoscape.NodeSingular, INodeFormInput>
{
  target: cytoscape.NodeSingular;

  constructor(target: cytoscape.NodeSingular) {
    this.target = target;
  }

  toFormValue = () => {
    const data: INodeFormInput = { label: this.target.data("label") };
    const labelPositionList: string[] = Object.keys(NodeLabelPosition);
    const nodeShapeList: string[] = Object.keys(NodeShape);

    if (nodeShapeList.indexOf(this.target.data("type")))
      data.nodeShape = this.target.data("type");

    if (this.target.data("labelColor"))
      data.labelColor = this.target.data("labelColor");
    if (this.target.data("backgroundColor"))
      data.backgroundColor = this.target.data("backgroundColor");
    if (this.target.data("borderColor"))
      data.borderColor = this.target.data("borderColor");

    this.target.classes().forEach((className: string) => {
      const labelPosition = labelPositionList.find((val) => val == className);
      if (labelPosition) data.labelPosition = labelPosition;
    });

    return data;
  };

  parseFormValue = (data: INodeFormInput) => {
    this.target.data("label", data.label);
    const classesList = [];
    if (data.labelPosition) classesList.push(data.labelPosition);
    this.target.classes(classesList);

    if (data.labelColor) this.target.data("labelColor", data.labelColor);
    if (data.backgroundColor)
      this.target.data("backgroundColor", data.backgroundColor);
    if (data.borderColor) this.target.data("borderColor", data.borderColor);
    if (data.nodeShape) this.target.data("type", data.nodeShape);
    return this.target;
  };
}
class ChartEdgeFormConverter
  implements ChartItemFormConverter<cytoscape.EdgeSingular, IEdgeFormInput>
{
  target: cytoscape.EdgeSingular;

  constructor(target: cytoscape.EdgeSingular) {
    this.target = target;
  }

  toFormValue = () => {
    const data: IEdgeFormInput = { label: this.target.data("label") };
    const lineStyleList: string[] = Object.keys(EdgeStyle);
    const arrowTypeList: string[] = Object.keys(EdgeArrow);

    if (arrowTypeList.indexOf(this.target.data("arrowType")))
      data.arrowType = this.target.data("arrowType");

    if (this.target.data("labelColor"))
      data.labelColor = this.target.data("labelColor");
    if (this.target.data("lineColor"))
      data.lineColor = this.target.data("lineColor");

    this.target.classes().forEach((className: string) => {
      const lineStyle = lineStyleList.find((val) => val == className);
      if (lineStyle) data.lineStyle = lineStyle;
    });

    return data;
  };

  parseFormValue = (data: IEdgeFormInput) => {
    this.target.data("label", data.label);
    const classesList = [];
    if (data.lineStyle) classesList.push(data.lineStyle);
    this.target.classes(classesList);

    if (data.labelColor) this.target.data("labelColor", data.labelColor);
    if (data.lineColor) this.target.data("lineColor", data.lineColor);
    if (data.arrowType) this.target.data("arrowType", data.arrowType);
    return this.target;
  };
}
export type { IMainData, INodeData, IEdgeData };
export {
  metadata,
  defaultData,
  defaultStylesheet,
  convertCYElementsObjToMainData,
  NodeLabelPosition,
  NodeShape,
  EdgeStyle,
  EdgeArrow,
  ChartNodeFormConverter,ChartEdgeFormConverter
};
