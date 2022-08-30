import Layout, { Content, Header } from "antd/lib/layout/layout";
import React from "react";
import { Typography, Divider, Table, message, Modal, Button, Spin } from "antd";
import config from "../../config";
import Column from "antd/lib/table/Column";
import { Column as BarChart, ColumnConfig } from "@ant-design/plots";
import { BarChartOutlined } from "@ant-design/icons";
const { Title } = Typography;

interface Data {
	prem_id: string;
	total_animals: number;
}
interface Premise {
	address: string;
	city: string;
	name: string;
	postal_code: number;
	prem_id: string;
	state: string;
	total_animals: number;
}
interface PopulationState {
	data: Premise[];
	filteredData: Premise[];
	graphData: Data[];
	displayGraph: boolean;
	loading: boolean;
}
type PopulationProps = any;

export default class Population extends React.Component<PopulationProps, PopulationState> {
	constructor(props: PopulationProps) {
		super(props);
		this.state = {
			data: [],
			filteredData: [],
			graphData: [],
			displayGraph: false,
			loading: false,
		};
	}
	onClose = () => {
		this.setState({ displayGraph: false });
	};
	onDisplayGraph = () => {
		this.setState({ displayGraph: true });
	};
	fetchPopulationData = () => {
		this.setState({ loading: true });
		let url = `${config.baseUrl}/get_population_data`;
		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
		})
			.then((res) => res.json())
			.then((response) => {
				if (response.status) {
					this.setState({ data: response.data, filteredData: response.data, graphData: response.data });
				} else {
					message.error(response.data, 1);
				}
				this.setState({ loading: false });
			})
			.catch((err) => console.log(err));
	};
	componentDidMount() {
		this.fetchPopulationData();
	}
	render(): React.ReactNode {
		const barchart_config: ColumnConfig = {
			data: this.state.graphData,
			xField: "prem_id",
			yField: "total_animals",
			label: {
				position: "middle",
				style: {
					fill: "#FFFFFF",
					opacity: 0.8,
				},
			},
			xAxis: {
				label: {
					// autoHide: true,
					autoRotate: true,
				},
			},
			meta: {
				prem_id: {
					alias: "Name",
				},
				total_animals: {
					alias: "Animals",
				},
			},
		};
		return (
			<Layout>
				<Header style={{ backgroundColor: "white" }}>
					<Title style={{ float: "left", marginTop: "15px" }} level={4}>
						Population Data
					</Title>
					<Button style={{ float: "right", marginTop: "15px" }} icon={<BarChartOutlined />} type="primary" onClick={this.onDisplayGraph}>
						Visualize
					</Button>
				</Header>
				<Divider></Divider>
				<Content>
					<Modal
						width={1000}
						title="Bar Chart"
						visible={this.state.displayGraph}
						onCancel={this.onClose}
						footer={null}
						maskClosable={false}
						centered={true}>
						{this.state.loading ? <Spin></Spin> : <BarChart {...barchart_config}></BarChart>}
					</Modal>
					<Table loading={this.state.loading} size="small" dataSource={this.state.filteredData}>
						<Column title="Premise ID" dataIndex="prem_id" key="prem_id" />
						<Column title="Name" dataIndex="name" key="name" />
						<Column title="Address" dataIndex="address" key="address" />
						<Column title="City" dataIndex="city" key="city" />
						<Column title="Postal Code" dataIndex="postal_code" key="postal_code" />
						<Column title="State" dataIndex="state" key="state" />
						<Column title="Total Animals" dataIndex="total_animals" key="total_animals" />
					</Table>
				</Content>
			</Layout>
		);
	}
}
