export default function data() {
	return {
		columns: [
			{ Header: "Task ID", accessor: "task_id" },
			{ Header: "Title", accessor: "task_title" },
			{ Header: "Description", accessor: "task_description" },
			{ Header: "Priority", accessor: "priority" },
			{ Header: "Start Date", accessor: "start_date" },
			{ Header: "Due Date", accessor: "due_date" },
			{ Header: "Status", accessor: "status" },
			{ Header: "Principal", accessor: "principal" },
			{ Header: "Sub-tasks", accessor: "sub_task_amount" },
		],

		rows: [],
	};
}
