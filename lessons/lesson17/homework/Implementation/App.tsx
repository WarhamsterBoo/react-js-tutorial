import React from "react";
import { connect, Provider } from "react-redux";
import { AppStore } from "./AppStore";
import { fetchData } from "./AsyncFlow/actions";
import { State } from "./AsyncFlow/reducer";
import { People } from "./People/People";

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
    <Provider store={AppStore}>
      <PeopleWithStore />
    </Provider>
  );
};
