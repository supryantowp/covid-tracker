import React, { useState, useEffect } from "react";

import { NativeSelect, FormControl } from "@material-ui/core";
import style from "./CountryPicker.module.css";

import { FetchCountries } from "../../api";

const CountryPicker = ({ handlerCountryChange }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await FetchCountries());
    };

    fetchAPI();
  }, []);

  return (
    <FormControl className={style.FormControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handlerCountryChange(e.target.value)}
      >
        <option value="">Global</option>

        {fetchedCountries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
