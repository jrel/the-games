import React from "react";

export type Vector = { x: number; y: number };
export interface Props {
    offset?: Vector;
}
const Shadow: React.FC<Props> = ({ offset = { x: 0, y: 0 }, children }) => {
  const mouse = React.useRef<Vector>({ x: 0, y: 0 });
  const [state, setState] = React.useState<{
    content: Vector;
    rotation: Vector;
  }>({
    content: { x: 0, y: 0 },
    rotation: { x: 0, y: 0 },
  });

  const requestRef = React.useRef<number>();

  React.useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      mouse.current = { x: e.clientX, y: e.clientY };
    }

    document.addEventListener("mousemove", onMouseMove);

    return () => document.removeEventListener("mousemove", onMouseMove);
  }, []);

  const update = React.useCallback(() => {
    setState((prev) => {
      const velocity = {
        x: mouse.current.x - prev.content.x,
        y: mouse.current.y - prev.content.y,
      };

      const x = prev.rotation.x * 0.9 + sigmoid(velocity.x) * 1.5;
      const y = prev.rotation.y * 0.9 + sigmoid(velocity.y) * 1.5;

      return {
        content: mouse.current,
        rotation: {
          x: Math.abs(x) < 0.01 ? 0 : x,
          y: Math.abs(y) < 0.01 ? 0 : y,
        },
      };
    });

    requestRef.current = requestAnimationFrame(update);
  }, [requestRef]);

  const sigmoid = (value: number) => value / (1 + Math.abs(value));

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(update);

    return () => {
      requestRef.current && cancelAnimationFrame(requestRef.current);
    };
  }, [requestRef, update]);
  return (
    <>
      {
        <div
          style={{
            position: "absolute",
            top: state.content.y - offset.y,
            left: state.content.x - offset.x,
            zIndex: 10,
            pointerEvents: "none",
            perspective: 200,
          }}
        >
          <div
            style={{
              transform: `rotate(${state.rotation.x}deg) rotateX(${state.rotation.y}deg)`,
              transformOrigin: `${offset.x}px ${offset.y}px`,
            }}
          >
            {children}
          </div>
        </div>
      }
    </>
  );
};

export default Shadow;
