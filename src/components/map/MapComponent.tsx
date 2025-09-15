"use client"
import { useEffect, useMemo, useRef, useCallback } from 'react';
import { renderToString } from 'react-dom/server';
import "@/styles/map-container.css";
import { MapMarker } from './MapMarker';
import { TravelMarker } from '@/lib/types';

// 防抖函数
function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
    let timeout: NodeJS.Timeout;
    return ((...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    }) as T;
}

export default function MapComponent(
    { travelMarkers, setShowSidebar, setSelectedMarker }:
        {
            travelMarkers: TravelMarker[],
            setShowSidebar: (show: boolean) => void,
            setSelectedMarker: (marker: TravelMarker) => void
        }
) {

    const mapRef = useRef<any>(null);
    const markersRef = useRef<any[]>([]);
    const isMapInitialized = useRef(false);

    // 染色城市 - 使用useMemo缓存计算结果
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

    // 染色国家 - 使用useMemo缓存计算结果
    const coloringCountries = useMemo(() => {
        return new Set(travelMarkers.map(item => item.SOC));
    }, [travelMarkers]);

    // 预渲染标记点内容，避免重复渲染
    const markerContents = useMemo(() => {
        return travelMarkers.map(item => ({
            ...item,
            content: renderToString(<MapMarker iconImg={item.iconImg} />)
        }));
    }, [travelMarkers]);

    // 创建标记点的函数
    const createMarkers = useCallback((map: any, markers: TravelMarker[]) => {
        // 清除现有标记点
        markersRef.current.forEach(marker => {
            map.remove(marker);
        });
        markersRef.current = [];

        // 性能监控：记录标记点创建时间
        if (process.env.NODE_ENV === 'development') {
            console.time('Markers creation time');
        }

        // 创建新标记点
        markers.forEach(item => {
            const { position, zooms, title } = item;
            const markerContent = markerContents.find(mc => mc.title === title)?.content ||
                renderToString(<MapMarker iconImg={item.iconImg} />);

            const marker = new AMap.Marker({
                position: new AMap.LngLat(position[0], position[1], true),
                zooms: zooms.length === 2 ? [zooms[0], zooms[1]] : [0, 0],
                content: markerContent,
                title: title,
                anchor: 'bottom-center',
                clickable: true,
                draggable: false,
                label: {
                    content: "",
                    direction: "right"
                },
                // 优化：减少标记点的渲染复杂度
                bubble: false,
                cursor: 'pointer'
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
            markersRef.current.push(marker);
        });

        if (process.env.NODE_ENV === 'development') {
            console.timeEnd('Markers creation time');
            console.log(`Created ${markers.length} markers`);
        }
    }, [markerContents, setSelectedMarker, setShowSidebar]);

    // 创建地图图层的函数
    const createMapLayers = useCallback((coloringCityMap: Record<string, { SOC: string, city: string, depth: number }>, coloringCountries: Set<string>) => {
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

        return [chinaDis, worldDis];
    }, []);

    // 初始化地图
    useEffect(() => {
        if (typeof window !== 'undefined' && !isMapInitialized.current) {
            import('@amap/amap-jsapi-loader').then(AMapLoader => {
                AMapLoader.load({
                    key: process.env.NEXT_PUBLIC_AMAP_KEY || '',
                    version: '2.0',
                }).then(() => {
                    if (mapRef.current) {
                        // 创建图层
                        const layers = createMapLayers(coloringCityMap, coloringCountries);

                        const map = new AMap.Map(mapRef.current, {
                            viewMode: '2D',
                            center: [118.833954, 32.108711],
                            zooms: [3.5, 15],
                            zoom: 3.5,
                            features: ["bg", "point", "building"],
                            layers: [
                                ...layers,
                                // @ts-expect-error: AMap.DistrictLayer.Country is not recognized by TypeScript
                                AMap.createDefaultLayer(),
                            ],
                            doubleClickZoom: false,
                        });

                        // 添加防抖的缩放事件监听
                        const debouncedZoomEnd = debounce(() => {
                            // 性能监控：记录缩放结束时间
                            if (process.env.NODE_ENV === 'development') {
                                console.log('Map zoom ended at:', new Date().toISOString());
                            }
                        }, 300);

                        // 添加性能监控事件
                        if (process.env.NODE_ENV === 'development') {
                            map.on('zoomstart', () => {
                                console.time('Map zoom duration');
                            });

                            map.on('zoomend', () => {
                                console.timeEnd('Map zoom duration');
                            });
                        }

                        map.on('zoomend', debouncedZoomEnd);

                        mapRef.current = map;
                        isMapInitialized.current = true;

                        // 创建标记点
                        createMarkers(map, travelMarkers);
                    }
                });
            });
        }
    }, []); // 只在组件挂载时执行一次

    // 当travelMarkers变化时，只更新标记点，不重新创建地图
    useEffect(() => {
        if (mapRef.current && isMapInitialized.current) {
            createMarkers(mapRef.current, travelMarkers);
        }
    }, [travelMarkers, createMarkers]);

    // 清理函数：组件卸载时清理资源
    useEffect(() => {
        return () => {
            if (mapRef.current && isMapInitialized.current) {
                // 清理标记点
                markersRef.current.forEach(marker => {
                    mapRef.current.remove(marker);
                });
                markersRef.current = [];

                // 销毁地图实例
                mapRef.current.destroy();
                mapRef.current = null;
                isMapInitialized.current = false;
            }
        };
    }, []);

    return (
        <div
            id="container"
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
        />
    );
}