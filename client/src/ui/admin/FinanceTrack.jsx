import { platformFeeThunk } from '@/features/admin/fees/feeThunk';
import { platformPerceintageFee } from '@/features/admin/fees/percentageFeeThunk';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function FinanceTrack() {
  const dispatch = useDispatch();
  const { platformFees } = useSelector(state => state.fees);
    const { perceitFee } = useSelector(state => state.perceint);
    console.log(perceitFee);
  useEffect(() => {
    dispatch(platformFeeThunk());
    dispatch(platformPerceintageFee());
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-3 text-gray-100">
        <div className="flex gap-2">
          <span>Total Fees Collected: </span>
          <span>{platformFees}</span>
        </div>

        <div className="flex gap-2">
          <span>Perceintage Fee: </span>
          <span>{perceitFee}</span>
        </div>
      </div>
    </div>
  );
}
