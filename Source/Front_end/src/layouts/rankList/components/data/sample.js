export default function data() {
	return {
		columns: [
			{ Header: "", accessor: "icon" },
			{ Header: "ID", accessor: "id" },
			{ Header: "Name", accessor: "name" },
			{ Header: "Landline", accessor: "landline" },
			{ Header: "Email", accessor: "email" },
			{ Header: "Mobile Phone", accessor: "mobile_phone" },
			{ Header: "Type", accessor: "customer_type" },
			{ Header: "Company Details", accessor: "company_details" },
			{ Header: "Lead Source", accessor: "lead_source" },
			{ Header: "Address", accessor: "address" },
			{ Header: "Industry", accessor: "customer_industry" },
			{ Header: "Principle", accessor: "principle" },
			{ Header: "Status", accessor: "follow_up_status" },
		],

		rows: [],
	};
}
