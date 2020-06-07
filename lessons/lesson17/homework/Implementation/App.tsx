import React from "react";
import { connect, Provider } from "react-redux";
import { fetchData } from "./AsyncFlow/actions";
import { State } from "./AsyncFlow/reducer";
import { store } from "./AsyncFlow/store";
import { People } from "./People";

const mapStateToProps = (state: State) => {
  return {
    isLoading: state.isLoading,
    data: state.data,
    error: state.error,
  };
};

const mapDispatchToProps = {
  fetchData,
};

const PeopleWithStore = connect(mapStateToProps, mapDispatchToProps)(People);

export const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <PeopleWithStore />
    </Provider>
  );
};
