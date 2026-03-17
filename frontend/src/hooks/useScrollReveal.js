import { useInView } from 'react-intersection-observer';

/**
 * Hook that returns a ref and whether the element is in view.
 * Used for scroll-triggered animations.
 */
const useScrollReveal = (threshold = 0.15) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
  });
  return [ref, inView];
};

export default useScrollReveal;
