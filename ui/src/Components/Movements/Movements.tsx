import Layout, { Content, Header } from "antd/lib/layout/layout";
import { Typography, Divider, Table, message, Modal, Button, Popover, Descriptions } from "antd";
import { PushpinOutlined, TransactionOutlined } from "@ant-design/icons";
import Column from "antd/lib/table/Column";
import React from "react";
import config from "../../config";
import Graph from "react-graph-vis";
import Map from "../Graphs/Map";

const { Title } = Typography;
interface Transfer {
	company: string;
	count_items_moved: number;
	destination_lat: number;
	destination_long: number;
	destination_name: string;
	destination_prem_id: string;
	origin_lat: number;
	origin_long: number;
	origin_name: string;
	origin_prem_id: string;
	reason: string;
	shipment_start_date: Date;
	species: string;
}
interface Premise {
	prem_id: string;
	name: string;
	lat: number;
	long: number;
}
interface MovementsState {
	data: Transfer[];
	filteredData: Transfer[];
	loading: boolean;
	displayMap: boolean;
	displayMovements: boolean;
	premisesData: Premise[];
}
type MovementProps = any;
export default class Movements extends React.Component<MovementProps, MovementsState> {
	constructor(props: MovementProps) {
		super(props);
		this.state = {
			data: [],
			filteredData: [],
			premisesData: [],
			loading: false,
			displayMap: false,
			displayMovements: false,
		};
	}
	onDisplayMap = () => {
		this.setState({ displayMap: true });
	};
	onDisplayMovements = () => {
		this.setState({ displayMovements: true });
	};
	onClose = () => {
		this.setState({ displayMap: false, displayMovements: false });
	};
	componentDidMount() {
		this.fetchMovementsData();
		this.fetchPremiseData();
	}
	fetchMovementsData = () => {
		this.setState({ loading: true });
		let url = `${config.baseUrl}/get_movements_data`;
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
					this.setState({ data: response.data, filteredData: response.data });
				} else {
					message.error(response.data, 1);
				}
				this.setState({ loading: false });
			})
			.catch((err) => console.log(err));
	};
	fetchPremiseData = () => {
		this.setState({ loading: true });
		let url = `${config.baseUrl}/get_premises_data`;
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
					this.setState({ premisesData: response.data });
				} else {
					message.error(response.data, 1);
				}
				this.setState({ loading: false });
			})
			.catch((err) => console.log(err));
	};
	render(): React.ReactNode {
		let nodes = this.state.premisesData.map((item) => {
			return {
				id: item.prem_id,
				label: item.name,
				title: item.name,
			};
		});

		let edges = this.state.data.map((item) => {
			return {
				from: item.origin_prem_id,
				to: item.destination_prem_id,
				label: item.count_items_moved,
			};
		});
		let markers = this.state.premisesData.map((item) => {
			return {
				lat: item.lat,
				lng: item.long,
				label: item.prem_id,
			};
		});
		let graph = { nodes: nodes, edges: edges };
		const options = {
			layout: {
				hierarchical: true,
			},
			edges: {
				color: "#000000",
			},
			height: "500px",
		};
		return (
			<Layout>
				<Header style={{ backgroundColor: "white" }}>
					<Title style={{ float: "left", marginTop: "15px" }} level={4}>
						Movements Data
					</Title>
					<Button style={{ float: "right", marginTop: "15px" }} icon={<TransactionOutlined />} type="primary" onClick={this.onDisplayMovements}>
						Visualize Movements
					</Button>

					<Button
						style={{ float: "right", marginTop: "15px", marginRight: "5px" }}
						icon={<PushpinOutlined />}
						type="primary"
						onClick={this.onDisplayMap}>
						Map
					</Button>
				</Header>
				<Divider></Divider>
				<Content>
					<Modal
						width={1500}
						title="Map"
						visible={this.state.displayMovements}
						onCancel={this.onClose}
						footer={null}
						maskClosable={false}
						centered={true}>
						={" "}
						<Layout>
							<Graph graph={graph} options={options} />
						</Layout>
						{/* </div> */}
					</Modal>
					<Modal title="Map" width={550} visible={this.state.displayMap} onCancel={this.onClose} footer={null} maskClosable={false} centered={true}>
						<Layout>
							<Map markers={markers}></Map>
						</Layout>

						{/* </div> */}
					</Modal>
					<Table
						bordered={true}
						loading={this.state.loading}
						size="small"
						dataSource={this.state.filteredData}
						rowKey={(record) => record.origin_prem_id}>
						<Column
							title="Origin"
							key="origin_prem_id"
							render={(record) => {
								return (
									<Popover
										placement="bottomRight"
										content={
											<Descriptions bordered={true} title={record.origin_name} size="small" colon={false}>
												<Descriptions.Item label="Premise ID">{record.origin_prem_id}</Descriptions.Item>
												<Descriptions.Item label="Address">{record.origin_address}</Descriptions.Item>
												<Descriptions.Item label="City">{record.origin_city}</Descriptions.Item>
												<Descriptions.Item label="State">{record.origin_state}</Descriptions.Item>
												<Descriptions.Item label="Postal Code">{record.origin_postal_code}</Descriptions.Item>
												<Descriptions.Item label="Lat">{record.origin_lat}</Descriptions.Item>
												<Descriptions.Item label="Long">{record.origin_long}</Descriptions.Item>
											</Descriptions>
										}
										trigger="click">
										<Button type="link">{record.origin_prem_id}</Button>
									</Popover>
								);
							}}
						/>
						<Column
							title="Destination"
							key="destination_prem_id"
							render={(record) => {
								return (
									<Popover
										placement="bottomRight"
										content={
											<Descriptions bordered={true} title={record.destination_name} size="small" colon={false}>
												<Descriptions.Item label="Premise ID">{record.destination_prem_id}</Descriptions.Item>
												<Descriptions.Item label="Address">{record.destination_address}</Descriptions.Item>
												<Descriptions.Item label="City">{record.destination_city}</Descriptions.Item>
												<Descriptions.Item label="State">{record.destination_state}</Descriptions.Item>
												<Descriptions.Item label="Postal Code">{record.destination_postal_code}</Descriptions.Item>
												<Descriptions.Item label="Lat">{record.destination_lat}</Descriptions.Item>
												<Descriptions.Item label="Long">{record.destination_long}</Descriptions.Item>
											</Descriptions>
										}
										trigger="click">
										<Button type="link">{record.destination_prem_id}</Button>
									</Popover>
								);
							}}
						/>
						<Column title="Count Items Moved" dataIndex="count_items_moved" key="count_items_moved" />
						<Column title="Reason" dataIndex="reason" key="reason" />
						<Column title="Shipment Start Date" dataIndex="shipment_start_date" key="shipment_start_date" />
						<Column title="Company" dataIndex="company" key="company" />
					</Table>
				</Content>
			</Layout>
		);
	}
}
