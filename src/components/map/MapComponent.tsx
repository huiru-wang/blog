"use client"
import { useEffect, useMemo, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import "@/styles/map-container.css";
import { MapMarker } from './MapMarker';
import { TravelMarker } from '@/lib/types';
export default function MapComponent(
    { travelMarkers, setShowSidebar, setSelectedMarker }:
        {
            travelMarkers: TravelMarker[],
            setShowSidebar: (show: boolean) => void,
            setSelectedMarker: (marker: TravelMarker) => void
        }
) {

    const mapRef = useRef(null);

    // 染色城市
    const coloringCityMap = useMemo(() => {
        const map: Record<string, { SOC: string, city: string, depth: number }> = {};
        travelMarkers.forEach(item => {
            const { city, SOC, depth } = item;
            if (map[city]) {
                const existingDepth = map[city].depth;
                map[city].depth = Math.max(existingDepth, depth);
            } else {
                map[city] = {
                    SOC: SOC,
                    city: city,
                    depth: depth,
                };
            }
        });
        return map;
    }, [travelMarkers]);

    // 染色国家
    const coloringCountries = useMemo(() => {
        return new Set(travelMarkers.map(item => item.SOC));
    }, [travelMarkers]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('@amap/amap-jsapi-loader').then(AMapLoader => {
                AMapLoader.load({
                    key: process.env.NEXT_PUBLIC_AMAP_KEY || '',
                    version: '2.0',
                }).then(() => {
                    if (mapRef.current) {
                        // @ts-expect-error: AMap.DistrictLayer.Country is not recognized by TypeScript
                        const chinaDis = new AMap.DistrictLayer.Country({
                            zIndex: 10,
                            SOC: 'CHN',
                            depth: 2,
                            zooms: [4, 9],
                            styles: {
                                // @typescript-eslint/no-explicit-any
                                'fill': function (props: any) {
                                    if (props.SOC !== "CHN") {
                                        return "rgb(227,227,227)";
                                    }
                                    if (coloringCityMap[props.NAME_CHN]) {
                                        const city = coloringCityMap[props.NAME_CHN];
                                        const depth = city.depth;
                                        const rg = 255 - Math.floor((depth - 5) / 5 * 255);
                                        return 'rgb(' + rg + ',' + rg + ',255)';
                                    }
                                    return "rgb(227,227,227)";
                                }
                            }
                        });
                        // @ts-expect-error: AMap.DistrictLayer.Country is not recognized by TypeScript
                        const worldDis = new AMap.DistrictLayer.World({
                            zIndex: 10,
                            zooms: [1, 4],
                            styles: {
                                'stroke-width': 0.8,
                                'fill': function (d: any) {
                                    if (coloringCountries.has(d.SOC)) {
                                        return '#41ae76';
                                    }
                                    return '#f7fcfd';
                                },
                                'coastline-stroke': 'rgba(0,0,0,0)',
                                'nation-stroke': '#09f',
                            }
                        });
                        const map = new AMap.Map(mapRef.current, {
                            viewMode: '2D',
                            center: [118.833954, 32.108711],
                            zooms: [3.5, 15],
                            zoom: 3.5,
                            features: ["bg", "point", "building"],
                            layers: [
                                chinaDis,
                                worldDis,
                                // @ts-expect-error: AMap.DistrictLayer.Country is not recognized by TypeScript
                                AMap.createDefaultLayer(),
                            ],

                            doubleClickZoom: false,
                        });

                        travelMarkers.forEach(item => {
                            const { position, iconImg, zooms, title } = item;
                            const content = renderToString(<MapMarker iconImg={iconImg} />);
                            const marker = new AMap.Marker({
                                position: new AMap.LngLat(position[0], position[1], true),
                                zooms: zooms.length === 2 ? [zooms[0], zooms[1]] : [0, 0],
                                content: content,
                                title: title,    // 鼠标滑过点标记时的文字提示
                                anchor: 'bottom-center',
                                clickable: true, // 是否可点击
                                draggable: false, // 是否可拖动
                                zoomEnable: true,
                                scrollWheel: false,
                                label: {          // 文本标注
                                    content: "",
                                    direction: "right"
                                }
                            });
                            marker.on('click', () => {
                                setShowSidebar(true);
                                setSelectedMarker(item);
                            });

                            marker.on('touchend', () => {
                                setShowSidebar(true);
                                setSelectedMarker(item);
                            });
                            map.add(marker);
                        });
                    }
                });
            });
        }
    }, [coloringCityMap, coloringCountries]);

    return (
        <div
            id="container"
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
        />
    );
}