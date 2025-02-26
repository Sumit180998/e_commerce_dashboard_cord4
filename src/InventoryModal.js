import React, { useState, useEffect } from "react";
import { Modal, Input, Switch, Button, Form } from "antd";
import { v4 as uuid } from "uuid";

const InventoryModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        id: initialData.id || uuid().slice(0, 8),
        name: initialData.name || "",
        sku: initialData.sku || "",
        price: initialData.price || "",
        stock: initialData.stock || "",
        status: initialData.status === "Active",
        image: initialData.image || "",
      });
    } else {
      form.resetFields(); // Reset the form when adding new inventory
    }
  }, [initialData, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const formattedValues = {
          ...values,
          price: Number(values.price),
          stock: Number(values.stock),
          status: values.status ? "Active" : "Inactive",
        };
        console.log("Formatted Values:", formattedValues); // Debugging
        setLoading(true);
        setTimeout(() => {
          onSubmit(formattedValues); // Ensure data is sent back
          setLoading(false);
          onClose(false);
        }, 1000);
      })
      .catch((error) => console.log("Validation Error:", error));
  };

  return (
    <Modal
      title={initialData ? "Update Inventory" : "Add Inventory"}
      open={isOpen}
      onCancel={() => onClose(false)}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="image" label="Image URL">
          <Input placeholder="Enter image URL" />
        </Form.Item>
        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: "Product name is required" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>
        <Form.Item
          name="sku"
          label="SKU"
          rules={[{ required: true, message: "SKU is required" }]}
        >
          <Input placeholder="Enter SKU" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[
            { required: true, message: "Enter a valid price" },
            {
              validator: (_, value) =>
                !isNaN(value) && Number(value) > 0
                  ? Promise.resolve()
                  : Promise.reject(new Error("Enter a valid price")),
            },
          ]}
        >
          <Input placeholder="Enter price" />
        </Form.Item>
        <Form.Item
          name="stock"
          label="Stock Quantity"
          rules={[
            { required: true, message: "Enter a valid stock quantity" },
            {
              validator: (_, value) =>
                !isNaN(value) && Number(value) >= 0
                  ? Promise.resolve()
                  : Promise.reject(new Error("Enter a valid stock quantity")),
            },
          ]}
        >
          <Input placeholder="Enter stock quantity" />
        </Form.Item>
        <Form.Item name="status" label="Status" valuePropName="checked">
          <Switch />
        </Form.Item>
        <div className="modal-footer">
          <Button onClick={() => onClose(false)}>Cancel</Button>
          <Button type="primary" onClick={handleSubmit} loading={loading}>
            {loading ? "Saving..." : "Submit"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default InventoryModal;



