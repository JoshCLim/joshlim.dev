import {
  graphClampPositions,
  graphNew,
  graphRandomRearrange,
  graphRearrange,
} from "./graph";
import { useGraphContext } from "./graphContext";
import ToolbarButton from "./toolbarButton";

import { CoinsSwap, Drag, FrameAltEmpty, Trash } from "iconoir-react";

export default function Toolbar() {
  const { canvasRef, graphOperations, running } = useGraphContext();

  return (
    <div className="flex flex-row items-center justify-end gap-4 px-8 py-4 pe-4">
      <ToolbarButton
        className="bg-[#dedaa2]"
        onClick={() =>
          graphOperations.setGraph((g) =>
            graphClampPositions(
              g,
              canvasRef.current?.offsetWidth ?? 0,
              canvasRef.current?.offsetHeight ?? 0,
            ),
          )
        }
      >
        <FrameAltEmpty />
      </ToolbarButton>
      <ToolbarButton
        className="bg-[#acdeb9]"
        onClick={() =>
          graphOperations.setGraph((g) =>
            graphRandomRearrange(
              g,
              canvasRef.current?.offsetWidth ?? 0,
              canvasRef.current?.offsetHeight ?? 0,
            ),
          )
        }
      >
        <CoinsSwap />
      </ToolbarButton>
      <ToolbarButton
        className="bg-[#acd4de]"
        onClick={() =>
          graphOperations.setGraph((g) =>
            graphRearrange(
              g,
              canvasRef.current?.offsetWidth ?? 0,
              canvasRef.current?.offsetHeight ?? 0,
            ),
          )
        }
      >
        <Drag />
      </ToolbarButton>
      <ToolbarButton
        confirmation={true}
        disabled={running}
        className="bg-[#f8b595]"
        onClick={() =>
          graphOperations.setGraph(
            graphNew({ directed: false, weighted: false }),
          )
        }
      >
        <Trash />
      </ToolbarButton>
    </div>
  );
}
