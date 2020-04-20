import React, { Component } from "react";
import { Cards, Chart, CountryPicker } from "./components";

import { fetchData } from "./api/index";

import style from "./App.module.css";

class App extends Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchDatas = await fetchData();

    if (!fetchDatas) {
      return "loading...";
    }

    this.setState({ data: fetchDatas });
  }

  handlerCountryChange = async (country) => {
    // fetch the data
    const fetchDatas = await fetchData(country);

    this.setState({ data: fetchDatas, country: country });
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className={style.container}>
        <Cards data={data} />
        <CountryPicker handlerCountryChange={this.handlerCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
