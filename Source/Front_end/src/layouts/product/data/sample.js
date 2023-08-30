export default function productData() {
	return {
		columns: [
			{ Header: "ID", accessor: "product_id" },
			{ Header: "Product Name", accessor: "product_name" },
			{ Header: "Category", accessor: "product_category" },
			{ Header: "Description", accessor: "product_description" },
			{ Header: "Unit", accessor: "product_unit" },
			{ Header: "Product Code", accessor: "product_code" },
			{ Header: "Price", accessor: "price" },
			{ Header: "Cost", accessor: "cost" },
			{ Header: "Inventory Quantity", accessor: "inventory_quantity" },
			{ Header: "Sales Region", accessor: "sales_region" },
		],
		rows: [],
	};
}
