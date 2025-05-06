"use client"
import { useEffect, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import "@/styles/map-container.css";
import { journeyPoints } from '@/lib/data';
import { MapMarker } from '@/components/map/MapMarker';
export default function JourneyMap() {

    const mapRef = useRef(null);

    useEffect(() => {
        const coloringCityMap = {};
        journeyPoints.forEach(item => {
            const { city, SOC, depth } = item;
            if (coloringCityMap[city]) {
                const existingDepth = coloringCityMap[city].depth;
                coloringCityMap[city].depth = Math.max(existingDepth, depth);
            } else {
                coloringCityMap[city] = {
                    SOC: SOC,
                    city: city,
                    depth: depth,
                };
            }
        });
        const coloringCountries = new Set();
        journeyPoints.forEach(item => {
            coloringCountries.add(item.SOC);
        });

        if (typeof window !== 'undefined') {
            import('@amap/amap-jsapi-loader').then(AMapLoader => {
                AMapLoader.load({
                    key: 'b21c0d603c52798b7947fe3ddc842e78',
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
                                'fill': function (props) {
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
                                'fill': function (d) {
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
                            center: [106.259126, 37.472641],
                            zooms: [3.5, 15],
                            zoom: 4.5,
                            features: ["bg", "point", "building"],
                            layers: [
                                chinaDis,
                                worldDis,
                                // @ts-expect-error: AMap.DistrictLayer.Country is not recognized by TypeScript
                                AMap.createDefaultLayer(),
                            ],
                        });

                        journeyPoints.forEach(item => {
                            const { Latitude, Longitude, iconImg, popupInfo, zooms } = item;
                            const content = renderToString(<MapMarker iconImg={iconImg} popupInfo={popupInfo} />);
                            const marker = new AMap.Marker({
                                position: new AMap.LngLat(Longitude, Latitude),
                                zooms: zooms.length === 2 ? [zooms[0], zooms[1]] : [0, 0],
                                content: content,
                                title: "",    // 鼠标滑过点标记时的文字提示
                                anchor: 'bottom-center',
                                clickable: true, // 是否可点击
                                draggable: false, // 是否可拖动
                                label: {          // 文本标注
                                    content: "",
                                    direction: "right"
                                }
                            });
                            map.add(marker);
                        });
                    }
                });
            });
        }
    }, []);

    return (
        <div
            id="container"
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
        />
    );
}