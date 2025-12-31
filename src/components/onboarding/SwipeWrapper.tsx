import { useSwipeable } from 'react-swipeable';

export default function SwipeWrapper({
  children,
  onNext,
  onPrev,
}: any) {
  const handlers = useSwipeable({
    onSwipedLeft: onNext, 
    onSwipedRight: onPrev,
    trackMouse: true,
  });

  return <div {...handlers}>{children}</div>;
}
