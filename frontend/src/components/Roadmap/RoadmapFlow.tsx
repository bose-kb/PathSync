import React, { useState,useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';

const rawData = {
  "Spring Framework": {
    "Spring Core": {
      "duration": "3 hours",
      "completionStatus": "Not Completed",
      "learningResources": {
        "Spring Docs - Core": "https://docs.spring.io/spring-framework/docs/current/reference/html/core.html",
        "YouTube - Spring Core Tutorial": "https://www.youtube.com/watch?v=5aYFKbS1r3E",
        "Baeldung - Spring Core": "https://www.baeldung.com/spring-core",
      },
    },
    "Spring Boot": {
      "duration": "4 hours",
      "completionStatus": "Not Completed",
      "learningResources": {
        "Spring Docs - Boot": "https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/",
        "YouTube - Spring Boot Tutorial": "https://www.youtube.com/watch?v=vtPkZShrvXQ",
        "Baeldung - Spring Boot": "https://www.baeldung.com/spring-boot",
      },
    },
  },
};

const RoadmapFlow = () => {
  const [data, setData] = useState(rawData);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [dynamicNodes, setDynamicNodes] = useState({}); // Keep track of dynamically generated nodes

  const generateFlowData = (roadmapData: typeof rawData) => {
    const initialNodes: Node[] = [];
    const initialEdges: Edge[] = [];

    let y = 0;

    Object.entries(roadmapData).forEach(([mainKey, children], mainIndex) => {
      const parentId = `main-${mainIndex}`;

      initialNodes.push({
        id: parentId,
        data: { label: mainKey },
        position: { x: 0, y },
        style: { background: '#facc15', padding: 10, borderRadius: 8 },
      });

      let x = 300;
      Object.entries(children).forEach(([subKey, subData], subIndex) => {
        const nodeId = `${parentId}-child-${subIndex}`;

        initialNodes.push({
          id: nodeId,
          data: {
            label: (
              <div
                className="cursor-pointer"
                onClick={() => createDynamicSubNode(nodeId, subKey, subData)}
              >
                <div className="font-semibold">{subKey}</div>
                <div className="text-xs">{subData.duration}</div>
                <div className="text-xs italic">{subData.completionStatus}</div>
              </div>
            ),
          },
          position: { x, y: y + 100 },
          style: {
            background: subData.completionStatus === 'Completed' ? '#22c55e' : '#f87171',
            color: 'white',
            padding: 10,
            borderRadius: 8,
            width: 200,
          },
        });

        initialEdges.push({ id: `${parentId}-${nodeId}`, source: parentId, target: nodeId, animated: true });
        x += 250;
      });

      y += 250;
    });

    return { initialNodes, initialEdges };
  };

  const createDynamicSubNode = (parentNodeId: string, title: string, subData: any) => {
    // If the node is already generated, do nothing
    if (dynamicNodes[parentNodeId]) return;

    // Create a new node containing learning resources
    const newNodeId = `${parentNodeId}-dynamic`;

    setDynamicNodes((prev) => ({ ...prev, [parentNodeId]: true }));

    const resourcesContent = (
      <div className="space-y-2">
        <div>{title} Learning Resources:</div>
        <ul className="list-disc ml-4">
          {Object.entries(subData.learningResources).map(([label, url]) => (
            <li key={label}>
              <a href={url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={() => markAsCompleted(parentNodeId)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Mark as Completed
        </button>
      </div>
    );

    const newNode = {
      id: newNodeId,
      position: { x: 300, y: 300 }, // Position dynamically
      data: { label: resourcesContent },
      style: { background: 'yellow', padding: 10, borderRadius: 8, width: 300 },
    };

    const newEdge = {
      id: `${parentNodeId}-${newNodeId}`,
      source: parentNodeId,
      target: newNodeId,
      animated: true,
    };

    setNodes((prev) => [...prev, newNode]);
    setEdges((prev) => [...prev, newEdge]);
  };

  const markAsCompleted = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === nodeId
          ? { ...node, style: { ...node.style, background: '#22c55e' } }
          : node
      )
    );
  };

  useEffect(() => {
    const { initialNodes, initialEdges } = generateFlowData(data);
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [data]);

  return (
    <div className="h-screen w-full">
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} fitView>
        <MiniMap />
        <Controls />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default RoadmapFlow;