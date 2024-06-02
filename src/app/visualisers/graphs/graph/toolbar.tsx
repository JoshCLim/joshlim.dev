import {
  graphClampPositions,
  graphNew,
  graphRandomRearrange,
  graphRearrange,
} from "./graph";
import { useGraphContext } from "./graphContext";
import ToolbarButton from "./toolbarButton";

import {
  CoinsSwap,
  Drag,
  FrameAltEmpty,
  Redo,
  Trash,
  Undo,
} from "iconoir-react";

export default function Toolbar() {
  const { canvasRef, graphOperations, running } = useGraphContext();

  return (
    <div className="flex flex-row items-center justify-end gap-4 px-8 py-4 pe-4">
      <div className="flex flex-row">
        <ToolbarButton
          tooltip="undo"
          className="rounded-r-none bg-[#696969]"
          disabled={!graphOperations.canUndo}
          onClick={graphOperations.undo}
        >
          <Undo />
        </ToolbarButton>
        <ToolbarButton
          tooltip="redo"
          className="rounded-l-none bg-[#808080]"
          disabled={!graphOperations.canRedo}
          onClick={graphOperations.redo}
        >
          <Redo />
        </ToolbarButton>
      </div>
      <ToolbarButton
        tooltip="fit to frame"
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
        tooltip="randomly rearrange"
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
        tooltip="rearrange"
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
        tooltip="clear"
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
