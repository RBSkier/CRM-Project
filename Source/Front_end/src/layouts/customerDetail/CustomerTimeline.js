import React from "react";
import PropTypes from "prop-types";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "examples/Timeline/TimelineItem"; // 引入自定义TimelineItem

function CustomerTimeline({ followUpLog }) {
  return (
    <Timeline align="left">
      {followUpLog.map((log, index) => (
        <TimelineItem
          key={index}
          color="info"
          icon="notifications"
          title={`${log.title} - By ${log.principal}`}
          dateTime={new Date(log.time).toLocaleString()}
          description={`${log.content}`}
          lastItem={index === followUpLog.length - 1}
        />
      ))}
    </Timeline>
  );
}

CustomerTimeline.propTypes = {
  followUpLog: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      principal: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      next_time: PropTypes.string,
    })
  ).isRequired,
};

export default CustomerTimeline;
