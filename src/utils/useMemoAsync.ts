import { DependencyList, useEffect, useState } from 'react';

interface FactoryFn<Value> {
  /**
   * Custom factory function
   * @param abortSignal Signaled when the deps change and the factory function need to be called again or when the parent component unmounts
   * @returns Result to be returned from the {@link useMemoAsync}
   */
  (abortSignal: AbortSignal): Value | Promise<Value>;
}

/**
 * Utility hook that can be used the same way as `useMemo` when the initializer needs to be async
 * @param factory Factory function to produce a value
 * @param deps Hook dependency list (to trigger an update)
 * @param initialValue Initial value before factory finishes producing a value (default = `undefined`)
 * @param fallbackValue Used when factory fails to produce a value (default = `initialValue`)
 * @returns Result from the {@link factory}, {@link initialValue} or {@link fallbackValue}
 */
export function useMemoAsync<Value, FallbackValue = Value | undefined>(
  factory: FactoryFn<Value>,
  deps: DependencyList,
  initialValue: FallbackValue,
  fallbackValue?: FallbackValue,
): Value | FallbackValue;
export function useMemoAsync<Value>(factory: FactoryFn<Value>, deps: DependencyList): Value | undefined;

export function useMemoAsync<Value, FallbackValue = Value | undefined>(
  factory: FactoryFn<Value>,
  deps: DependencyList,
  initialValue?: FallbackValue,
  fallbackValue?: FallbackValue,
): Value | FallbackValue | undefined {
  const [value, setValue] = useState<Value | FallbackValue | undefined>(initialValue);
  useEffect(() => {
    const abortCtrl = new AbortController();
    const update = async () => {
      try {
        const result = await factory(abortCtrl.signal);
        if (!abortCtrl.signal.aborted) setValue(result);
      } catch (e) {
        if (!abortCtrl.signal.aborted) setValue(fallbackValue ?? initialValue);
      }
    };
    update().catch(() => {});
    return () => abortCtrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return value;
}
