import { useEffect, useState } from "react";
import { getAddresses } from "../http";

export const useAddress = () => {
  const [addresses, setAddresses] = useState();
  useEffect(() => {
    getAddresses()
      .then(res => {
        const { addresses } = res.data;
        console.log(addresses);
        setAddresses(addresses);
      })
      .catch(console.error);
  }, []);
  const getSidoNames = () => {
    const results = [];
    if (addresses) {
      addresses.map(address => {
        if (results.indexOf(address.sidoName) === -1)
          results.push(address.sidoName);
      });
    }
    return results;
  };
  const getSggNames = sidoName => {
    const results = [];
    if (addresses && sidoName) {
      addresses.map(address => {
        if (address.sidoName === sidoName) results.push(address.sggName);
      });
    }
    return results;
  };
  return [addresses, getSidoNames, getSggNames];
};
