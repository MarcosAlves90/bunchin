import { useEffect, useRef, useContext, useMemo } from 'react';
import L from 'leaflet';
import { UserContext } from '../../utils/context/userContext';

interface MapViewProps {
    latitude: number;
    longitude: number;
    zoom?: number;
    height?: string;
    width?: string;
}

export default function MapView({
    latitude,
    longitude,
    zoom = 15,
    height = '300px',
    width = '100%'
}: MapViewProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const { tema } = useContext(UserContext);

    const mapConfig = useMemo(() => ({
        icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        }),
        tileLayer: {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        popup: {
            content: '<div>Faculdade de Tecnologia de Mauá</div>',
            className: tema === 'light' ? 'custom-popup-light' : 'custom-popup-dark'
        }
    }), [tema]);

    useEffect(() => {
        if (!mapRef.current) return;

        const map = L.map(mapRef.current).setView([latitude, longitude], zoom);
        
        L.tileLayer(mapConfig.tileLayer.url, { attribution: mapConfig.tileLayer.attribution }).addTo(map);
        
        L.marker([latitude, longitude], { icon: mapConfig.icon })
            .addTo(map)
            .bindPopup(mapConfig.popup.content, { className: mapConfig.popup.className })
            .openPopup();

        mapInstanceRef.current = map;
        return () => {
            map.remove();
        };
    }, [latitude, longitude, zoom, mapConfig]);

    return (
        <div
            ref={mapRef}
            style={{ height, width }}
            className={`rounded-sm border border-secondary z-1 ${tema === 'dark' ? 'dark-map' : ''}`}
        />
    );
}
