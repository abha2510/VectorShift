import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

export const SubmitButton = () => {
  const { nodes, edges } = useStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
    }),
    shallow
  );

  const handleSubmit = async () => {
    try {
      // Sending the nodes and edges to the backend
      const response = await fetch(`http://localhost:8000/pipelines/parse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      const result = await response.json();

      toast.success(
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0.5em",
            fontSize: "0.9em",
            gap: "0.5em",
          }}
        >
          <span>
            <b>Nodes:</b> {result.num_nodes}
          </span>
          <span>
            <b>Edges: </b>
            {result.num_edges}
          </span>
          <span>
            <b>Is DAG: </b>
            {result.is_dag ? "Yes" : "No"}
          </span>
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        }
      );
    } catch (error) {
      console.error("Error submitting the pipeline:", error);
      toast.error("Submission failed! Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button onClick={handleSubmit} type="submit">
        Submit
      </button>
      <ToastContainer />
    </div>
  );
};
