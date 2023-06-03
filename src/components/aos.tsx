import type { ReactNode } from "react";

export const AOS = ({
  children,
  aos,
  delay = 100,
  duration = 1000,
}: {
  children: ReactNode;
  aos: string;
  delay?: number;
  duration?: number;
}) => {
  return (
    <div
      data-aos={aos}
      data-aos-delay={`${delay}`}
      data-aos-duration={`${duration}`}
      data-aos-mirror="true"
    >
      {children}
    </div>
  );
};
