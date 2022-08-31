import React, { useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import config from "../../config";
import { Marker } from "@react-google-maps/api";

const containerStyle = {
	width: "500px",
	height: "500px",
};

interface MapProps {
	markers: LatLong[];
}
interface LatLong {
	lat: number;
	lng: number;
	label: string;
}
const Map: React.FC<MapProps> = (props: MapProps) => {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: config.API_KEY,
	});
	const [, setMap] = useState<google.maps.Map>();
	const onLoad = React.useCallback(function callback(map: google.maps.Map): void {
		const bounds = new window.google.maps.LatLngBounds(props.markers[0]);
		map.fitBounds(bounds);
		map.setZoom(2);
		setMap(map);
	}, []);

	const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
		setMap(undefined);
	}, []);
	return isLoaded ? (
		<GoogleMap mapContainerStyle={containerStyle} center={props.markers[0]} zoom={3} onLoad={onLoad} onUnmount={onUnmount}>
			{props.markers.map((marker) => {
				return (
					<>
						<Marker
							label={marker.label}
							key={marker.lat}
							icon={{
								path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
								scale: 2,
								strokeColor: "red",
							}}
							position={marker}
						/>
					</>
				);
			})}
		</GoogleMap>
	) : (
		<></>
	);
};

export default React.memo(Map);
