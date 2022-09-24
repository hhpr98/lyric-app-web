import 'antd/dist/antd.css';
import { Input, Row, Col, Table, Space, Button, } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import swal from 'sweetalert';
import lyricdata from "./data/2020-11-26 21h56m17s.json";
import { useEffect, useState } from 'react';

const { Search } = Input;

function App() {

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  useEffect(() => {
    setData(lyricdata);
  }, []);

  const onSearch = value => {

    if (value === "") {
      setData(lyricdata);
      return;
    }

    const dataSearch = lyricdata.filter(item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) || item.composer.toLocaleLowerCase().includes(value.toLocaleLowerCase()));

    if (dataSearch.length === 0) {
      setData([]);
      swal({
        title: "Thông báo",
        text: "Không tìm thấy bài hát!",
        icon: "error",
        button: "Đồng ý",
      });
    } else {
      setData(dataSearch);
      console.log(data);
      swal({
        title: "Thông báo",
        text: "Thành công!",
        icon: "success",
        button: "Đồng ý",
      });
    }

  }

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={"Tìm kiếm ..."}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
          text
        ),
  });

  let searchInput = "";
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
    },
    {
      title: 'Tên bài hát',
      dataIndex: 'name',
      key: 'name',
      width: '50%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Nhạc sĩ',
      dataIndex: 'composer',
      key: 'composer',
      width: '40%',
      ...getColumnSearchProps('composer'),
    }
  ];

  return (
    <Row>
      <Col span={16} offset={4} style={{ marginTop: "50px" }}>
        <Search
          placeholder="Nhập tên bài hát..."
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={onSearch}
        />
      </Col>
      <Col span={16} offset={4} style={{ marginTop: "50px" }}>
        <Table columns={columns} dataSource={data} />
      </Col>
    </Row>
  );
}

export default App;