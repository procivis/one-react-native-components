import { useCallback, useEffect, useRef, useState } from 'react';
import { getTime } from 'react-native-system-time';

import { reportException } from '../../reporting';

const getSecureSystemTime = async () => {
  // converting nanoseconds to seconds
  return Math.floor((await getTime()) / 1000000000);
};

export const usePinCodeSecurity = (
  failedAttempts: number,
  lastAttemptTimestamp: number | undefined,
  setPinCodeSecurity: (failedAttempts: number, lastAttemptTimestamp: number | undefined) => void,
  allowedAttempts = 3,
) => {
  const [attempts, setAttempts] = useState(failedAttempts);
  const [lastTimestamp, setLastTimestamp] = useState(lastAttemptTimestamp);
  const [isBlocked, setIsBlocked] = useState(failedAttempts >= allowedAttempts && lastAttemptTimestamp !== undefined);
  const [blockRemainingTime, setBlockRemainingTime] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval>>();

  const calculateBlockTime = useCallback(() => {
    if (!lastTimestamp) {
      return;
    }
    // Get seconds since device boot
    getSecureSystemTime()
      .then((currentTime) => {
        // Compute how long should the user wait
        const waitingtime = Math.pow(2, attempts - allowedAttempts) * 60;

        // Get how much time passed since the last attempt
        const timepassed = currentTime - lastTimestamp;

        let blockTime = waitingtime - timepassed;

        if (timepassed < 0) {
          // Device was rebooted since the last attempt
          // Current time goes from zero again
          blockTime = waitingtime - currentTime;
        }

        setIsBlocked(blockTime > 0);
        setBlockRemainingTime(Math.max(0, blockTime));
        if (blockTime <= 0) {
          setPinCodeSecurity(attempts, undefined);
          setLastTimestamp(undefined);
        }
      })
      .catch((e) => {
        reportException(e, 'failed to get secure system time');
      });
  }, [allowedAttempts, attempts, lastTimestamp, setPinCodeSecurity]);

  const addFailedAttempt = useCallback(() => {
    getSecureSystemTime()
      .then((currentTime) => {
        const newAttempts = attempts + 1;
        setPinCodeSecurity(newAttempts, currentTime);
        setAttempts(newAttempts);
        setLastTimestamp(currentTime);
        if (newAttempts === allowedAttempts) {
          calculateBlockTime();
        }
      })
      .catch((e) => {
        reportException(e, 'failed to get secure system time');
      });
  }, [allowedAttempts, attempts, calculateBlockTime, setPinCodeSecurity]);

  const resetPinSecurity = useCallback(() => {
    setPinCodeSecurity(0, undefined);
    setLastTimestamp(undefined);
    setAttempts(0);
  }, [setPinCodeSecurity]);

  useEffect(() => {
    if (isBlocked && timer.current === undefined) {
      timer.current = setInterval(calculateBlockTime, 500);
    } else if (!isBlocked && timer.current !== undefined) {
      clearInterval(timer.current);
      timer.current = undefined;
    }
  }, [isBlocked, calculateBlockTime]);

  useEffect(() => {
    if (attempts >= allowedAttempts && lastAttemptTimestamp && !isBlocked) {
      calculateBlockTime();
    }
  }, [allowedAttempts, attempts, calculateBlockTime, isBlocked, lastAttemptTimestamp]);

  return {
    addFailedAttempt,
    blockRemainingTime,
    isBlocked,
    resetPinSecurity,
  };
};
