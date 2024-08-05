import React from 'react';

type CollaboratorsBadgesRowProps = {
    users: string[];
    deleteHandler: (user: string) => void;
    readonly?: boolean;
};

const CollaboratorsBadgesRow: React.FC<CollaboratorsBadgesRowProps> = ({ users, deleteHandler, readonly }) => {
    return (
        <div className="flex overflow-x-auto max-w-xs gap-2 mt-2">
            {users.map((username, index) => (
                <div key={index} className="flex items-center bg-zinc-50 dark:bg-zinc-900 rounded-full px-2 py-1 text-sm">
                    <span>@{username}</span>
                    {!readonly && (<button
                        onClick={() => deleteHandler(username)}
                        className="ml-2 text-red-500 hover:text-red-700"
                    >
                        &times;
                    </button>)}
                </div>
            ))}
        </div>
    );
};

export default CollaboratorsBadgesRow;