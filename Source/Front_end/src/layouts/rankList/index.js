

// @mui material components


// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Images
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import ComplexStatisticsCard from "./components/StatisticsCards/ComplexStatisticsCard";
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import StarRateIcon from '@mui/icons-material/StarRate';
import PersonIcon from '@mui/icons-material/Person';
import React, {useEffect, useState} from "react";
import {getMyselfRank, getRank} from "../../api/dashboardApi";
import Card from "@mui/material/Card";
import MDTypography from "../../components/MDTypography";
import MoreComplexStatisticsCard from "./components/StatisticsCards/MoreComplexStatisticsCard";
import RankList from "./components/RankList";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

function Cover() {
	const mockData = [
		{ rank: 1, name: "User 1", points: 500 },
		{ rank: 2, name: "User 2", points: 450 },
		{ rank: 3, name: "User 3", points: 400 },
		{ rank: 4, name: "User 4", points: 350 },
		{ rank: 5, name: "User 5", points: 300 },
		{ rank: 6, name: "User 6", points: 250 },
		{ rank: 7, name: "User 7", points: 200 },
		{ rank: 8, name: "User 8", points: 150 },
		{ rank: 9, name: "User 9", points: 100 },
		{ rank: 10, name: "User 10", points: 50 },
	];
	const [rankData, setRankData] = useState([]);
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		// 获取用户数据
		const fetchUserData = async () => {
			try {
				const data = await getMyselfRank();
				console.log(data);
				setUserData(data);
			} catch (error) {
				console.error("Error while getting user data: ", error);
			}
		};

		// 获取排名数据
		const fetchRankData = async () => {
			try {
				const data = await getRank();
				setRankData(data);
			} catch (error) {
				console.error("Error while getting rank data: ", error);
			}
		};

		fetchUserData();
		fetchRankData();
	}, []);

	return (
		<DashboardLayout>
			<DashboardNavbar/>
			<MDBox py={3}>
				<Grid container spacing={3}>
					<Grid item lg={4}>
						<MDBox mb={3}>
							<ComplexStatisticsCard
								color="dark"
								icon={<PersonIcon/>}
								title="User Name"
								count={userData?.user_name || "Loading..."}
							/>
						</MDBox>
						<MDBox mb={3}>
							<ComplexStatisticsCard
								color="dark"
								icon={<MilitaryTechIcon/>}
								title="My Rank"
								count={userData?.rank || "Loading..."}
							/>
						</MDBox>
						<MDBox mb={3}>
							<MoreComplexStatisticsCard
								color="dark"
								icon={<StarRateIcon/>}
								title="My Points"
								count={userData?.score !== undefined ? userData.score : "Loading..."}
							/>
						</MDBox>
					</Grid>
					<Grid item lg={8}>
						<Card>
							<MDTypography p={2.2} variant="h5" textTransform="capitalize">
								This Month's Reword
							</MDTypography>
							<MDBox m={2}>
								<Grid container spacing={3}>
									<Grid item lg={4}>
										<MDBox mb={1.5}>
											<ComplexStatisticsCard
												color="dark"
												icon={<StarRateIcon/>}
												title="150 Points"
												count="¥10,000"
											/>
										</MDBox>
									</Grid>
									<Grid item lg={4}>
										<MDBox mb={1.5}>
											<ComplexStatisticsCard
												color="dark"
												icon={<StarRateIcon/>}
												title="100 Points"
												count="¥8,000"
											/>
										</MDBox>
									</Grid>
									<Grid item lg={4}>
										<MDBox mb={1.5}>
											<ComplexStatisticsCard
												color="dark"
												icon={<StarRateIcon/>}
												title="80 Points"
												count="¥5,000"
											/>
										</MDBox>
									</Grid>
									<Grid item lg={4}>
										<MDBox mb={1.5}>
											<ComplexStatisticsCard
												color="dark"
												icon={<StarRateIcon/>}
												title="50 Points"
												count="¥3,000"
											/>
										</MDBox>
									</Grid>
									<Grid item lg={4}>
										<MDBox mb={1.5}>
											<ComplexStatisticsCard
												color="dark"
												icon={<StarRateIcon/>}
												title="30 Points"
												count="¥1,000"
											/>
										</MDBox>
									</Grid>
									<Grid item lg={4}>
										<MDBox mb={1.5}>
											<ComplexStatisticsCard
												color="dark"
												icon={<StarRateIcon/>}
												title="10 Points"
												count="¥500"
											/>
										</MDBox>
									</Grid>
								</Grid>
							</MDBox>
						</Card>
					</Grid>
					<Grid item lg={12}>
						<Card>

								<MDTypography p={2} variant="h5" textTransform="capitalize">
									Points Leaderboard (Top 10)
								</MDTypography>
							<MDBox mx={3} mb={3}>
								<Grid container spacing={2}>
									{rankData.map((user, index) => (
										<Grid item xs={6} key={index}>
											<Card>
												<CardContent>
													<MDTypography variant="h5">
														{user.rank === 1 ? <EmojiEventsIcon /> : null} {user.rank} {user.name} : {user.score}
													</MDTypography>
												</CardContent>
											</Card>
										</Grid>
									))}
								</Grid>
							</MDBox>

						</Card>
					</Grid>
				</Grid>
			</MDBox>
		</DashboardLayout>
	);
}

export default Cover;
