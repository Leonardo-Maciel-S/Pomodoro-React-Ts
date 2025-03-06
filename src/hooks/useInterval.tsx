import { useEffect, useRef } from "react";

export function useInterval<C extends CallableFunction>(
	callBack: C,
	delay: number | null,
): void {
	const savedCallback = useRef<C>(null);

	useEffect(() => {
		savedCallback.current = callBack;
	}, [callBack]);

	useEffect(() => {
		function tick() {
			if (savedCallback.current) savedCallback.current();
		}

		if (delay !== null) {
			const id = setInterval(tick, delay);

			return () => clearInterval(id);
		}
	}, [delay]);
}
