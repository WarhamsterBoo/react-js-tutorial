import React, { useCallback } from "react";

export interface PeopleProps {
  isLoading: boolean;
  data: any | undefined;
  error?: string;
  fetchData: (url: string) => void;
}

// This component does not have tests. It was done intentionally. Because tests on simple React component are not the goal of this assignment.
export const People: React.FC<PeopleProps> = ({
  isLoading,
  data,
  error,
  fetchData,
}) => {
  const onFetchData = useCallback(() => {
    fetchData("https://swapi.dev/api/people");
  }, [fetchData]);

  return (
    <div>
      <h1>People</h1>
      <button onClick={onFetchData}>Fetch</button>
      {isLoading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!isLoading && data && (
        <>
          <p>{JSON.stringify(data, undefined, 2)}</p>
        </>
      )}
    </div>
  );
};
