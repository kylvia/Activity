import { FC, Suspense, memo } from 'react';
import { Repeater } from './Repeater';
import type { IProps } from './type';

const Offscreen: FC<IProps> = (props) => {
  const { mode, children } = props;

  return (
    <Suspense fallback={null}>
      <Repeater mode={mode}>{children}</Repeater>
    </Suspense>
  );
};

export default memo(Offscreen);
