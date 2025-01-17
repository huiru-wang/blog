import React from 'react';

const languageData = [
    { language: 'Java', percentage: 80 },
    { language: 'TypeScript', percentage: 50 },
    { language: 'JavaScript', percentage: 40 },
    { language: 'Golang', percentage: 30 },
]
const LanguageCard = () => {
    return (
        <div className="bg-[var(--popover)] text-[var(--popover-foreground)] opacity-80 p-4 shadow-[4px_4px_2px_0_var(--border)] rounded-lg">
            <h2 className="text-lg font-bold mb-2">Most used languages</h2>
            <div>
                {languageData.map((item, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <span className="mr-2 w-1/3 truncate">{item.language}</span>
                        <div className="w-3/4 bg-gray-200 rounded-full h-2 relative">
                            <div
                                className="bg-blue-500 rounded-full h-2"
                                style={{ width: `${item.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LanguageCard;