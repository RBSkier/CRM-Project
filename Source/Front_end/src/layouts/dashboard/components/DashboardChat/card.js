import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Gauge = ({ value }) => {
	const chartRef = useRef(null);

	useEffect(() => {
		const chart = echarts.init(chartRef.current);

		const resizeObserver = new ResizeObserver(() => {
			chart.resize();
		});

		resizeObserver.observe(chartRef.current);

		const option = {
			series: [
				{
					type: 'gauge',
					startAngle: 180,
					endAngle: 0,
					center: ['50%', '65%'],
					radius: '90%',
					min: 0,
					max: 1,
					splitNumber: 8,
					axisLine: {
						lineStyle: {
							width: 6,
							color: [
								[0.25, '#FF6E76'],
								[0.5, '#FDDD60'],
								[0.75, '#58D9F9'],
								[1, '#7CFFB2']
							]
						}
					},
					pointer: {
						icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
						length: '12%',
						width: 20,
						offsetCenter: [0, '-60%'],
						itemStyle: {
							color: 'auto'
						}
					},
					axisTick: {
						length: 12,
						lineStyle: {
							color: 'auto',
							width: 2
						}
					},

					splitLine: {
						length: 20,
						lineStyle: {
							color: 'auto',
							width: 5
						}
					},
					axisLabel: {
						color: 'rgba(255, 255, 255, 0.8)',
						fontSize: 20,
						distance: -60,
						rotate: 'tangential',
						formatter: function (val) {
							if (val === 0.875) {
								return 'Excellent';
							} else if (val === 0.625) {
								return 'Good';
							} else if (val === 0.375) {
								return 'Fair';
							} else if (val === 0.125) {
								return 'Poor';
							}
							return '';
						}
					},
					title: {
						offsetCenter: [0, '-10%'],
						fontSize: 20,
						color: 'rgba(255, 255, 255, 0.8)'
					},
					detail: {
						fontSize: 30,
						offsetCenter: [0, '-35%'],
						valueAnimation: true,
						formatter: function (val) {
							return Math.round(val * 100) + '%';
						},
						color: 'inherit'
					},
					data: [
						{
							value: value,
							name: 'KPI'
						}
					]
				}
			]
		};

		chart.setOption(option);

		return () => {
			if (chartRef.current) {
				resizeObserver.unobserve(chartRef.current);
			}
			chart.dispose();
		};
	}, [value]);

	return <div ref={chartRef} style={{ width: '100%', height: '350px' }} />;
};

export default Gauge;