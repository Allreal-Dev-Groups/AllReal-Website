import * as Icons from 'lucide-react';

export default function Icon({ name, className = '', ...props }) {
  const Comp = Icons[name];
  if (!Comp) return null;
  return <Comp className={className} {...props} />;
}
