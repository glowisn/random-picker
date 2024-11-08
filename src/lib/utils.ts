import { cva as orgCva } from "class-variance-authority";
import { ClassArray, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import config from "../../tailwind.config";

function flattenObjectKeys(
  obj: Record<string, unknown>,
  prefix = "",
): string[] {
  return Object.entries(obj).reduce((result: string[], [key, value]) => {
    if (typeof value === "object" && value !== null) {
      return result.concat(
        flattenObjectKeys(value as Record<string, unknown>, `${prefix}${key}-`),
      );
    }
    return result.concat(`${prefix}${key}`);
  }, []);
}

const tw = extendTailwindMerge({
  extend: {
    theme: {
      colors: flattenObjectKeys(
        config.theme?.extend?.colors as Record<string, unknown>,
      ),
    },
  },
});

export function cn(...inputs: ClassArray) {
  return tw(clsx(inputs));
}

type CvaParam<T> = Parameters<ReturnType<typeof orgCva<T>>>[number];
/**
 * 기존의 cva 함수에 cn 기능을 추가합니다.
 *
 * 원래 cva 대신 이 함수를 사용해 주세요.
 *
 * @param params - The parameters passed to the original `orgCva`.
 * @returns A function that takes optional props and returns a string of combined Tailwind classes.
 */
export function cva<T>(...params: Parameters<typeof orgCva<T>>) {
  return (props?: CvaParam<T>) => tw(orgCva(...params)(props));
}
