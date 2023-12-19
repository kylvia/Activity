import { memo, useContext } from 'react';
import { OffScreenContext } from '.';
import Activity from './Activity';
import { TOutlet } from './type';

function KeepAliveOutlet() {
  const { outlets, key } = useContext(OffScreenContext);
  return (
    <>
      {outlets?.map((o: TOutlet) => (
        <Activity key={o.key} mode={key === o.key ? 'visible' : 'hidden'}>
          {o.outlet}
        </Activity>
      ))}
    </>
  );
}
export default memo(KeepAliveOutlet);
