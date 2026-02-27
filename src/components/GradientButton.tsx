import { Link } from 'react-router-dom';

interface GradientButtonProps {
  to: string;
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  className?: string;
}

export const GradientButton = ({ to, children, variant = 'primary', className = '' }: GradientButtonProps) => {
  const base = 'inline-flex items-center justify-center px-8 py-3.5 rounded-full font-body font-semibold text-[15px] transition-all duration-300';
  const styles = variant === 'primary'
    ? `${base} bg-gradient-primary text-foreground hover:opacity-90 hover:shadow-[0_0_30px_hsla(264,100%,59%,0.4)]`
    : `${base} border border-glow text-foreground hover:border-violet hover:bg-gradient-dark`;

  return (
    <Link to={to} className={`${styles} ${className}`}>
      {children}
    </Link>
  );
};
