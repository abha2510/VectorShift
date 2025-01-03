from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel 
from typing import List, Dict
import networkx as nx

app = FastAPI()

# Add the CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the schema for nodes and edges
class Node(BaseModel):
    id: str
    type: str
    data: Dict

class Edge(BaseModel):
    id: str
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: Pipeline):
    # Number of nodes and edges
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    # Create a directed graph using networkx
    G = nx.DiGraph()

    # Add nodes to the graph
    for node in pipeline.nodes:
        G.add_node(node.id)

    # Add edges to the graph
    for edge in pipeline.edges:
        G.add_edge(edge.source, edge.target)

    # Check if the graph is a Directed Acyclic Graph (DAG)
    is_dag = nx.is_directed_acyclic_graph(G)

    # Return the result
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }
