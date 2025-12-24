import React from 'react';
import styles from './styles.module.css';

interface ApiEndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
}

export default function ApiEndpoint({method, path, description}: ApiEndpointProps): JSX.Element {
  const methodColors = {
    GET: '#61affe',
    POST: '#49cc90',
    PUT: '#fca130',
    DELETE: '#f93e3e',
    PATCH: '#50e3c2',
  };

  return (
    <div className={styles.apiEndpoint}>
      <div className={styles.header}>
        <span
          className={styles.method}
          style={{backgroundColor: methodColors[method]}}
        >
          {method}
        </span>
        <code className={styles.path}>{path}</code>
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
