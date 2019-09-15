import gql from 'graphql-tag';
import React from 'react';
import { useQuery } from 'urql';

const query = gql`
  query($login: String!) {
    user(login: $login) {
      repositories(first: 50, isFork: false) {
        nodes {
          name
          url
        }
      }
    }
  }
`;

const initialValue = 'mateja176';

const App: React.FC = () => {
  const [value, setValue] = React.useState(initialValue);

  const [login, setLogin] = React.useState(initialValue);

  const [{ data, fetching, error }] = useQuery<
    { user: { repositories: { nodes: Array<{ name: string; url: string }> } } },
    { login: string }
  >({
    query,
    variables: {
      login,
    },
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        setLogin(value);
      }}
    >
      <input
        value={value}
        onChange={({ target: { value } }) => {
          setValue(value);
        }}
      />
      <input type="submit" />
      <div>
        {fetching ? (
          'Loading...'
        ) : error ? (
          <pre>{JSON.stringify(error, null, 2)}</pre>
        ) : (
          <ul>
            {data!.user.repositories.nodes.map(node => (
              <li key={node.url}>
                <ul>
                  {Object.entries(node).map(entry => (
                    <li key={entry[0]}>{entry.join(': ')}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
};

export default App;
