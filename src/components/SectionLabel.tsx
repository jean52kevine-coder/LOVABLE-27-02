interface SectionLabelProps {
  children: React.ReactNode;
}

export const SectionLabel = ({ children }: SectionLabelProps) => (
  <span className="section-label">{children}</span>
);
