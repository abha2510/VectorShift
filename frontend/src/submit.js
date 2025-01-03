import { Bounce, Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { Button } from "@nextui-org/react";

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
      const response = await fetch(
        "https://vectorshift-assignment.onrender.com/pipelines/parse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nodes, edges }),
        }
      );

      const result = await response.json();

      toast.success(
        <div className="flex flex-col p-1 text-base gap-1">
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
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
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
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex items-center justify-center fixed bottom-10 left-0 right-0">
      <Button onClick={handleSubmit} color="primary" size="lg" type="submit">
        Submit
      </Button>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};
