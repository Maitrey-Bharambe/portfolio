import { cx } from "@/lib/utils";

const variants = { ink: "", light: "btn-light", yellow: "btn-yellow" };

export default function Button({ href, variant = "ink", small = false, external = false, className, children, ...rest }) {
  const cls = cx("btn", variants[variant], small && "btn-sm", className);
  const extra = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a href={href} className={cls} {...extra} {...rest}>
      {children}
    </a>
  );
}
