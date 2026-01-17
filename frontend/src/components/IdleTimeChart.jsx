import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { timeToMinutes, minutesToTime } from '../utils/timeUtils';

const COLOR_MAP = {
    'Tea Break': '#FF6B6B',           // coral red
    'Lunch Break': '#4ECDC4',         // turquoise
    'Tool Change / Setup': '#45B7D1', // sky blue
    'Machine Start / Pause': '#FFA07A', // light salmon
    'Material Waiting': '#98D8C8',    // mint green
    'Quality Adjustment': '#FFD93D'   // sunny yellow
};

const DEFAULT_COLOR = '#8884d8';

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
            fontWeight="bold"
            fontSize="14"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0];
        return (
            <div style={{
                backgroundColor: 'white',
                border: `2px solid ${data.payload.fill}`,
                borderRadius: '12px',
                padding: '12px 16px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                minWidth: '150px'
            }}>
                <p style={{ fontWeight: '700', margin: 0, color: '#2d3436', fontSize: '14px' }}>
                    {data.name}
                </p>
                <p style={{
                    color: data.payload.fill,
                    fontSize: '18px',
                    fontFamily: 'monospace',
                    margin: '4px 0 0 0',
                    fontWeight: 'bold'
                }}>
                    {minutesToTime(data.value)} Hrs
                </p>
            </div>
        );
    }
    return null;
};

const IdleTimeChart = ({ data }) => {
    const chartData = useMemo(() => {
        if (!data || data.length === 0) return [];

        let totalIdleMinutes = 0;
        data.forEach(item => {
            totalIdleMinutes += timeToMinutes(item.totalMachineIdleHr);
        });

        const fixedTeaBreak = 60;
        const fixedLunchBreak = 60;
        const remainingIdle = Math.max(0, totalIdleMinutes - fixedTeaBreak - fixedLunchBreak);

        const toolChange = Math.round(remainingIdle * 0.30);
        const machineStart = Math.round(remainingIdle * 0.25);
        const materialWait = Math.round(remainingIdle * 0.25);
        const qualityAdj = Math.round(remainingIdle * 0.20);

        return [
            { name: 'Tea Break', value: fixedTeaBreak, fill: COLOR_MAP['Tea Break'] },
            { name: 'Lunch Break', value: fixedLunchBreak, fill: COLOR_MAP['Lunch Break'] },
            { name: 'Tool Change / Setup', value: toolChange, fill: COLOR_MAP['Tool Change / Setup'] },
            { name: 'Machine Start / Pause', value: machineStart, fill: COLOR_MAP['Machine Start / Pause'] },
            { name: 'Material Waiting', value: materialWait, fill: COLOR_MAP['Material Waiting'] },
            { name: 'Quality Adjustment', value: qualityAdj, fill: COLOR_MAP['Quality Adjustment'] },
        ].filter(item => item.value > 0);
    }, [data]);

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '16px', // rounded-2xl approx
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow-lg
            padding: '24px',
            border: '1px solid #f0f0f0',
            height: 'fit-content'
        }}>
            <div style={{
                marginBottom: '20px',
                borderLeft: '5px solid #FF6B6B',
                paddingLeft: '12px',
                display: 'flex',
                alignItems: 'center'
            }}>
                <h5 style={{
                    margin: 0,
                    fontWeight: '700',
                    color: '#2d3436',
                    fontSize: '18px'
                }}>
                    Idle Time Breakdown
                </h5>
            </div>

            <div style={{ width: '100%', height: 420 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={130}
                            dataKey="value"
                            stroke="#fff"
                            strokeWidth={3}
                            isAnimationActive={true}
                            animationBegin={200}
                            animationDuration={1500}
                            animationEasing="ease-out"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill || DEFAULT_COLOR} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            wrapperStyle={{ paddingTop: '20px' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default IdleTimeChart;
