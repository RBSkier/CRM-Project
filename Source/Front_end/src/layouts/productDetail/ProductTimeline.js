import React from "react";
import PropTypes from "prop-types";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "examples/Timeline/TimelineItem"; // 引入自定义TimelineItem

function ProductTimeline({ salesLog }) {
	return (
		<Timeline align="left">
			{salesLog.map((log, index) => (
				<TimelineItem
					key={index}
					color="info"
					icon="shopping_cart" // Assuming the "shopping_cart" icon represents a sale
					title={`Quantity Sold: ${log.sales_quantity} - By ${log.sales_person}`}
					dateTime={new Date(log.sales_date).toLocaleString()}
					lastItem={index === salesLog.length - 1}
				/>
			))}
		</Timeline>
	);
}

ProductTimeline.propTypes = {
	salesLog: PropTypes.arrayOf(
		PropTypes.shape({
			sales_id: PropTypes.number.isRequired,
			sales_person: PropTypes.string.isRequired,
			sales_quantity: PropTypes.number.isRequired,
			sales_date: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default ProductTimeline;
