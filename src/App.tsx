import gql from 'graphql-tag';
import React from 'react';
import { useQuery } from 'urql';

const query = gql`
  {
    viewer {
      name
    }
  }
`;

const App: React.FC = () => {
  const [{ data, fetching, error }] = useQuery<{ viewer: { name: string } }>({
    query,
  });

  return (
    <div>
      {fetching ? (
        'Loading...'
      ) : error ? (
        <pre>JSON.stringify(error, null, 2)</pre>
      ) : (
        data!.viewer.name
      )}
    </div>
  );
};

export default App;
