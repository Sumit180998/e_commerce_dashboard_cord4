import { useState } from "react";
import { Table, Input, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { detail, productsData, salesData } from "./Data/productsData";
import { useNavigate } from "react-router-dom";
import InventoryModal from "./InventoryModal";
import OrderSummaryCard from "./Card.js/OrderSummaryCard";
import SalesAnalyticsChart from "./Card.js/SalesAnalyticsChart";
import UserProfileDropdown from "./Profile/UserProfileDropdown";


export default function ProductTable() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(productsData);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const itemsPerPage = 5;

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  function addInventory() {
    setInitialData(null);
    setOpen(true);
  }

  function edit(record) {
    setInitialData({ ...record });
    setOpen(true);
  }

  function addOrUpdate(value) {
    if (initialData === null) {
      setProducts([value, ...products]);
    } else {
      const updatedProducts = products.map((item) => (item.id === value.id ? value : item));
      setProducts(updatedProducts);
    }
  }

  const sortedProducts = sortKey
    ? [...filteredProducts].sort((a, b) => {
        if (sortKey === "status") {
          return a.status.localeCompare(b.status);
        }
        return a[sortKey] > b[sortKey] ? 1 : -1;
      })
    : filteredProducts;

  const columns = [
    {
      title: "Product Image",
      dataIndex: "image",
      render: (src) => <img src={src} alt="product" className="w-12 h-12" />,
    },
    {
      title: "Product Name",
      dataIndex: "name",
    },
    {
      title: "SKU",
      dataIndex: "sku",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: () => setSortKey("price"),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      sorter: () => setSortKey("stock"),
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: () => setSortKey("status"),
      render: (status) => (
        <span className={status === "Active" ? "text-success" : "text-danger"}>
          {status}
        </span>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} className="me-2" onClick={() => edit(record)} />
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
        </>
      ),
    },
  ];

  return (
    <div className="container-fluid p-4">
     
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid" >
          <UserProfileDropdown />
        </div>
      </nav>


      <div className="row mb-3">
        <div className="col-md-6">
          <Button type="primary" onClick={addInventory}>
            Add Inventory
          </Button>
        </div>
        <div className="col-md-6 text-end">
          <Input
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-50"
          />
        </div>
      </div>

     
      <Table
        columns={columns}
        dataSource={sortedProducts}
        pagination={{ pageSize: itemsPerPage, current: currentPage, onChange: setCurrentPage }}
        rowKey="id"
      />

    
      <InventoryModal
        isOpen={open}
        onClose={setOpen}
        onSubmit={addOrUpdate}
        initialData={initialData}
      />

    
      <div className="row mt-4">
        <div className="col-md-6">
          <OrderSummaryCard
            totalOrders={detail.totalOrders}
            pendingOrders={detail.pendingOrders}
            completedOrders={detail.completedOrders}
            revenue={detail.revenue}
          />
        </div>
        <div className="col-md-6">
          <SalesAnalyticsChart data={salesData} />
        </div>
      </div>
    </div>
  );
}


