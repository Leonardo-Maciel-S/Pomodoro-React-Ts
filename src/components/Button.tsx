import type { HTMLAttributes } from "react";

export function Button({
	children,
	...rest
}: HTMLAttributes<HTMLButtonElement>) {
	return (
		<button type="button" {...rest}>
			{children}
		</button>
	);
}
