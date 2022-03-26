import React from 'react';
import '../css/components.css';

/**
 * Prop type of Retry component
 */
type Props = {
  retry: () => void;
};

/**
 * Component to show error message when fail to load data from api service.
 * Show a Retry button to try again
 */
const Retry = (props: Props) => {
  const { retry } = props;
  return (
    <div className="retry">
      Error while loading data <button onClick={() => retry()}>Retry</button>
    </div>
  );
};

export default Retry;
