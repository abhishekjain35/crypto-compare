import "./style.css";
import { Modal, Button, Checkbox, List } from "antd";
import BarChart from "./charts/bar";
import LineChart from "./charts/line";
import PieChart from "./charts/pie";
import moment from "moment";

const HomeComponent = ({
  coins,
  showModal,
  handleOk,
  handleCancel,
  isModalVisible,
  onChange,
  labels,
  values,
  history,
  getSearchResults,
}) => {
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Select currencies
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Checkbox.Group options={coins} defaultValue={[]} onChange={onChange} />
      </Modal>

      <div className="container">
        <div className="chart-container">
          {Object.keys(values).length > 0 ? (
            <>
              <BarChart values={values} labels={labels} />
              <LineChart values={values} labels={labels} />
              <PieChart values={values} labels={labels} />
            </>
          ) : (
            <h1>Please select currency to compare</h1>
          )}
        </div>
        <div className="history-container">
          <List
            header={<div>Search History</div>}
            bordered
            dataSource={history}
            renderItem={(item) => (
              <List.Item onClick={() => getSearchResults(item.currencies)}>
                <List.Item.Meta
                  title={<span>{item.currencies.join(" vs ")}</span>}
                  description={moment(item.createdAt).fromNow()}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
