import React, { RefCallback, useMemo, useRef } from 'react';

const isWritable = <T extends object>(obj: T, key: keyof T) => {
  const desc =
    Object.getOwnPropertyDescriptor(obj, key) || Object.getOwnPropertyDescriptor(Object.getPrototypeOf(obj), key) || {};
  return Boolean(desc.writable);
};

/**
 * Transforms a forwarded ref to a locally usable reference object
 * @example
 * const Component = forwardRef<RefComponent, Props>((props, ref) => {
 *    const [forwardedRef, refObject] = useForwardedRef(ref);
 *    const onAction = useCallback(() => doSomething(refObject.current), [refObject]);
 *    return <RefComponent ref={forwardedRef} {...props} />;
 * }
 */
export const useForwardedRef = <Component extends React.ElementType<any, any>>(
  passedRef?: React.MutableRefObject<Component | null>,
) => {
  const localRef = useRef<Component>(null);
  return useMemo<[React.Ref<Component>, React.RefObject<Component>]>(() => {
    const ref: React.MutableRefObject<Component | null> = localRef;
    const forwardedRef: React.Ref<Component> = (instance: Component | null) => {
      ref.current = instance;
      if (passedRef) {
        if (passedRef instanceof Function) {
          (passedRef as unknown as RefCallback<Component>)(instance);
        } else if (isWritable(passedRef, 'current')) {
          try {
            passedRef.current = instance;
          } catch {
            // do nothing
          }
        }
      }
    };

    return [forwardedRef, ref];
  }, [passedRef]);
};
