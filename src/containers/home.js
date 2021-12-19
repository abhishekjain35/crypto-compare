import { useEffect, useState } from "react";
import axios from "axios";
import HomeComponent from "../components/index.js";

const Home = () => {
  const [coins, setCoins] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [data, setData] = useState({});
  const [previousState, setPreviousState] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/blockchain/list?api_key=2863399fea5c85fa1d9ee6c628ea8c3dc15857cdb965849aa68bcb551cb237e4"
      )
      .then((response) => {
        let res = response.data.Data;
        let arr = [];
        Object.keys(res).forEach((coin) => {
          let obj = { label: res[coin].symbol, value: res[coin].symbol };
          arr.push(obj);
        });
        setCoins(arr);
      });
    getHistory();
  }, []);

  const getHistory = async () => {
    let updatedHistory = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/history`
    );
    setHistory(updatedHistory.data);
  };

  const getSearchResults = async (coins) => {
    let coinResponse = await axios.get(
      `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coins.join(
        ","
      )}&tsyms=USD,EUR&api_key=2863399fea5c85fa1d9ee6c628ea8c3dc15857cdb965849aa68bcb551cb237e4`
    );

    let res = coinResponse.data;
    let obj = {};
    let USD = [];
    Object.keys(res).forEach((coin) => {
      USD.push(res[coin].USD);
    });
    obj.USD = USD;
    setData(obj);
    setPreviousState(coins);
    setSelectedCoins(coins);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    await getSearchResults(selectedCoins);
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/history`,
      { data: selectedCoins },
      {
        "Content-Type": "Application/json",
      }
    );
    await getHistory();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setSelectedCoins(previousState);
    setIsModalVisible(false);
  };

  const onChange = (checkedValues) => {
    setSelectedCoins(checkedValues);
  };

  return (
    <HomeComponent
      coins={coins}
      showModal={showModal}
      handleOk={handleOk}
      handleCancel={handleCancel}
      isModalVisible={isModalVisible}
      onChange={onChange}
      labels={selectedCoins}
      values={data}
      history={history}
      getSearchResults={getSearchResults}
    />
  );
};

export default Home;
