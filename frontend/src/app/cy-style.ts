const labelStyle = [
  {
    selector: "node[label]",
    style: {
      label: "data(label)",
    },
  },

  {
    selector: "edge[label]",
    style: {
      label: "data(label)",
    },
  },

  {
    selector: ".top-left",
    style: {
      "text-valign": "top",
      "text-halign": "left",
    },
  },

  {
    selector: ".top-center",
    style: {
      "text-valign": "top",
      "text-halign": "center",
    },
  },

  {
    selector: ".top-right",
    style: {
      "text-valign": "top",
      "text-halign": "right",
    },
  },

  {
    selector: ".center-left",
    style: {
      "text-valign": "center",
      "text-halign": "left",
    },
  },

  {
    selector: ".center-center",
    style: {
      "text-valign": "center",
      "text-halign": "center",
    },
  },

  {
    selector: ".center-right",
    style: {
      "text-valign": "center",
      "text-halign": "right",
    },
  },

  {
    selector: ".bottom-left",
    style: {
      "text-valign": "bottom",
      "text-halign": "left",
    },
  },

  {
    selector: ".bottom-center",
    style: {
      "text-valign": "bottom",
      "text-halign": "center",
    },
  },

  {
    selector: ".bottom-right",
    style: {
      "text-valign": "bottom",
      "text-halign": "right",
    },
  },

  {
    selector: ".multiline-manual",
    style: {
      "text-wrap": "wrap",
    },
  },

  {
    selector: ".multiline-auto",
    style: {
      "text-wrap": "wrap",
      "text-max-width": 80,
    },
  },

  {
    selector: ".autorotate",
    style: {
      "edge-text-rotation": "autorotate",
    },
  },

  {
    selector: ".background",
    style: {
      "text-background-opacity": 1,
      color: "#fff",
      "text-background-color": "#888",
      "text-background-shape": "roundrectangle",
      "text-border-color": "#000",
      "text-border-width": 1,
      "text-border-opacity": 1,
    },
  },

  {
    selector: ".outline",
    style: {
      color: "#fff",
      "text-outline-color": "#888",
      "text-outline-width": 3,
    },
  },
];

const edgeArrowStyle = [
  {
    selector: "edge[arrow]",
    style: {
      "target-arrow-shape": "data(arrow)",
    },
  },
  {
    selector: "edge.hollow",
    style: {
      "target-arrow-fill": "hollow",
    },
  },
];

const edgeStyle = [
  {
    selector: "node[?flipLabel]",
    style: {
      "text-halign": "right",
    },
  },
  {
    selector: "edge.bezier",
    style: {
      "curve-style": "bezier",
      "control-point-step-size": 40,
    },
  },
  {
    selector: "edge.unbundled-bezier",
    style: {
      "curve-style": "unbundled-bezier",
      "control-point-distances": 120,
      "control-point-weights": 0.1,
    },
  },
  {
    selector: "edge.multi-unbundled-bezier",
    style: {
      "curve-style": "unbundled-bezier",
      "control-point-distances": [40, -40],
      "control-point-weights": [0.25, 0.75],
    },
  },
  {
    selector: "edge.haystack",
    style: {
      "curve-style": "haystack",
      "haystack-radius": 0.5,
    },
  },
  {
    selector: "edge.segments",
    style: {
      "curve-style": "segments",
      "segment-distances": [40, -40],
      "segment-weights": [0.25, 0.75],
    },
  },
  {
    selector: "edge.taxi",
    style: {
      "curve-style": "taxi",
      "taxi-direction": "downward",
      "taxi-turn": 20,
      "taxi-turn-min-distance": 5,
    },
  },
  {
    selector: "edge.straight-triangle",
    style: {
      "curve-style": "straight-triangle",
    },
  },
];

const nodeStyle = [
    {
      selector: "node[?type]",
      style: {
        shape: "data(type)",
      },
    },
];

enum NodeStlyeType {
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


const edgeHandlerStyle = [{
    selector: '.eh-handle',
    style: {
      'background-color': 'red',
      'width': 12,
      'height': 12,
      'shape': 'ellipse',
      'overlay-opacity': 0,
      'border-width': 12, // makes the handle easier to hit
      'border-opacity': 0
    }
  },

  {
    selector: '.eh-hover',
    style: {
      'background-color': 'red'
    }
  },

  {
    selector: '.eh-source',
    style: {
      'border-width': 2,
      'border-color': 'red'
    }
  },

  {
    selector: '.eh-target',
    style: {
      'border-width': 2,
      'border-color': 'red'
    }
  },

  {
    selector: '.eh-preview, .eh-ghost-edge',
    style: {
      'background-color': 'red',
      'line-color': 'red',
      'target-arrow-color': 'red',
      'source-arrow-color': 'red'
    }
  },

  {
    selector: '.eh-ghost-edge.eh-preview-active',
    style: {
      'opacity': 0
    }
  }
]
export { NodeStlyeType, edgeArrowStyle, labelStyle, edgeStyle, nodeStyle, edgeHandlerStyle };
