import React, { CSSProperties } from 'react';
import { Badge } from 'antd';
import './index.less';

interface StatusProps {
  className?: string;
  style?: CSSProperties;
}

/**
 * Quick operation for quickly showing a status
 */
const Status: {
  Success: React.FC<StatusProps>;
  Error: React.FC<StatusProps>;
  Processing: React.FC<StatusProps>;
  Default: React.FC<StatusProps>;
  Warning: React.FC<StatusProps>;
} = {
  Success: ({ children }) => <Badge status="success" text={children} />,
  Error: ({ children }) => <Badge status="error" text={children} />,
  Default: ({ children }) => <Badge status="default" text={children} />,
  Processing: ({ children }) => <Badge status="processing" text={children} />,
  Warning: ({ children }) => <Badge status="warning" text={children} />,
};

export type StatusType = keyof typeof Status;

export default Status;
